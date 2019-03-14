var express = require('express');
var sio = require('socket.io');

app = express.createServer(express.bodyParser(),express.static('public'));
app.listen(3000);
var io = sio.listen(app);
io.sockets.on('connection',function (socket) {
    console.log('someone connected');
});