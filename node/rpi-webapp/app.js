var express = require('express');
var app = express()

function setLEDOn(flag){
  var gpio = require('pi-gpio');
  gpio.open(11, "output", function(err){
    gpio.write(11, flag===true?1:0, function(){
      gpio.close(11);
    });
  });
}

app.get('/hello.txt', function(req, res){
  var body = 'Hello, World';
  res.send('Hello, World');
});

app.get('/on', function(req, res){
  setLEDOn(true);
  res.send('success');
});

app.get('/off', function(req, res){
  setLEDOn(false);
  res.send('success');
});

app.get('/led', function(req, res){
  var html="<!DOCTYPE html><html><body><a href='?status=on'>on</a> <a href='?status=off'>off</a></body></html>";
  if ( req.param('status') === 'on' ){
    setLEDOn(true);
  } else {
    setLEDOn(false);
  }
  res.send(html);
  
});

app.listen(3000);
console.log('listening on port 3000');
