const MongoClient = require('mongodb').MongoClient;

const Config = require('config.js');

class Db {

    constructor() {
        this.connect();
    }
     
    // 连接数据库
    connect() {
        MongoClient.connect(Config.dbUrl,(err,client)=> {
            if(err) {
                console.error('连接失败');
                
            } else {

            }
        })
    }
    // 查询
    find() {

    }
}

module.export = Db;