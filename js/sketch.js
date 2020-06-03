let scoreLeft = 0;
let scoreRight = 0;
let player1;
let player2;


// let ball = {
//     x: 0,
//     y: 0,
//     speedX: 10,
//     speedY: 0,
//     radius: 40
// }


let paddleLeft;
let paddleRight;

let paddles = [];
let balls = [];



function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    noStroke();
    colorMode(HSB, 100);


    paddleLeft = new Paddle(30, 0, 20, 150, 'mouseX');
    paddleRight = new Paddle(width - 30, 0, 20, 150, 'mouseY');

    paddles.push(paddleLeft);
    paddles.push(paddleRight);

    for (let i = 0; i < 1; i += 1) {
        balls[i] = new Ball(width / 2, height / 2, 30, 10, random(-10, 10));
    }
    // let ball = new Ball(0, 0, 10, 0, 40);

    player1 = prompt('Joueur 1:');
    player2 = prompt('Joueur 2:');


}

function draw() {
    background(0);
    fill(255);
    drawStadium();

    for (let i = 0; i < paddles.length; i += 1) {
        paddles[i].afficher();
        paddles[i].bouger();
    }

    for (let i = 0; i < balls.length; i += 1) {
        balls[i].afficher();
        balls[i].bouger();
        balls[i].rebondir();
        balls[i].score();
    }
}

function drawStadium() {
    // ellipse(ball.x, ball.y, ball.radius);
    textSize(100);
    textAlign(RIGHT)
    text(scoreLeft, width / 2 - 40, 100);
    textAlign(LEFT)

    text(scoreRight, width / 2 + 40, 100);

    for (let y = 0; y < height; y = y + 30) {
        rect(width / 2, y, 20, 20);
    }
    textSize(50);
    textAlign(LEFT);
    text(player1, 80, 50);
    textAlign(RIGHT);
    text(player2, width - 80, 50);
}

class Paddle {
    constructor(x, y, width, height, axis) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.hue = 0;
        this.brightness = 255;
        this.saturation = 0;
        this.axis = axis;
    }
    afficher() {
        fill(this.hue, this.saturation, this.brightness);
        rect(this.x, this.y, this.width, this.height);
    }

    bouger() {
        if (this.axis == 'mouseX') {
            this.y = mouseX;
        } else if (this.axis == 'mouseY') {
            this.y = mouseY;
        }
    }
    changeColor(hue, saturation, brightness) {
        this.hue = hue;
        this.saturation = saturation;
        this.brightness = brightness;
    }

}

class Ball {
    constructor(_x, _y, _radius, _speedX, _speedY) {
        this.x = _x;
        this.y = _y;
        this.radius = _radius;
        this.speedX = _speedX;
        this.speedY = _speedY;
        this.distances = [];
        this.enabled = true;
        this.col = color(0, 0, 255);
    }

    afficher() {
        fill(this.col);
        ellipse(this.x, this.y, this.radius);
    }
    bouger() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    rebondir() {
        // Check for bounce against paddles
        for (let i = 0; i < paddles.length; i += 1) {
            if (this.x + this.radius / 2 > paddles[i].x &&
                this.x - this.radius / 2 < paddles[i].x + paddles[i].width &&
                this.y > paddles[i].y && this.y < paddles[i].y + paddles[i].height) {
                this.speedX = -this.speedX;
                this.speedY = random(-5, 5);
                let randomHue = random(0, 255);
                paddles[i].changeColor(randomHue, 255, 255);
            }
        }

        // Check
        // for bounce against edges
        if (this.y > height - this.radius / 2 || this.y < 0 + this.radius / 2) {
            this.speedY = -this.speedY;
            if (this.x > width) {
                resetBall();
                scoreLeft += 1;
            } else if (this.x < 0) {
                resetBall();
                scoreRight += 1;
            }
        }

    }

    score() {
        if (this.enabled && this.x < 0) {
            scoreRight += 1;
            this.winner();
            this.resetBall();
        } else if (this.enabled && this.x > width) {
            scoreLeft += 1;
            this.winner();
            this.resetBall();
        }
    }
    resetBall() {
        this.x = width / 2;
        this.y = height / 2;
        this.speedX = -this.speedX;
        this.speedY = random(-2, 2);
    }
    winner() {
        if (scoreRight > 2) {
            alert(player2 + ' a gagné !');
            this.newgame();
        } else if (scoreLeft > 2) {
            alert(player1 + ' a gagné');
            this.newgame();
        }
    }
    newgame() {
        let x = false;
        x = confirm('Voulez-vous rejouer ?');
        if (x == true) {
            setup();
        }
    }
}


function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    setup();
}