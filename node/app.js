var http = require('http');
var app = require('./express-router');

http.createServer(app).listen(3000);
app.get('/login',function (req,res) {
    console.log('login');
    res.end('<h1>login</h1>');
})