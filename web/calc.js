var calc = function (obj) {
    // 取得data中第二项的所有数据
    var data = obj.data.map(function (item) {
        return item[1];
    })
    // 求总和
    var sum = data.reduce(function (prev, curr) {
        return prev + curr;
    })
    // 总和平均
    sum = sum / data.length;
    // 求后三位总和
    var part = data.slice(-3).reduce(function (prev, curr) {
        return prev + curr;
    });
    // 后三位总和平均 
    part = part / 3;
    return part / sum;
}