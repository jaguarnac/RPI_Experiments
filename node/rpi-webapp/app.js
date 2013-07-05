var express = require('express');
var OutputChannel = require('../Channel').OutputChannel;

var app = express(),
    c11 = new OutputChannel(11);

app.get('/hello.txt', function(req, res){
  var body = 'Hello, World';
  res.send('Hello, World');
});

app.get('/on', function(req, res){
  c11.turnOn();
  res.send('success');
});

app.get('/off', function(req, res){
  c11.turnOff();
  res.send('success');
});

app.get('/led', function(req, res){
  var html="<!DOCTYPE html><html><body><a href='?status=on'>on</a> <a href='?status=off'>off</a></body></html>";
  if ( req.param('status') === 'on' ){
    c11.turnOn();
  } else {
    c11.turnOff();
  }
  res.send(html);
  
});

app.listen(3000);
console.log('listening on port 3000');
