'use strict';

module.exports = {
  mail: {
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD
  },
  roc: {
    host: process.env.ROC_HOST
  }
};
