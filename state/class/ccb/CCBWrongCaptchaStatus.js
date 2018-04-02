'use strict';
const CCBBaseStatus = require('./CCBBaseStatus.js');

class CCBWrongPwdStatus extends CCBBaseStatus{
  constructor(selenium) {
    super(selenium);
    this.first = true;
  }

  execute() {
    if(this.first) this.first = false;
    this.inputCaptcha(this.ctx.captcha);
    this.clickLoginButton();
  }

  message() {
    return this.first ? '请输入验证码' : '请输入正确的验证码';
  }

  nextStatus() {
    this.ctx.status = this.getRandomBoolean() ?
      this.ctx.ccbLoginEndStatus :
      (
        this.getRandomBoolean() ?
          this.ctx.ccbWrongCaptchaStatus :
          this.ctx.ccbLoginBeginStatus
      );
  }
}

module.exports = CCBWrongPwdStatus;
