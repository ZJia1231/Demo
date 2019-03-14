var fs = require("fs");
// var URL =require('url')

var data = fs.readFileSync('./test.txt');
// console.log(fs);

console.log(data.toString());
console.log("程序执行结束!");