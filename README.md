# ServoBlaster.js
NodeJS library for the ServoBlaster daemon

## Installation

Make sure you have `node` and `npm` installed on your Raspberry Pi.

Install the ServiBlaster daemon (https://github.com/richardghirst/PiBits/tree/master/ServoBlaster).

Finally install `servoBlaster.js`:

    npm install servoBlaster.js

And typically you want to make sure servod is already running and with --max=100% --min=0%
FYI, this is the command I typically start my servod

    servod --p1pins=11,29,31,33,35 --max=100% --min=0%

This will give you access to GPIO17/5/6/13/19, and allow you change PWM from 0-100%, instead by 0-12% by default.

## Usage

    var servoblaster = require('servoBlaster.js');

    servoblaster.setP1Pwm(11, 1 ); # P1-11 (GPIO17) 100% brightness
    servoblaster.setP1Pwm(29, 0.2 ); # P1-29 (GPIO05) 20% brightness
    servoblaster.setP1Pwm(29, 0 ); # off

## Credits

* [Thomas Sarlandie](https://github.com/sarfata) He wrote the original pi-blaster.js and xinkai steal some code from there.
* [Xinkai Wang](https://github.com/xinkaiwang)


## License

Copyright 2016 - Xinkai Wang. Published under the MIT open source license (see full license in LICENSE.txt file).

[servoBlaster]: https://github.com/xinkaiwang/ServoBlaster.js
