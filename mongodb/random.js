function getRandomNum(min,max) {
    let range = max - min;
    let rand = Math.random();
    return (min+Math.round(rand*range));
}
// console.log(getRandomNum(10000,99999));
function getRandomUserName(min,max) {
    let tempStringArray = '0123456789qwertyuiopasdfghjklzxcvbnm'.split('');
    let outputtext = '';
    for(let i=1; i<getRandomNum(min,max);i++) {
        outputtext = outputtext + tempStringArray[getRandomNum(0,tempStringArray.length)];
    }
    return outputtext;
}

// console.log(getRandomUserName(7,16));
var db = connect('company')
const startTime = (new Date()).getTime();
let tempInfo = [];
for (let i = 0; i < 2000000; i++) {
    tempInfo.push({
        username : getRandomUserName(7,16),
        regediteTime : new Date(),
        randomNum0:getRandomNum(100000,999999),
        randomNum1:getRandomNum(100000,999999),
        randomNum2:getRandomNum(100000,999999),
        randomNum3:getRandomNum(100000,999999),
        randomNum4:getRandomNum(100000,999999),
        randomNum5:getRandomNum(100000,999999),
        randomNum6:getRandomNum(100000,999999),
        randomNum7:getRandomNum(100000,999999),
        randomNum8:getRandomNum(100000,999999),
        randomNum9:getRandomNum(100000,999999),
    })
}
db.randomInfo.insert(tempInfo);
let endTime = (new Date()).getTime() - startTime;
print(endTime);