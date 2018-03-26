'use strict';

const Control = require('./class/Control');
const LightOnCommand = require('./class/Commands/LightOnCommand.js');
const LightOffCommand = require('./class/Commands/LightOffCommand.js');
const AudioOnCommand = require('./class/Commands/AudioOnCommand.js');
const AudioOffCommand = require('./class/Commands/AudioOffCommand.js');
const Light = require('./class/Something/Light.js');
const Audio = require('./class/Something/Audio.js');


const control = new Control();

const light = new Light();
const lightOnCommand = new LightOnCommand(light);
const lightOffCommand = new LightOffCommand(light);
const audio = new Audio();
const audioOnCommand = new AudioOnCommand(audio);
const audioOffCommand = new AudioOffCommand(audio);

control.setCommand(0, lightOnCommand);
control.setCommand(1, lightOffCommand);
control.setCommand(2, audioOnCommand);
control.setCommand(3, audioOffCommand);

for(let i=0; i<4; i++) {
  control.buttonPressed(i);
}

for(let i=0; i<4; i++) {
  control.undoButtonPressed();
}
