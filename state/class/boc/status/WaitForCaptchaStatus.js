'use strict';
const BOCBaseStatus = require('./BOCBaseStatus.js');

class WaitForCaptchaStatus extends BOCBaseStatus{
  constructor(ctx) {
    super(ctx);
  }

  async execute() {
    await this.helper.inputCaptcha();
    await this.helper.clickLoginButton();
  }

  message() {
    return {
      msg: '请输入验证码',
      input: [
        {
          name: 'captcha',
          description: '验证码'
        }
      ]
    };
  }
}

module.exports = WaitForCaptchaStatus;
