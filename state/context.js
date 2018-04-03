'use strict';
const Nightmare = require('nightmare');
Nightmare.action('winFocus',
  function(name, options, parent, win, renderer, done) {
    parent.respondTo('winFocus', function(done) {
      win.focus();
      done();
    });
    done();
  },
  function(done) {
    this.child.call('winFocus', done);
  });
const nightmare = Nightmare({ show: true ,  openDevTools: {
  mode: 'detach'
}});
// const nightmare = Nightmare({});
const LoginBeginStatus = require('./class/boc/status/LoginBeginStatus.js');
const WrongCaptchaStatus = require('./class/boc/status/WrongCaptchaStatus.js');
const WrongPwdStatus = require('./class/boc/status/WrongPwdStatus.js');
const WaitForCaptchaStatus = require('./class/boc/status/WaitForCaptchaStatus.js');
const LoginEndStatus = require('./class/boc/status/LoginEndStatus.js');

class Context {
  constructor() {
    this.username = '';
    this.password = '';
    this.captcha = '';
    this.nightmare = nightmare;
    this.loginBeginStatus = new LoginBeginStatus(this);
    this.waitForCaptchaStatus = new WaitForCaptchaStatus(this);
    this.wrongCaptchaStatus = new WrongCaptchaStatus(this);
    this.wrongPwdStatus = new WrongPwdStatus(this);
    this.loginEndStatus = new LoginEndStatus(this);
    this.status = this.loginBeginStatus;
  }

  async run() {
    while(true) {
      console.log(this.status.message().msg);
      await this.status.execute();
      await this.status.nextStatus();
      console.log(`current statis: ${this.status.constructor.name}`);
    }
  }
}

const ctx = new Context();
ctx.run();
