'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const superagent = require('superagent');

const config = require('./config');

const app = express();

const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  host: config.mail.host,
  secure: false,
  auth: config.mail.user
    ? {
        user: config.mail.user,
        pass: config.mail.password
      }
    : undefined,
  tls: {
    rejectUnauthorized: false
  }
});
app.use(bodyParser.json());

app.post('/send', async function(req, res) {
  const toSend = req.body;
  let rocUser;
  try {
    rocUser = await getRocUser(req);
    console.log('get roc user succeeded', rocUser);

    if (!rocUser.username || rocUser.username === 'anonymous') {
      throw new Error('user is not logged in');
    }

    await transporter.sendMail({
      from: rocUser.username,
      to: toSend.to,
      subject: toSend.subject,
      text: toSend.text,
      html: toSend.html
    });
  } catch (e) {
    console.log('get roc user failed', e, e.message);
    res.send(500, { error: e.message });
  }

  res.send({ ok: true });
});

async function getRocUser(req) {
  const res = await superagent
    .get(`${config.roc.host}/auth/session`)
    .set('Accept', 'application/json')
    .set('Cookie', req.get('Cookie'));
  return res.body;
}

app.listen(3000);
