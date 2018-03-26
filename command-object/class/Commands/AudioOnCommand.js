const Command = require('./Command');

class AudioOnCommand extends Command {
  constructor(audio) {
    super();
    this.audio = audio;
  }

  execute() {
    this.audio.on();
  }

  undo() {
    this.audio.off();
  }
}

module.exports = AudioOnCommand;
