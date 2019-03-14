const sd = require('silly-datetime');
const http = require('http');

const app = http.createServer((req, res) => {
    res.writeHead('200',{'Content-Type':'text/html;charset=utf-8'});

    var date = sd.format(new Date(),'HH:mm:ss');

    res.write(`<h1>${date}</h1>`);

    res.end()
})

app.listen(3000);