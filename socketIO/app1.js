var app = require('http').createServer();
var io  = require('socket.io')();

var port = 3000;

var clientCount = 0;

app.listen(port);

io.on('connection',function (socket) {
    clientCount++;
    conn.nickname = 'user' + clientCount;
    io.emit('enter',socket.nickname + 'comes in');

    socket.on('message', function (str) {
        io.emit('message', socket.nickname + 'says:' + str);
    })

    socket.on('disconnect',function () {
        io.emit('leave', socket.nickname + 'left')
    })
})
var server = ws.createServer(function (conn) {
    console.log('new connection');
    clientCount++;
    conn.nickname = 'user' + clientCount;
    var mes = {};
    mes.type = 'enter'
    mes.data = conn.nickname + 'comes in'
    broadcast(JSON.stringify(mes))
    conn.on('text',function (str) {
        console.log('received' + str);
        var mes = {};
        mes.type = 'message'
        mes.data = conn.nickname + 'says:' + str
        broadcast(JSON.stringify(mes))
    })
    conn.on('close',function (code,reason) {
        console.log('received' + str);
        var mes = {};
        mes.type = 'leave'
        mes.data = conn.nickname + 'leave'
        broadcast(JSON.stringify(mes))
    })
    conn.on('error',function (error) {
        console.log(err);
        
    })
    
}).listen(port);

console.log('websocket server listening on port' + port);

function broadcast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str);
    })
}