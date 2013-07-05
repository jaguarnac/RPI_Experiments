var OutputChannel = require('./Channel').OutputChannel;

function Blinker(channel, interval){
    var _c = new OutputChannel(channel);
    function blink(){
        _c.toggle();
        setTimeout(blink, interval);
    }

    blink();
}

var channels = [11, 15, 16], i=0;
function blinkNext(){
    new Blinker(channels[i], 1000);
    i++;
    if (i<channels.length){
        setTimeout(blinkNext, 200);
    }
}
blinkNext();
