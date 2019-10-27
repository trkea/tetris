
var array = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
];

var move = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var moveFlag = 0;
var NONE_BLOCK = 0;
var BLUE= 1;
var YELLOW = 2;
var RED = 3;
var GREEN = 4;
var OLIVE = 5;
var FUCHSIA = 6;
var SILVER = 7;
var NAVY = 8;
var REAL = 9;
var PURPLE = 10;

function draw() {
    $('#game').find('tr').each(function(i, elemTr) {
        $(elemTr).children().each(function(j, elemTd) {
            $(elemTd).removeClass();
            switch (array[i][j]) {
                case BLUE:
                    $(elemTd).addClass('stick_blue');
                    break;
                case YELLOW:
                    $(elemTd).addClass('stick_yellow');
                    break;
                case RED:
                    $(elemTd).addClass('stick_red');
                    break;
                case GREEN:
                    $(elemTd).addClass('stick_green');
                    break;
                case OLIVE:
                    $(elemTd).addClass('stick_olive');
                    break;
                case FUCHSIA:
                    $(elemTd).addClass('stick_fuchsia');
                    break;
                case SILVER:
                    $(elemTd).addClass('stick_silver');
                    break;
                case NAVY:
                    $(elemTd).addClass('stick_navy');
                    break;
                case REAL:
                    $(elemTd).addClass('stick_real');
                    break;
                case PURPLE:
                    $(elemTd).addClass('stick_purple');
                    break;
                default:
                    $(elemTd).addClass('default');
            }
        })
    });
}

function fall() {
    var under = [1,1,1,1,1,1,1,1,1,1];
    for(var i = 19;i >= 0; i--) {  
        for(var j = 0;j < 10; j++) {
            var color = array[i][j];
            if(under[j] == 0) {
                if(color == NONE_BLOCK) {
                    //下に何もなく、そのマスがブロックでもない時
                    under[j] = 0;
                } else {
                    //下に何もなく、そのマスがブロックである時
                    array[i + 1][j] = array[i][j];
                    array[i][j] = 0;

                    //moveも一緒に動かす
                    if(move[i][j] != 0) {
                        move[i][j] = 0;
                        move[i + 1][j] = color;
                    }
                    under[j] = 0;
                }
            } else {
                if(color == NONE_BLOCK) {
                    //下がブロックでそのますがブロックでない時
                    under[j] = NONE_BLOCK;
                } else {
                    var color = array[i][j];
                    //下がブロックでそのますがブロックの時
                    if (move[i][j] != NONE_BLOCK) {
                        resetMove();
                    }
                    under[j] = color;
                }
            }
        }
    }
}

function resetMove() {
    moveFlag = 0;
    for (var i = 0; i < 20; i++) {
        for(var j = 0;j < 10; j++) {
            move[i][j] = 0;
        }
    }
 }

function genBlock(blockNum) {
    if (moveFlag == 0) {
            array[3][5] = blockNum;
            array[3][4] = blockNum;
            array[3][3] = blockNum;
            array[3][2] = blockNum;
            // moveも同時に変更する
            move[3][5] = blockNum;
            move[3][4] = blockNum;
            move[3][3] = blockNum;
            move[3][2] = blockNum;
            moveFlag = 1;     
        }
    }

document.onkeydown = function(e) {
    switch (e.code) {
        case "Space":
            var random = Math.floor( Math.random() * 11 );
            genBlock(random);
            break;
        case "ArrowRight":
            moveBlockRight();
            break;
        case "ArrowLeft":
            moveBlockLeft();
            break;
    }
    draw();
}

function moveBlockRight() {
    for(var i = 19; i>= 0; i--) {
        var newMove = move[i].concat();
        for(var j = 8;j >= 0; j--) {
            var color = move[i][j];
            if(color != NONE_BLOCK) {
                array[i][j + 1] = array[i][j];
                array[i][j] = 0;
                newMove[j + 1] = color;
                newMove[j] = 0;
            }
        }
        move[i] = newMove;
    }
}

function moveBlockLeft() {
    for(var i = 19;i >= 0; i--) {
        var newMove= move[i].concat();
        for(var j = 1;j < 10; j++) {
            var color = move[i][j]
            if (color != NONE_BLOCK) {
                array[i][j - 1] = array[i][j];
                array[i][j] = 0;
                newMove[j -1] = color;
                newMove[j] = 0;
            }
        }
        move[i] = newMove;
    }
}

function checkDelete() {
    for(var i = 19; i >= 0; i--) {
        if(!array[i].includes(0)) {
            for (var j = 0; j < 10; j++) {
                array[i][j] = 0;
            }
        }
    }
}

draw();
setInterval(function() {
    fall();
    draw();
    checkDelete()
}, 500);