const Command = require('./Command');

class AudioOffCommand extends Command {
  constructor(audio) {
    super();
    this.audio = audio;
  }

  execute() {
    this.audio.off();
  }

  undo() {
    this.audio.on();
  }
}

module.exports = AudioOffCommand;
