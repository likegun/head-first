'use strict';
const CCBBaseStatus = require('./CCBBaseStatus.js');

class CCBLoginEndStatus extends CCBBaseStatus{
  constructor(selenium) {
    super(selenium);
    this.first = true;
  }

  execute() {
    process.exit();
  }

  message() {
    return '登录成功';
  }
}

module.exports = CCBLoginEndStatus;
