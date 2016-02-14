'use strict';

var fs = require('fs');
/**
 * Default servod file path
 * @type {string}
 */
var SERVO_BLASTER_PATH = '/dev/servoblaster';
/**
 * We need to use write() with a buffer so that we can pass the position=-1 argument.
 * This is needed, otherwise we get an error because node default write tries to seek
 * in the file which is not possible (it's a FIFO).
 * @param {String} cmd Command to be written
 * @param {Function} callback Must accept only one optional error parameter
 */
function writeCommand(cmd, callback) {
    var buffer = new Buffer(cmd + '\n');
    var fd = fs.open(SERVO_BLASTER_PATH, 'w', undefined, function(err, fd) {
        if (err) {
            if (callback && typeof callback == 'function') {callback(err)};
        } else {
            fs.write(fd, buffer, 0, buffer.length, -1, function(error, written, buffer) {
                if (error) {
                    if (callback && typeof callback == 'function') {callback(error)};
                } else {
                    fs.close(fd);
                    if (callback && typeof callback == 'function') {callback()};
                }
            });
        }
    });
}

/**
 * Set a given pin to a given value
 * @memberof module:servoBlaster
 * @param {Integer} pinNumber Target. Note: this is pin number instead of GPIO number. (for instance: use 11 for P1-11/GPIO17)
 * @param {Float} value Must be between 0 and 1. Note: you may want to use --max=100% --min=0% when you start servod. Otherwise servod will limit the range to 0%-12% by default.
 * @param {Function} callback Must accept only one optional error parameter
 */
function setP1Pwm(pinNumber, value, callback) {
    value = value * 100.0;
    // echo P1-31=100% > /dev/servoblaster
    var cmd = 'P1-' + pinNumber + '=' + value + '%';
    console.log(cmd);
    writeCommand(cmd, callback);
}

/**
 * NodeJS library for the {@link https://github.com/richardghirst/PiBits/tree/master/ServoBlaster daemon.}
 * @module pi-blaster
 */
module.exports = {
    setP1Pwm: setP1Pwm
}
