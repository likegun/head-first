'use strict';
class Singleton {
  constructor() {
    try {
      throw new Error();
    } catch (e) {
      if(e.stack.split('\n')[2].includes(__filename)) return;
      throw new Error('单例模式神圣不可侵犯');
    }
  }

  static getInstance() {
    if(!this.uniqueInstance) {
      this.uniqueInstance = new Singleton();
    }
    return this.uniqueInstance;
  }

  somefn() {
    console.log('hahah');
  }
}

module.exports = Singleton;
