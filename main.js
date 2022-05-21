var grid = [];
var stopp = [];
var score = 0;
var level = 5;
var lvlfalling = [
    500, 450, 400, 350, 300, 250, 200, 150, 100, 50
]

for (var i = 0; i < 20; i++) {
    var h = [];
    for (var ii = 0; ii < 10; ii++) {
        h.push(0)
    }
    grid.push(h);
}

for (var i = 0; i < 20; i++) {
    var h = [];
    for (var ii = 0; ii < 10; ii++) {
        h.push(0);
    }
    stopp.push(h);
}

var tms;
var rate = 200;
var spaceflag = false;
setInterval(function () {
    if (spaceflag) {
        tms.update();

    }
}, 1);

function getcoords(nbr) {
    var coords = [
        [],
        [],
        [],
        []
    ];
    switch (nbr) {
        case 0:
            coords[0] = [0, 3];
            coords[1] = [0, 4];
            coords[2] = [0, 5];
            coords[3] = [0, 6];
            break;
        case 1:
            coords[0] = [0, 3];
            coords[1] = [1, 3];
            coords[2] = [1, 4];
            coords[3] = [1, 5];
            break;
        case 2:
            coords[0] = [0, 3];
            coords[1] = [0, 4];
            coords[2] = [0, 5];
            coords[3] = [1, 3];
            break;
        case 3:
            coords[0] = [0, 4];
            coords[1] = [0, 5];
            coords[2] = [1, 4];
            coords[3] = [1, 5];
            break;
        case 4:
            coords[0] = [0, 4];
            coords[1] = [0, 5];
            coords[2] = [1, 3];
            coords[3] = [1, 4];
            break;
        case 5:
            coords[0] = [1, 4];
            coords[1] = [0, 3];
            coords[2] = [0, 4];
            coords[3] = [0, 5];
            break;
        case 6:
            coords[0] = [0, 3];
            coords[1] = [0, 4];
            coords[2] = [1, 4];
            coords[3] = [1, 5];
            break;

    }
    return coords;
}
var shownext = false;
class Tetromino {
    constructor(nbr) {
        this.nbr = nbr;
        this.coords = [];
        this.letter = nbr + 1;
        this.me = 3;
        this.umbrella = 0;
        this.mm = 3;
        switch (nbr) {
            case 0:
                this.coords[0] = [0, 3];
                this.coords[1] = [0, 4];
                this.coords[2] = [0, 5];
                this.coords[3] = [0, 6];
                this.me = 4;
                break;
            case 1:
                this.coords[0] = [0, 3];
                this.coords[1] = [1, 3];
                this.coords[2] = [1, 4];
                this.coords[3] = [1, 5];
                break;
            case 2:
                this.coords[0] = [0, 3];
                this.coords[1] = [0, 4];
                this.coords[2] = [0, 5];
                this.coords[3] = [1, 3];
                break;
            case 3:
                this.coords[0] = [0, 4];
                this.coords[1] = [0, 5];
                this.coords[2] = [1, 4];
                this.coords[3] = [1, 5];
                this.me = 2;
                break;
            case 4:
                this.coords[0] = [0, 4];
                this.coords[1] = [0, 5];
                this.coords[2] = [1, 3];
                this.coords[3] = [1, 4];
                break;
            case 5:
                this.coords[0] = [1, 4];
                this.coords[1] = [0, 3];
                this.coords[2] = [0, 4];
                this.coords[3] = [0, 5];
                break;
            case 6:
                this.coords[0] = [0, 3];
                this.coords[1] = [0, 4];
                this.coords[2] = [1, 4];
                this.coords[3] = [1, 5];
                break;

        }

        var u = this;

        for (var o = 0; o < 4; o++) {
            u.coords[o][0] -= 1;
        }
    }
    async update() {
        if (!stopgame) {
            var biggest = 0;

            var smallest = 0;
            var underme = false;
            var g = [];
            var me = this;
            for (var i = 0; i < 4; i++) {

                g.push(me.coords[i][0]);
            }
            smallest = Math.min(...g);
            biggest = Math.max(...g);

            if (biggest < 19) {
                for (var i = 0; i < 4; i++) {
                    if (stopp[me.coords[i][0] + 1][me.coords[i][1]]) {
                        underme = true;
                    }

                }
            }
            for (var i = 0; i < 4; i++) {

                if ((biggest < 19) && !underme) {

                    me.coords[i][0] = me.coords[i][0] + 1;

                }
            }
            if ((biggest < 19) && !underme) {
                me.umbrella++;
            } else {
                for (var i = 0; i < 4; i++) {

                    if (me.coords[i][0] < 0) {
                        gameover();
                    }
                    stopp[me.coords[i][0]][me.coords[i][1]] = me.letter;
                }
                spaceflag = false;
                SpawnTetromino();


            }

        }

    }


    render() {
        try {

            var k = this;
            for (var i = 0; i < 4; i++) {

                grid[k.coords[i][0]][k.coords[i][1]] = k.letter;
            }
        } catch (e) {}
    }
    destroy() {
        this.destroyed = true;
    }

    async moveleft() {

        //var aud = new Audio('sounds/move.wav');
        //aud.play();
        var u = this;
        var underme = false;
        u.coords.forEach(function (coord, i) {
            if (stopp[coord[0]][coord[1] - 1]) {
                underme = true;
            }
        });
        if ((Math.min(u.coords[0][1], u.coords[1][1], u.coords[2][1], u.coords[3][1])) < 1) {
            underme = true;
        }
        if (!underme) {
            u.mm--;
            for (var i = 0; i < 4; i++) {
                u.coords[i][1] = u.coords[i][1] - 1
            }
        }
    }
    async moveright() {

        //var aud = new Audio('sounds/move.wav');
        //aud.play();
        var u = this;
        var underme = false;
        u.coords.forEach(function (coord, i) {
            if (stopp[coord[0]][coord[1] + 1]) {
                underme = true;
            }
        });
        if ((Math.max(u.coords[0][1], u.coords[1][1], u.coords[2][1], u.coords[3][1])) > 8) {
            underme = true;
        }
        if (!underme) {
            u.mm++;
            for (var i = 0; i < 4; i++) {
                u.coords[i][1] = u.coords[i][1] + 1
            }
        }
    }
    async turn(se) {
        //var aud = new Audio('sounds/turn.wav');
        //aud.play();
        var me = this.me;
        var u = this;
        var d = new Matrix(me);
        var io = 0;
        if (this.me == 2) {

            stepflag = true;
            return
        }
        if (this.nbr == 0) {
            io = 1;
        }
        for (var i = 0; i < 4; i++) {
            d.set(u.coords[i][1] - u.mm, u.coords[i][0] + io - u.umbrella + 1, 1);
        }
        d = d.rotate();
        if (se) {

            d = d.rotate();
            d = d.rotate();
        }
        var f = d.get();
        var underme = false;

        for (var i = 0; i < 4; i++) {
            if (f[i][0] >= 19) {
                underme = true;
            }
            try {
                if (stopp[f[i][0] - io + u.umbrella - 1][f[i][1] + u.mm] != 0) {
                    underme = true;
                }
            } catch (e) {
                console.log(e);
                underme = true;
            }

            if (f[i][1] + u.mm >= 10 || f[i][1] + u.mm < 0) {
                underme = true;
            }

        }
        if (underme) {
            //maybe shake animation
            stepflag = true;
        } else {
            for (var i = 0; i < 4; i++) {
                f[i][1] = f[i][1] + u.mm;
                f[i][0] = f[i][0] + u.umbrella - io - 1;
            }
            u.coords = f;
            stepflag = true;
        }

    }
}
class Matrix {
    constructor(N) {
        this.val = [];
        this.N = N;
        var u = this;
        for (var i = 0; i < N; i++) {
            u.val.push([]);
            for (var ii = 0; ii < N; ii++) {
                u.val[i][ii] = 0;
            }
        }
    }
    set(x, y, value) {
        this.val[y][x] = value;
        return this;
    }
    rotate() {
        var N = this.N;
        var a = this.val;
        for (var i = 0; i < parseInt(N / 2); i++) {
            for (var j = i; j < N - i - 1; j++) {
                var temp = a[i][j];
                a[i][j] = a[N - 1 - j][i];
                a[N - 1 - j][i] = a[N - 1 - i][N - 1 - j];
                a[N - 1 - i][N - 1 - j] = a[j][N - 1 - i];
                a[j][N - 1 - i] = temp;
            }
        }
        return this;
    }
    get() {
        var N = this.N;
        var val = this.val;
        var f = [];
        for (var y = 0; y < N; y++) {
            for (var x = 0; x < N; x++) {
                if (val[y][x]) {
                    f.push([y, x]);
                }
            }
        }
        return f;
    }
}
var stopeverything = false;
var stepflag = true;
var pressed = {
    'ArrowRight': false,
    'ArrowLeft': false,
    'ArrowDown': false,
    ' ': false,
    '5': false,
    '7': false,
    '9': false
};
var presseds = {};
setInterval(function () {
    if (presseds['ArrowRight']) {
        tms.moveright();
        step(true);
    }
    if (presseds['9']) {
        tms.moveright();
        step(true);
    }
    if (presseds['ArrowLeft']) {
        tms.moveleft();
        step(true);
    }
    if (presseds['7']) {
        tms.moveleft();
        step(true);
    }
    if (presseds['ArrowDown']) {
        step();
    }

}, 70);
var KeypressFunctions = {
    'z': {
        keydown: function _keypressUpArrow() {
            stepflag = false;

            tms.turn(true);
        }
    },
    '1': {
        keydown: function () {
            shownext = shownext ^ 1;
        }
    },
    'ArrowUp': {
        keydown: function _keypressUpArrow() {
            stepflag = false;

            tms.turn(true);
        }
    },
    '8': {
        keydown: function _keypressUpArrow() {
            stepflag = false;

            tms.turn(false);
        }
    },
    'x': {
        keydown: function _keypressUpArrow() {
            stepflag = false;

            tms.turn(false);
        }
    },
    'ArrowRight': {
        keydown: function _keypressRightArrow() {
            tms.moveright();
            step(true);
            setTimeout(function () {
                if (pressed['ArrowRight']) {
                    presseds['ArrowRight'] = true;
                }
            }, 300); //auto
        },
        keyup: function () {
            pressed['ArrowRight'] = false;
            presseds['ArrowRight'] = false;
        }
    },
    '9': {
        keydown: function _keypressRightArrow() {
            tms.moveright();
            step(true);
            setTimeout(function () {
                if (pressed['9']) {
                    presseds['9'] = true;
                }
            }, 300); //auto
        },
        keyup: function () {
            pressed['9'] = false;
            presseds['9'] = false;
        }
    },
    'ArrowLeft': {
        keydown: function _keypressLeftArrow() {
            tms.moveleft();
            step(true);
            setTimeout(function () {
                if (pressed['ArrowLeft']) {
                    presseds['ArrowLeft'] = true;
                }
            }, 300); //auto
        },
        keyup: function () {
            pressed['ArrowLeft'] = false;
            presseds['ArrowLeft'] = false;
        }
    },
    '7': {
        keydown: function _keypressLeftArrow() {
            tms.moveleft();
            step(true);
            setTimeout(function () {
                if (pressed['7']) {
                    presseds['7'] = true;
                }
            }, 300); //auto
        },
        keyup: function () {
            pressed['7'] = false;
            presseds['7'] = false;
        }
    },
    '4': {
        keydown: function () {
            step();
            setTimeout(function () {
                if (pressed['ArrowDown']) {
                    presseds['ArrowDown'] = true;
                }
            }, 300); //auto
        },
        keyup: function () {
            pressed['ArrowDown'] = false;
            presseds['ArrowDown'] = false;
        }
    },
    '5': {
        keydown: function drop() {
            spaceflag = true;
            score=score+(( (21 + (3 * level)) - ffit )>0?( (21 + (3 * level)) - ffit ):0);
            ffit=0;
        }
    },
    ' ': {
        keydown: function drop() {
            spaceflag = true;
            score=score+(( (21 + (3 * level)) - ffit )>0?( (21 + (3 * level)) - ffit ):0);
            ffit=0;
        }
    }
};
var yournameflag=true;
var myname = "";
const keyHandler = (ev) => {
    if(stopgame){
        if(yournameflag){
            if(ev.type=='keydown'){
                if(ev.key=='Backspace')
                {
                    myname=myname.substr(0,myname.length-1);
                }else if(ev.key=='Enter')
                {
                    $('.yn-c').addClass('ui');
                }
                else
                {
                    myname+=ev.key;
                }
            }
        }
    }
    if (ev.repeat) return;
    if (!(ev.key in KeypressFunctions) || !(ev.type in KeypressFunctions[ev.key])) return;
    if(!stopgame){
        pressed[ev.key] = true;
        KeypressFunctions[ev.key][ev.type]();
    }
};


['keydown', 'keyup'].forEach((evType) => {
    window.addEventListener(evType, keyHandler);
});
var lines = 0;

function gameover() {
    stopgame = true;
    $('.yn-c').removeClass('ui');
}
var ffit = 0;
async function step(hjhj) {

    if (!stopgame) {
        grid = [
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ],
            [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        ];
        
        if (!hjhj) {

            tms.update();
        }
        tms.render();
        
        for (var i = 0; i < 10; i++) {
            if (stopp[0][i]) {
                gameover();
            }
        }

        //row detection
        var eo = 0;
        for (var i = 0; i < 20; i++) {
            var e = 0;
            for (var ii = 0; ii < 10; ii++) {
                if (stopp[i][ii] > 0) {
                    e++;
                }
            }
            if (e == 10) {
                for (var r = i; r > 0; r--) {
                    for (var rr = 0; rr < 10; rr++) {
                        stopp[r][rr] = stopp[r - 1][rr];
                    }
                }
                eo++;
                lines++;
            }
        }
        if (eo) {
            switch (eo) {
                case 0:
                    break;
                case 1:
                    score = score + (40 * (level + 1));
                    break;
                case 2:
                    score = score + (100 * (level + 1));
                    break;
                case 3:
                    score = score + (300 * (level + 1));
                    break;
                case 4:
                    score = score + (1200 * (level + 1));
                    break;
            }

            if (eo > 4) {
                score = score + (1200 * (level + 1));
            }
        }
        ffit++;


    }
}
$(document).ready(async function () {

    //window.requestAnimationFrame(draw);
    setInterval(function () {
        if (stepflag) {
            step();
        }
    }, lvlfalling[level + 1]);
    draw();
});
var imgloadload = false;
var stopgame = false;
async function draw() {
    if (!stopgame) {

        for (var i = 0; i < 20; i++) {
            for (var ii = 0; ii < 10; ii++) {
                var y = grid[i][ii];
                if (y) {} else {
                    y = stopp[i][ii];
                }
                if (y) {
                    y = '[]';
                } else {
                    y = '.'
                }
                $($('.el')[ii + (i * 10)]).text(y);
            }
        }

        $('.next').html(`<div class="t">
    <div class="ell"></div>
    <div class="ell"></div>
    <div class="ell"></div>
    <div class="ell"></div>
</div>
<div class="t">
    <div class="ell"></div>
    <div class="ell"></div>
    <div class="ell"></div>
    <div class="ell"></div>
</div>
<div class="t">
    <div class="ell"></div>
    <div class="ell"></div>
    <div class="ell"></div>
    <div class="ell"></div>
</div>
<div class="t">
    <div class="ell"></div>
    <div class="ell"></div>
    <div class="ell"></div>
    <div class="ell"></div>
</div>`);
        if (shownext) {
            var crds = getcoords(newrnd);
            for (var i = 0; i < 4; i++) {
                $($('.ell')[(crds[i][1] - 3) + (crds[i][0] * 4)]).text('[]');
            }
        }
        $('.level').text(level);
        $('.score').text(score);




        setTimeout(draw, 1000 / 60);

    }else{
        $('#yourname').text(myname);
        setTimeout(draw, 1000 / 60);
    }


}


var newrnd = Math.floor(Math.random() * 7);


function isArrayInArray(arr, item) {
    var item_as_string = JSON.stringify(item);

    var contains = arr.some(function (ele) {
        return JSON.stringify(ele) === item_as_string;
    });
    return contains;
}


function drawPixel(context, x, y, color) {
    var roundedX = Math.round(x);
    var roundedY = Math.round(y);
    context.beginPath();
    context.fillStyle = color || '#000';
    context.fillRect(roundedX, roundedY, 1, 1);
    context.fill();
}


function SpawnTetromino(u) {

    //tms.push(new Tetromino(u));
    tms = new Tetromino(newrnd);
    if (!u) {
        newrnd = Math.floor(Math.random() * 7);
    } else {
        newrnd = u;
    }

}

setTimeout(function () {
    SpawnTetromino();
}, 300);