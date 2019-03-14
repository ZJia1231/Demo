const fs = require('fs');
fs.stat('index.js', (err,stats) => {
    if (err) {
        console.error(err);
        return false;
    }
    console.log(stats.isFile());
    console.log(stats.isDirectory());
    
}) 

fs.mkdir('css',function (err) {
    if (err) {
        console.error(err);
        return false;
    }    
}) 