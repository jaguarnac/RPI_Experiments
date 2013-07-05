var gpio = require("pi-gpio");

function OutputChannel(num){
    var channel = this;
    channel.id = num;
    channel.is_on = false;
    

    function setState(state){
        
        if (isNaN(channel.id)){ return false; }
        state = !!(state)?1:0;
        gpio.open(channel.id, "output", function(err) {
            gpio.write(channel.id, state, function() {
                gpio.close(channel.id);
                channel.is_on = !!(state);
            }); 
        }); 
    }

    function turnOn(){
        setState(1);
    }

    function turnOff(){
        setState(0);
    }

    function toggle(){
        if (channel.is_on){
            turnOff();
        } else {
            turnOn();
        }
    }

    
    channel.turnOn = turnOn; 
    channel.turnOff = turnOff;
    channel.toggle = toggle;
}

exports.OutputChannel = OutputChannel;
