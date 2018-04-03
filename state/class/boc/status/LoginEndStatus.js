'use strict';
const BOCBaseStatus = require('./BOCBaseStatus.js');

class LoginEndStatus extends BOCBaseStatus{
  constructor(ctx) {
    super(ctx);
  }

  execute() {
    process.exit();
  }

  message() {
    return {
      msg: '登录成功'
    };
  }
}

module.exports = LoginEndStatus;
