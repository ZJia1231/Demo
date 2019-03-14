const mongoClient = require('mongodb').MongoClient;
const http = require('http');
const qs = require('querystring');
const url = 'mongodb://127.0.0.1:27017/';

const events = require('events');
const EventEmitter = new events.EventEmitter();

const app = http.createServer(function (req, res) {
    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf-8', 'Access-Control-Allow-Origin': '*' });

    if (req.url == '/data') {
        mongoClient.connect(url, function (err, client) {
            if (err) {
                // console.log(err);
                console.log('数据库连接失败...');

                return false;
            }
            console.log('连接数据库成功!');
            let database = client.db('test');
            database.collection('test').find().toArray(function (err, result) {
                if (err) {
                    throw err;
                }
                EventEmitter.emit('check', result, res);
            });
            client.close();
            console.log('数据库连接关闭...');
        })
    }
    else if (req.method.toLocaleLowerCase() == 'post' && req.url == '/insert') {

        let data = '';
        req.on('data', function (chunk) {
            data += chunk;
        })
        req.on('end', function () {
            data = qs.parse(data);
        })
        mongoClient.connect(url, function (err, client) {
            if (err) {
                // console.log(err);
                console.log('数据库连接失败...');
                return false;
            }
            console.log('连接数据库成功!');
            let database = client.db('test');
            database.collection('test').insertOne(data, function (err, result) {
                if (err) {
                    throw err;
                }
                EventEmitter.emit('insert', res);
            })
            client.close();
            console.log('数据库连接关闭...');
        })
    }
    else if (req.method.toLocaleLowerCase() == 'post' && req.url == '/delete') {
        let data = '';
        req.on('data', function (chunk) {
            data += chunk;
        })
        req.on('end', function () {
            data = JSON.parse(data);
            mongoClient.connect(url, function (err, client) {
                if (err) {
                    // console.log(err);
                    console.log('数据库连接失败...');
                    return false;
                }
                console.log('连接数据库成功!');
                let database = client.db('test');
                database.collection('test').remove(data, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    EventEmitter.emit('delete', result, res);
                })
                client.close();
                console.log('数据库连接关闭...');
            })

        })
    }
    else {
        res.end(`<h1>${req.url}</h1>`)
    }

})
EventEmitter.on('check', function (arr, res) {
    let data = {};
    data.list = arr;
    res.end(JSON.stringify(data));
})

EventEmitter.on('insert', function (res) {
    res.end('插入数据成功！');
})

EventEmitter.on('delete', function (result, res) {
    if(result.result.ok) {
        res.end('alert("删除成功！")');
    }
    
})
// mongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
//     if (err) {
//         // console.log(err);
//         console.log('数据库连接失败...');

//         return false;
//     }
//     console.log('连接数据库成功');
//     let database = client.db('test');
//     // database.collection('user').insert({
//     //     userName: '帅哥',
//     //     password: '123456'
//     // }, function (err,result) {
//     //     if (err) {
//     //         console.log('插入数据失败');
//     //         return false;
//     //     }
//     //     console.log('插入数据成功！');
//     // client.close();
//     // })
// })

app.listen(3000)