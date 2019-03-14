const http = require('http');
const ejs = require('ejs');
const url = require('url')
const app = http.createServer(function (req, res) {
    let pathname = url.parse(req.url).pathname;

    res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' });

    if (pathname == '/login') {
        ejs.renderFile('./login.ejs', {
            msg: '后台数据',
            list: ['111','222','333']
        }, function (err, data) {            
            res.end(data);
        })
    }
});
app.listen(3000)
