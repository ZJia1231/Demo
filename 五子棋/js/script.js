let over = false;
let me = true;
let chessBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
let chess = document.getElementById('chess');
let ctx = chess.getContext('2d');

// 赢法数组
let wins = [];
for (let i = 0; i < 15; i++) {
    wins[i] = [];
    for (let j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}
let count = 0;
// 横向
for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}
// 纵向
for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
            wins[j + k][i][count] = true;
        }
        count++;
    }
}
// 斜线
for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}
// 反斜线
for (let i = 14; i > 3; i--) {
    for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
            wins[i - k][j + k][count] = true;
        }
        count++;
    }
}

// 赢法的统计数组
let myWin = [];
let computerWin = [];
for (let i = 0; i < count; i++) {
    myWin[i] = 0;
    computerWin[i] = 0;
}


ctx.strokeStyle = '#bfbfbf';
ctx.lineWidth = 1;

for (let i = 0; i < 15; i++) {
    ctx.moveTo(15 + i * 30, 15);
    ctx.lineTo(15 + i * 30, 435);
    ctx.stroke();
    ctx.moveTo(15, 15 + i * 30);
    ctx.lineTo(435, 15 + i * 30);
    ctx.stroke();
}

let oneStep = function (i, j, me = false) {
    ctx.beginPath();
    ctx.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    ctx.closePath();
    let gradient = ctx.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30, 15 + j * 30, 0)
    if (me) {
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#636766');
    } else {
        gradient.addColorStop(0, '#d1d1d1');
        gradient.addColorStop(1, '#f9f9f9');
    }
    ctx.fillStyle = gradient;
    ctx.fill();
}

chess.onclick = function (e) {
    if (over) {
        return;
    }
    if (!me) {
        return;
    }
    let i = Math.floor(e.offsetX / 30);
    let j = Math.floor(e.offsetY / 30);
    if (!chessBoard[i][j]) {
        oneStep(i, j, me);
        chessBoard[i][j] = 1;
        me = !me;
        for (let k = 0; k < count; k++) {
            if (wins[i][j][k]) {
                myWin[k]++;
                computerWin[k] = 6;
                if (myWin[k] == 5) {
                    window.alert('you win!');
                    over = true;
                }
            }
        }
        // AI
        if (!over) {
            me = !me;
            computerAI();

        }
    }
}

let computerAI = function () {
    let myScore = [],
        computerScore = [],
        max = 0,
        u = 0,
        v = 0;
    for (let i = 0; i < 15; i++) {
        myScore[i] = [];
        computerScore[i] = [];
        for (let j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            if (chessBoard[i][j] == 0) {
                for (let k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        if (myWin[k] == 1) {
                            myScore[i][j] += 200;
                        } else if (myWin[k] == 2) {
                            myScore[i][j] += 400;
                        } else if (myWin[k] == 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] == 4) {
                            myScore[i][j] += 10000;
                        }
                        if (computerWin[k] == 1) {
                            computerScore[i][j] += 220;
                        } else if (computerWin[k] == 2) {
                            computerScore[i][j] += 420;
                        } else if (computerWin[k] == 3) {
                            computerScore[i][j] += 2100;
                        } else if (computerWin[k] == 4) {
                            computerScore[i][j] += 20000;
                        }
                    }
                }
                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore[i][j] == max) {
                    if (computerScore[i][j] > computerScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
                if (computerScore[i][j] > max) {
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                } else if (computerScore[i][j] == max) {
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    oneStep(u, v);
    chessBoard[u][v] = 2;
    for (let k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            computerWin[k]++;
            myWin[k] = 6;
            if (computerWin[k] == 5) {
                window.alert('you lost!');
                over = true;
            }
        }
    }
}