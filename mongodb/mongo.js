// var userName = "jspang";    //声明一个登录名             
// var timeStamp = Date.parse(new Date());     //声明登录时的时间戳  
// var jsonDatabase = { "loginUser": userName, "loginTime": timeStamp }; //组成JSON字符串
// var db = connect('user');   //链接数据库
// db.login.insert(jsonDatabase);  //插入数据
// print('[demo]log  print success');  //没有错误显示成功
var db = connect('company');
var my = {
    findAndModify:'workmate',
    query:{'name':'JSPang'},
    update:{$set:{age:18}},
    new:true,
}
var answer = db.runCommand(my);
printjson(answer);