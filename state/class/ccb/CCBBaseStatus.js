'use strict';
const BaseStatus = require('../BaseStatus.js');

class CCBBaseStatus extends BaseStatus{
  constructor(ctx) {
    super(ctx);
  }

  inputUsername(username) {
    console.log(`input username ${username}`);
  }

  inputPassword(password) {
    console.log(`input password ${password}`);
  }

  inputCaptcha(captcha) {
    console.log(`input captcha ${captcha}`);
  }

  clickLoginButton() {
    console.log('click login button');
  }

  getRandomBoolean() {
    return Math.random() > 0.7;
  }
}

module.exports = CCBBaseStatus;
