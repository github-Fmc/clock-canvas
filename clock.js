let WINDOW_WIDTH = 1024;
let WINDOW_HEIGHT = 768;
let RADIUS = 6;
let MARGIN_TOP = 30;
let MARGIN_LEFT = 100;
//let endTime = new Date();
//endTime.setTime( endTime.getTime() + 3600*1000 );
let currentTimeSeconds = 0;
let balls = [];
let colors = ['#8E9FE6', '#6CE6DD', '#FFF1A8', '#FF847C', '#FB5660', '#58E481', '#DB97FF', '#5EA3A6', '#C0C5CD', '#C246C6'];

window.onload = function () {
    WINDOW_WIDTH = document.body.clientWidth || document.documentElement.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight || document.documentElement.clientHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 10);
    RADIUS = Math.round(WINDOW_WIDTH*4/5/107) - 1;
    //console.log(WINDOW_WIDTH, WINDOW_HEIGHT);
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    //console.log(canvas.width, canvas.height);
    currentTimeSeconds = getCurrentTimeSeconds();
    setInterval(() => {
        if(!document.hidden) {
            render( context );
            update();
        }
    }, 50)
};

function update() {
    let nextTimeSeconds = getCurrentTimeSeconds();
    let nextHours = parseInt(nextTimeSeconds / 3600);
    let nextMinutes = parseInt((nextTimeSeconds - nextHours*3600) / 60);
    let nextSeconds = parseInt(nextTimeSeconds % 60);

    let currentHours = parseInt(currentTimeSeconds / 3600);
    let currentMinutes = parseInt((currentTimeSeconds - currentHours*3600) / 60);
    let currentSeconds = currentTimeSeconds % 60;

    if (currentSeconds != nextSeconds) {
        if (parseInt(currentHours / 10) != parseInt(nextHours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(currentHours / 10))
        }
        if (parseInt(currentHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(currentHours % 10))
        }
        if (parseInt(currentMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(currentMinutes / 10))
        }
        if (parseInt(currentMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(currentMinutes % 10))
        }
        if (parseInt(currentSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(currentSeconds / 10))
        }
        if (parseInt(currentSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(currentSeconds % 10))
        }
        currentTimeSeconds = nextTimeSeconds
    }
    updateBalls();
}

function updateBalls() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;
        if (balls[i].y >= WINDOW_HEIGHT-RADIUS) {
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = -balls[i].vy*0.75
        }
    }
    let count = 0;
    for (let j = 0; j < balls.length; j++) {
        if ((balls[j].x+RADIUS)>0 && (balls[j].x-RADIUS)<WINDOW_WIDTH) {
            balls[count++] = balls[j]
        }
    }
    while (balls.length > Math.min(300, count)) {
        balls.pop()
    }
}

function addBalls(x, y, num) {
    for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                let ball = {
                    x: x+j*2*(RADIUS+1)+(RADIUS+1),
                    y: y+i*2*(RADIUS+1)+(RADIUS+1),
                    g: 1.5+Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random()*1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random()*colors.length)]
                };
                balls.push(ball)
            }
        }
    }
    //console.log(balls.length)
}

function getCurrentTimeSeconds() {
    let currentTime = new Date();
    let throughTime = currentTime.getHours()*3600 + currentTime.getMinutes()*60 + currentTime.getSeconds();
    return throughTime
    /*let differ = endTime.getTime() - currentTime.getTime();
    differ = Math.round(differ / 1000);
    console.log(differ);
    return differ >= 0 ? differ : 0*/
}

function render(context) {
    context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    let hours = parseInt(currentTimeSeconds / 3600);
    let minutes = parseInt((currentTimeSeconds - hours*3600) / 60);
    let seconds = currentTimeSeconds % 60;
    //console.log(hours, minutes, seconds);

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), context);
    renderDigit(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(hours % 10), context);
    renderDigit(MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, 10, context);
    renderDigit(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(minutes / 10), context);
    renderDigit(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(minutes % 10), context);
    renderDigit(MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, 10, context);
    renderDigit(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(seconds / 10), context);
    renderDigit(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(seconds % 10), context);

    for (let i = 0; i < balls.length; i++) {
        context.fillStyle = balls[i].color;
        context.beginPath();
        context.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI);
        context.closePath();

        context.fill()
    }
}

function renderDigit(x, y, num, context) {
    context.fillStyle = '#8E9FE6';
    for (let i = 0; i < digit[num].length; i++) {
        for (let j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                context.beginPath();
                context.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0 ,2*Math.PI);
                context.closePath();
                context.fill()
            }
        }
    }
}