var Local = function (socket) {
    // 游戏对象
    var game;
    //时间间隔
    var INTERVAL = 2000;
    //定时器
    var timer = null;
    // 时间计数器
    var timeCount = 0;
    // 时间
    var time = 0;
    // 绑定键盘事件
    var bindKeyEvent = function () {
        document.onkeydown = function (e) {
            if (e.keyCode == 38) {
                game.rotate();
                socket.emit('rotate');
            }
            else if (e.keyCode == 39) {
                game.right();
                socket.emit('right');
            }
            else if (e.keyCode == 40) {
                game.down();
                socket.emit('down');
            }
            else if (e.keyCode == 37) {
                game.left();
                socket.emit('left');
            }
            else if (e.keyCode == 32) {
                game.fall();
                socket.emit('fall');
            }
        }
    }
    // 随机生成干扰行
    var generataBottomLine = function (lineNum) {
        var lines = [];
        for (var i = 0; i < lineNum; i++) {
            var line = [];
            for (var j = 0; j < 10; j++) {
                line.push(Math.ceil(Math.random() * 2) - 1);
            }
            lines.push(line);
        }
        return lines;
    }
    // 计时函数
    var timeFunc = function () {
        timeCount++;
        if (timeCount == 5) {
            timeCount = 0;
            time++;
            game.setTime(time);
            socket.emit('time',time);
        }
    }
    // move
    var move = function () {
        timeFunc();
        if (!game.down()) {
            game.fixed();
            socket.emit('fixed');
            var line = game.checkClear();
            if (line) {
                game.addScore(line);
                socket.emit('lines',line);
                if (line>1) {
                    var bottomLines = generataBottomLine(line);
                    socket.emit('bottomLines',bottomLines);
                }
            }
            if (game.checkGameOver()) {
                game.gameover();
                document.getElementById('remote_gameover').innerHTML = 'you win !';
                socket.emit('lose');
                stop();
            }
            else {
                var type = generateType();
                var dir = generateDir();
                game.performNext(type, dir);
                socket.emit('next', { type: type, dir: dir});
            }
        }
        else {
            socket.emit('down');
        }
    }
    //随机生成一个方块
    var generateType = function () {
        return Math.ceil(Math.random() * 7 - 1);
    }
    //随机生成一个旋转次数
    var generateDir = function () {
        return Math.ceil(Math.random() * 4) - 1;
    }
    // start
    var start = function () {
        var doms = {
            gameDiv: document.getElementById('local_game'),
            nextDiv: document.getElementById('local_next'),
            timeDiv: document.getElementById('local_time'),
            scoreDiv: document.getElementById('local_score'),
            resultDiv: document.getElementById('local_gameover')
        }
        game = new Game();
        var type = generateType();
        var dir = generateDir();
        game.init(doms, type, dir);
        socket.emit('init', { type: type, dir: dir });
        bindKeyEvent();
        var t = generateType();
        var d = generateDir();
        game.performNext(t, d);
        socket.emit('next', { type: t, dir: d });
        timer = setInterval(move, INTERVAL);
    }
    // 结束
    var stop = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    }

    socket.on('start', function () {
        document.getElementById('waiting').innerHTML = '';
        start();
    })
    socket.on('lose',function () {
        game.gameover(true);
        stop();
    })
    socket.on('leave',function () {
        document.getElementById('local_gameover').innerHTML = '你的对手离开了人世';
        document.getElementById('remote_gameover').innerHTML = '离开了人世';
    })
    socket.on('bottomLines',function (data) {
        game.addTailLines(data);
        socket.emit('addTailLines',data);
    })
}