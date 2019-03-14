var http = require('http');
var fs = require('fs');
var io = require('socket.io');

var documentRoot = 'E:/PhpProject/html5/websocket/www';
var httpServer = http.createServer(function(req,res){

    var url = req.url;
    var file = documentRoot + url;
    console.log(url);
    fs.readFile( file , function(err,data){

        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write(data);
            res.end();

        }

    }); 

}).listen(8888);

var socket = io.listen(httpServer);
socket.sockets.on('connection',function(socket){
    //socket代表的是当前服务端和客户端建立的对象（TCP）
    socket.emit('hello','欢迎你');
    socket.broadcast.emit('a','有新人进来了');
    socket.on('move',function(data){
        socket.broadcast.emit('moveto',data);
    });

});