'use strict';

module.exports = {
  mail: {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD
  },
  roc: {
    host: process.env.ROC_HOST
  }
};
