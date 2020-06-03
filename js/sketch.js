let scoreLeft = 0;
let scoreRight = 0;

// let ball = {
//     x: 0,
//     y: 0,
//     speedX: 10,
//     speedY: 0,
//     radius: 40
// }

let paddleLeft;
let paddleRight;
let ball;
let hue;
let sat;
let bright;
let hue02;
let sat02;
let bright02;



function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    rectMode(CENTER);
    noStroke();
    colorMode(HSB, 100);

    hue = random(0, 100);
    sat = random(50, 100);
    bright = random(50, 100);

    hue02 = random(0, 100);
    sat02 = random(50, 100);
    bright02 = random(50, 100);

    paddleLeft = new Paddle(30, 0, 20, 150);
    paddleRight = new Paddle(0, 0, 20, 150);
    ball = new Ball(0, 0, 10, 0, 40);

    ball.x = width / 2;
    ball.y = height / 2;

    paddleRight.x = width - 30;
}

function draw() {
    background(0);
    fill(255);
    moveBall();
    bounceBall();
    drawElements();

    paddleLeft.afficherLeft();
    paddleLeft.bougerLeft();

    paddleRight.afficherRight();
    paddleRight.bougerRight();

    ball.afficher();
}

function drawElements() {
    // ellipse(ball.x, ball.y, ball.radius);
    textSize(100);
    textAlign(RIGHT)
    text(scoreLeft, width / 2 - 40, 100);
    textAlign(LEFT)

    text(scoreRight, width / 2 + 40, 100);

    for (let y = 0; y < height; y = y + 30) {
        rect(width / 2, y, 20, 20);
    }
}

function bounceBall() {
    // Detection de collision Paddle Right
    if (ball.x >= paddleRight.x - paddleRight.width * 2 &&
        ball.y >= paddleRight.y - paddleRight.height / 2 &&
        ball.y <= paddleRight.y + paddleRight.height / 2) {
        ball.speedX = -ball.speedX;
        ball.speedY = random(-5, 5);
        fill(hue, sat, bright);
    }

    // Detection de collision Paddle Left
    if (ball.x <= paddleLeft.x + paddleLeft.width * 2 &&
        ball.y >= paddleLeft.y - paddleLeft.height / 2 &&
        ball.y <= paddleLeft.y + paddleLeft.height / 2) {
        ball.speedX = -ball.speedX;
        ball.speedY = random(-5, 5);
        fill(hue, sat, bright);
    }

    // Detection collision "murs" haut et bas
    if (ball.y <= ball.radius || ball.y >= height - ball.radius) {
        ball.speedY = -ball.speedY;
    }

    if (ball.x > width) {
        resetBall('left');
        scoreLeft += 1;
    } else if (ball.x < 0) {
        resetBall('right');
        scoreRight += 1;
    }
}

class Paddle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    afficherLeft() {
        this.y = mouseX;
        rect(this.x, this.y, this.width, this.height);
        fill(hue02, sat02, bright02);
    }
    afficherRight() {
        this.y = mouseY;
        rect(this.x, this.y, this.width, this.height);
        fill(hue, sat, bright);
    }
    bougerLeft() {
        this.y = mouseX;
    }
    bougerRight() {
        this.y = mouseY;
    }
}

class Ball {
    constructor(x, y, speedX, speedY, radius) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.radius = radius;
    }
    afficher() {
        ellipse(this.x, this.y, this.radius);
    }
}

function moveBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
}

function resetBall() {
    ball.x = width / 2;
    ball.y = height / 2;
    ball.speedX = -ball.speedX;
    ball.speedY = random(-2, 2);

}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    setup();
}