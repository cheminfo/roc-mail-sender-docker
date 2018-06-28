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
  try {
    const rocUser = await getRocUser(req);
    console.log('get roc user succeeded', rocUser);
  } catch (e) {
    console.log('get roc user failed', e, e.message);
  }

  try {
    await transporter.sendMail({
      ...toSend,
      to: 'luc@patiny.com',
      from: 'test@cheminfo.org'
    });
  } catch (e) {
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
