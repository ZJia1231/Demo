var Remote = function (socket) {
    // 游戏对象
    var game;
    // 绑定按钮事件
    var bindEvents = function () {
        socket.on('init',function (data) {
            start(data.type,data.dir);
        })
        socket.on('next',function (data) {
            game.performNext(data.type,data.dir);
        })
        socket.on('left',function () {
            game.left();
        })
        socket.on('down',function () {
            game.down();
        })
        socket.on('right',function () {
            game.right();
        })
        socket.on('rotate',function () {
            game.rotate();
        })
        socket.on('fall',function () {
            game.fall();
        })
        socket.on('fixed',function () {
            game.fixed();
        })
        socket.on('lines',function (data) {
            game.checkClear();
            game.addScore(data);
        })
        socket.on('time',function (data) {
            game.setTime(data);
        })
        socket.on('lose',function () {
            game.gameover(false);
        })
        socket.on('addTailLines',function (data) {
            game.addTailLines(data);
        })
    }
    // start
    var start = function (type, dir) {
        var doms = {
            gameDiv: document.getElementById('remote_game'),
            nextDiv: document.getElementById('remote_next'),
            timeDiv: document.getElementById('remote_time'),
            scoreDiv: document.getElementById('remote_score'),
            resultDiv: document.getElementById('remote_gameover')
        }
        game = new Game();
        game.init(doms, type, dir);
    }

    bindEvents();
}