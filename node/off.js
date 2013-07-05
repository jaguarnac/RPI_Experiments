var gpio = require("pi-gpio");

gpio.open(11, "output", function(err) {        // Open pin 11 for output
    gpio.write(11, 0, function() {            // Set pin 11 high (1)
        gpio.close(11);                        // Close pin 11
    });
});
