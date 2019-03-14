var WebSocketServer = require('ws').Server;
var total = 0;
var wss = new WebSocketServer({ port: 8181 });
wss.on('connection', function (ws) {
    console.log('client connected');
    console.log(++total);
    ws.on('message', function (e) {
        ws.send(e);
        for(var i=0;i<wss.clients.length;i++) {
            ws.clients[i].send('这是广播的内容：'+e);
        }

    });
});