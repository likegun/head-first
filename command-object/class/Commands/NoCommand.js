'use strict';
const Command = require('./Command');

class NoCommand extends Command {
  constructor() {
    super();
  }

  exec() {}

  undo() {}
}

module.exports = NoCommand;
