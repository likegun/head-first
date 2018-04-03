'use strict';
const BaseStatus = require('../BaseStatus.js');
const BOCHelper = require('./lib/BOCHelper.js');

class BOCBaseStatus extends BaseStatus{
  constructor(ctx) {
    super(ctx);
    this.helper = new BOCHelper(ctx);
  }

  async nextStatus() {
    const loginResult = await this.helper.checkLogined();
    if(loginResult.pass) return this.ctx.status = this.ctx.loginEndStatus;

    await this.helper.refreshCaptcha();
    if(loginResult.msg.includes('验证码输入错误，请重试')) return this.ctx.status = this.ctx.wrongCaptchaStatus;

    return this.ctx.status = this.ctx.wrongPwdStatus;
  }
}

module.exports = BOCBaseStatus;
