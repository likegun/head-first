'use strict';
const BOCBaseStatus = require('./BOCBaseStatus.js');

class WrongPwdStatus extends BOCBaseStatus{
  constructor(ctx) {
    super(ctx);
  }

  async execute() {
    await this.helper.inputUsername();
    await this.helper.inputPassword(false);
    await this.helper.inputCaptcha();
    await this.helper.clickLoginButton();
  }

  message() {
    return {
      msg: '请输入正确的账号密码',
      input: [
        {
          name: 'username',
          description: '账号'
        },
        {
          name: 'password',
          description: '密码'
        },
        {
          name: 'captcha',
          description: '验证码'
        },
      ]
    };
  }
}

module.exports = WrongPwdStatus;
