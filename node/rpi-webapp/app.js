var express = require('express');
var OutputChannel = require('../Channel').OutputChannel;

var app = express();
var channels = [ new OutputChannel(11),
                 new OutputChannel(15),
                 new OutputChannel(16)  ];
var activePattern = null;

var pattern1 = new function(){
  var i = 0;
  var tim = null;
  function blink(){
    channels[i].toggle();
    i++;
    if (i == channels.length) { i=0; }
    tim = setTimeout(blink, 500)
  }
  this.start = function(){
    i=0;
    blink();
  }
  this.stop = function(){
    clearTimeout(tim);
  }
}

var pattern2 = new function(){
  var i = 0;
  var tim = null;
  function blink(){
    channels[i].toggle();
    i++;
    if (i == channels.length) { i=0; }
    channels[i].toggle();
    tim = setTimeout(blink, 500)
  }
  this.start = function(){
    i=0;
    tim = setTimeout(blink, 500);
    channels[0].toggle();
  }
  this.stop = function(){
    clearTimeout(tim);
  }
}

app.get('/', function(req, res){
  var html, action, channel;
  action = req.param('action');
  
  if (action === 'on') {
    channel = req.param('channel');
    channels[channel].turnOn();
  } else if (action === 'off'){
    channel = req.param('channel');
    channels[channel].turnOff();
  } else if (action === 'alloff'){
    if (activePattern && activePattern.stop){ 
      activePattern.stop(); 
    }
    for (var i=0; i<channels.length; i++){
      channels[i].turnOff();
    }
  } else if (action === 'pattern1'){
    pattern1.start();
    activePattern = pattern1;
  } else if (action === 'pattern2'){
    pattern2.start();
    activePattern = pattern2;
  }
  
 
  html="<!DOCTYPE html><html><body>";
  for (var i=0; i<channels.length; i++){
    html += '<div>';
    html += ' CHANNEL '+i+' : ';
    html += '<a href="/?action=on&channel='+i+'">ON</a>  ';
    html += '<a href="/?action=off&channel='+i+'">OFF</a>  ';
    html += '</div>';
  }
  html += "<div><a href='/?action=pattern1'>Pattern 1</a> </div>"; 
  html += "<div><a href='/?action=pattern2'>Pattern 2</a> </div>";
  html += "<div><a href='/?action=alloff'>ALL OFF</a> </div>";
  html += "</body></html>";
  
  res.send(html);
  
});

app.listen(3000);
console.log('listening on port 3000');
