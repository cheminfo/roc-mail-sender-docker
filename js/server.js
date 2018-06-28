'use strict';

const express = require('express');
const bodyParser = require('body-parser');

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
  console.log(toSend);
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

app.listen(3000);
