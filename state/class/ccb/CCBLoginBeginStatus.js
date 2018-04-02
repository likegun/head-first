'use strict';
const CCBBaseStatus = require('./CCBBaseStatus.js');

class CCBLoginBeginStatus extends CCBBaseStatus{
  constructor(ctx) {
    super(ctx);
    this.first = true;
  }

  execute() {
    if(this.first) this.first = false;
    this.inputUsername(this.ctx.username);
    this.inputPassword(this.ctx.password);
    this.clickLoginButton();
  }

  message() {
    return this.first ? '请输入账号密码' : '请输入正确的账号密码';
  }

  nextStatus() {
    this.ctx.status = this.getRandomBoolean() ?
      this.ctx.ccbLoginEndStatus :
      (
        this.getRandomBoolean()?
          this.ctx.ccbWrongCaptchaStatus :
          this.ctx.ccbLoginBeginStatus
      );
  }
}

module.exports = CCBLoginBeginStatus;
