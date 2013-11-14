var express = require('express');
var OutputChannel = require('../Channel').OutputChannel;
var LEDStrip = require('RPi-LPD8806').LEDStrip;

var app = express();
var channels = [ new OutputChannel(16) ];
var ledstrip = new LEDStrip(32);

app.get('/', function(req, res){
  var html, action, channel, r, g, b;
  action = req.param('action');
  
  if (action === 'blink') {
    channel = req.param('channel');
    channels[channel].turnOn();
    setTimeout ( function(){
      channels[channel].turnOff();
    },500);
  }

  if (action ==='rgbfill'){
    r = req.param('r');
    g = req.param('g');
    b = req.param('b');
    ledstrip.fillRGB(r,g,b);
    ledstrip.update();
  }

  if (action === 'ledoff'){
    ledstrip.all_off();
  }
  
 
  html="<!DOCTYPE html><html>";
  html += '<head><meta name="viewport" content="width=device-width, user-scalable=no"></head>';
  html += '<body>';
  for (var i=0; i<channels.length; i++){
    html += '<div>';
    html += ' CHANNEL '+i+' : ';
    html += '<a href="/?action=blink&channel='+i+'">ON</a>  ';
    html += '</div>';
  }
  html += '<br /> <br />';
  html += '<a href="/?action=rgbfill&r=255&g=0&b=0">RED</a> <br />';
  html += '<a href="/?action=rgbfill&r=0&g=255&b=0">GREEN</a> <br />';
  html += '<a href="/?action=rgbfill&r=0&g=0&b=255">BLUE</a> <br />';
  html += '<a href="/?action=rgbfill&r=255&g=255&b=255">WHITE</a> <br />';
  html += '<br /> <br />';

  html += '<a href="/?action=ledoff">OFF</a> <br />';
  html += '<br /> <br />';

  html += "</body></html>";
  
  res.send(html);
  
});

app.listen(3001);
console.log('listening on port 3001');
