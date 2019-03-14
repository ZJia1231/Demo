var express = require('express');
var wsio = require('socket.io');

var app = express.createServer();
var ws = wsio.attach(app);
app.use(exprss.static('public'));
ws.on('connection',function (socket) {
    socket.on('message',function (msg) {
        console.log(msg);
        socket.send('pong');
    })
})
app.listen(3000);