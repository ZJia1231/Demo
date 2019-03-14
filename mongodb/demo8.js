var starTime = new Date().getTime();
var db = connect('company');
var rs = db.randomInfo.find({ username:'8rof0znrw7'});
rs.forEach(rs => {
    printjson(rs);
});
var runTime = new Date().getTime() - starTime;
print('success'+ runTime);