'use strict';
const CCBLoginBeginStatus = require('./class/ccb/CCBLoginBeginStatus.js');
const CCBWrongCaptchaStatus = require('./class/ccb/CCBWrongCaptchaStatus.js');
const CCBLoginEndStatus = require('./class/ccb/CCBLoginEndStatus.js');

class Context {
  constructor() {
    this.username = 'wrq';
    this.password = '123';
    this.captcha = '014821';
    this.ccbLoginBeginStatus = new CCBLoginBeginStatus(this);
    this.ccbWrongCaptchaStatus = new CCBWrongCaptchaStatus(this);
    this.ccbLoginEndStatus = new CCBLoginEndStatus(this);
    this.status = this.ccbLoginBeginStatus;
  }

  run() {
    while(true) {
      console.log(this.status.message());
      this.status.execute();
      this.status.nextStatus();
    }
  }
}

const ctx = new Context();
ctx.run();
