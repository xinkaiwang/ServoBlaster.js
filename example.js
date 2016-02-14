'use strict';

var servod = require('./servoBlaster.js');

servod.setP1Pwm(11, 1);

setTimeout(function() {
    servod.setP1Pwm(11, 0);
}, 1000);
