'use strict';
const inquirer = require('inquirer');

class BOCHelper {
  constructor(ctx) {
    this.ctx = ctx;
  }

  getUsernameEleId() {
    return this.ctx.nightmare.evaluate(function() {
      return Array.prototype.slice.call(document.querySelectorAll('input[id^=txt]')).reverse().find(e => !e.getAttribute('id').includes('captcha')).getAttribute('id');
    });
  }

  getPasswordEleId() {
    return this.ctx.nightmare.evaluate(function() {
      return Array.prototype.slice.call(document.querySelectorAll('input[id^=input_div_password]')).pop().getAttribute('id');
    });
  }

  getCaptchaEleId() {
    return this.ctx.nightmare.evaluate(function() {
      return Array.prototype.slice.call(document.querySelectorAll('input[id^=txt]')).reverse().find(e => e.getAttribute('id').includes('captcha')).getAttribute('id');
    });
  }

  getLoginBtnEleId() {
    return this.ctx.nightmare.evaluate(function() {
      return Array.prototype.slice.call(document.querySelectorAll('a[id^=btn]')).pop().getAttribute('id');
    });
  }

  async inputUsername() {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'username',
        message: '账号'
      }
    ]);
    this.ctx.username = answers.username;

    //获取用户名输入框、密码输入框、登陆按钮输入框元素的id
    const usernameEleId = await this.getUsernameEleId();
    await this.ctx.nightmare
      .wait(2000)
      .type(`#${usernameEleId}`)
      .type(`#${usernameEleId}`, this.ctx.username);
  }

  async inputPassword(first = true) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'password',
        message: '密码'
      }
    ]);
    this.ctx.password = answers.password;

    const usernameEleId = await this.getUsernameEleId();
    const passwordEleId = await this.getPasswordEleId();

    await this.ctx.nightmare.winFocus();
    await this.ctx.nightmare
      .type(`#${usernameEleId}`, '\u0009')
      .wait(1000)
      .type(first ? `#${passwordEleId}_1` : `#${passwordEleId}`, this.ctx.password);
  }

  async inputCaptcha(captcha) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'captcha',
        message: '验证码'
      }
    ]);
    this.ctx.captcha = answers.captcha;

    const captchaEleId = await this.getCaptchaEleId();
    await this.ctx.nightmare
      .type(`#${captchaEleId}`, this.ctx.captcha);
  }

  async refreshCaptcha() {
    const captchaUrl = await this.ctx.nightmare.evaluate(() => `https://ebsnew.boc.cn${document.querySelector('#captcha').getAttribute('src')}`);
    const base64ImageSrc = await this.ctx.nightmare.evaluate((captchaUrl) => {
      return new Promise((resolve) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
            resolve(reader.result);
          };
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', captchaUrl);
        xhr.responseType = 'blob';
        xhr.send();
      });
    }, captchaUrl);
    console.log(base64ImageSrc.slice(base64ImageSrc.indexOf('base64,') + 7));
    return base64ImageSrc.slice(base64ImageSrc.indexOf('base64,') + 7);
  }

  async clickLoginButton() {
    const loginBtnEleId = await this.getLoginBtnEleId();
    await this.ctx.nightmare
      .click(`#${loginBtnEleId}`)
      .wait(5000);
  }

  async checkLogined() {
    await this.ctx.nightmare.wait(() => {
      //登陆成功
      if(document.location.pathname.indexOf('login') === -1)
        return true;
      //登陆失败，弹出消息框
      return document.querySelector('#msgBox').getAttribute('class').indexOf('hide') === -1;
    });

    //获取登陆情况 { pass: Boolean, msg: String }
    const ret = await this.ctx.nightmare.evaluate(() => {
      const ret = {
        pass: document.location.pathname.indexOf('login') === -1,
      };
      if(!ret.pass) {
        ret.msg = document.querySelector('#msgContent').innerText;
        document.querySelector('#hideMsgBox').click();
      }
      return ret;
    });
    console.log(ret);
    return ret;
  }
}

module.exports = BOCHelper;
