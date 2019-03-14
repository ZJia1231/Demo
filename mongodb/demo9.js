var startTime1=new Date().getTime();
var db = connect('company');

var rs = db.randomInfo.find({ username: 'wxeskeat', randNum0: 285371 }).hint({ randNum0: 22 });

rs.forEach(rs=>{printjson(rs)});


var runTime = new Date().getTime()-startTime1;
print('[Demo]this run time is '+runTime+'ms');