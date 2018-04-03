'use strict';
const BOCBaseStatus = require('./BOCBaseStatus.js');

class LoginBeginStatus extends BOCBaseStatus{
  constructor(ctx) {
    super(ctx);
  }

  async execute() {
    await this.ctx.nightmare
      .goto(`https://ebsnew.boc.cn/boc15/login.html#${Math.random()}`)
      .wait('.login-bg')
      .wait(function() {
        const bodyHTML = document.body.innerHTML;
        return Boolean(bodyHTML.match(/id="(input_div_password.+?)"/));
      });
    await this.helper.inputUsername();
    await this.helper.inputPassword();
  }

  message() {
    return {
      msg: '请输入账号密码',
      input: [
        {
          name: 'username',
          description: '账号'
        },
        {
          name: 'password',
          description: '密码'
        }
      ]
    };
  }

  async nextStatus() {
    await this.helper.refreshCaptcha();
    return this.ctx.status = this.ctx.waitForCaptchaStatus;
  }
}

module.exports = LoginBeginStatus;
