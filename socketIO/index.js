var app = require('express')();
var http = require('http')(app);
var io = require('socket.io')(http);

http.createServer('/')