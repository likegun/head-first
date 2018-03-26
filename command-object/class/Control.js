'use strict';
const NoCommand = require('./Commands/NoCommand.js');
const noCommand = new NoCommand();

class Control {
  constructor() {
    this.commands = [];
    this.commandInvokeStack = [];
  }

  setCommand(index, command) {
    this.commands[index] = command;
  }

  buttonPressed(index) {
    (this.commands[index] || noCommand).execute();
    this.commandInvokeStack.push(this.commands[index] || noCommand);
  }

  undoButtonPressed() {
    (this.commandInvokeStack.pop() || noCommand).undo();
  }
}

module.exports = Control;
