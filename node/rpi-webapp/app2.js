var express = require('express');
var OutputChannel = require('../Channel').OutputChannel;

var app = express();
var channels = [ new OutputChannel(16) ];

app.get('/', function(req, res){
  var html, action, channel;
  action = req.param('action');
  
  if (action === 'blink') {
    channel = req.param('channel');
    channels[channel].turnOn();
    setTimeout ( function(){
      channels[channel].turnOff();
    },500);
  }   
  
 
  html="<!DOCTYPE html><html><body>";
  for (var i=0; i<channels.length; i++){
    html += '<div>';
    html += ' CHANNEL '+i+' : ';
    html += '<a href="/?action=blink&channel='+i+'">ON</a>  ';
    html += '</div>';
  }
  html += "</body></html>";
  
  res.send(html);
  
});

app.listen(3001);
console.log('listening on port 3001');
