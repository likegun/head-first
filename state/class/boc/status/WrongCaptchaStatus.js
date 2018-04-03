'use strict';
const BOCBaseStatus = require('./BOCBaseStatus.js');

class WrongCaptchaStatus extends BOCBaseStatus{
  constructor(ctx) {
    super(ctx);
  }

  async execute() {
    await this.helper.inputPassword(false);
    await this.helper.inputCaptcha();
    await this.helper.clickLoginButton();
  }

  message() {
    return {
      msg: '验证码错误',
      input: [
        {
          name: 'captcha',
          description: '验证码'
        }
      ]
    };
  }
}

module.exports = WrongCaptchaStatus;
