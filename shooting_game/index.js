const playArea = document.getElementById("playArea");
const mainArea = { H: 700, W: 700 }

class ObjClass {
    constructor(y, x, h, w) {
        this.src;
        this.y = y;
        this.x = x;
        this.h = h;
        this.w = w;
        this.elm;
    }
    createElm(className) {
        const elm = document.createElement("img");
        elm.src = this.src;
        elm.setAttribute("class", className)
        elm.style.left = this.x + "px";
        elm.style.top = this.y + "px";

        this.elm = elm;
    }
}

class ShooterClass extends ObjClass {
    constructor(y, x) {
        super(y, x, 80, 100);
        this.src = "images/shooter.png";
        this.beams = [];
    }
    moveBeams() {
        if (this.beams.length === 0) { return; }
        let newBeams = [];
        for (let beam of this.beams) {
            if (beam.y < -beam.h || mainArea.H < beam.y || beam.x < -beam.w || mainArea.W < beam.x) {
                beam.elm.remove();
                continue;
            }
            beam.y += beam.dy;
            beam.x += beam.dx;
            beam.elm.style.top = beam.y + "px";
            beam.elm.style.left = beam.x + "px";
            newBeams.push(beam);
        }
        this.beams = newBeams;
    }

    addBeam(playArea) {
        for (let angle = -2; angle < 3; angle++) {
            let beam = new BeamClass(this.y + 25, this.x, angle / 5, -1, 0)
            beam.createElm("beam");
            playArea.appendChild(beam.elm);
            this.beams.push(beam);
        }
    }
}

class BeamClass extends ObjClass {
    constructor(y, x, dy, dx, theta) {
        super(y, x, 25, 25);
        this.src = "images/ball.png";
        this.dy = dy;
        this.dx = dx;
        this.theta = theta;
    }
}

class EnemyClass extends ObjClass {
    constructor() {
        let y = Math.random() * (mainArea.H - 80);
        let x = Math.random() * (mainArea.W / 4);
        super(y, x, 100, 80);
        this.src = "images/enemy.png";
        this.beams = [];
        this.timeCount = 0;
        this.interval = 10;
    }
    moveBeams() {
        if (this.beams.length === 0) { return; }
        let newBeams = [];
        for (let beam of this.beams) {
            if (beam.y < -beam.h || mainArea.H < beam.y || beam.x < -beam.w || mainArea.W < beam.x) {
                beam.elm.remove();
                continue;
            }
            beam.y += beam.dy;
            beam.x += beam.dx;
            beam.elm.style.top = beam.y + "px";
            beam.elm.style.left = beam.x + "px";
            newBeams.push(beam);
        }
        this.beams = newBeams;
    }
    addNormalBeam(playArea) {
        for (let angle = -2; angle < 3; angle++) {
            let beam = new BeamClass(this.y + this.h / 2, this.x + this.w / 2, angle / 5, 1, 0);
            beam.createElm("beam");
            playArea.appendChild(beam.elm);
            this.beams.push(beam);
        }
    }
}

let shooter;
let enemies = [];

function init() {
    shooter = new ShooterClass(700 - 80, 700 - 100, );
    shooter.createElm("shooter");
    playArea.appendChild(shooter.elm);
}

function addEnemy() {
    let enemy = new EnemyClass();
    enemy.addNormalBeam(playArea);
    enemy.createElm("enemy");
    playArea.appendChild(enemy.elm);
    enemies.push(enemy);
}

function keyDownEvents(event) {
    let isShooterMoved = true;
    let isProjecttileNewBullet;
    if (event.code === "ArrowUp") {
        shooter.y -= 10;
    } else if (event.code === "ArrowDown") {
        shooter.y += 10;
    } else if (event.code === "ArrowLeft") {
        shooter.x -= 10;
    } else if (event.code === "ArrowRight") {
        shooter.x += 10;
    } else {
        isShooterMoved = false;
        isProjecttileNewBullet = event.code === "Space" ? true : false;
    }

    if (isShooterMoved) {
        shooter.elm.style.left = shooter.x + "px";
        shooter.elm.style.top = shooter.y + "px";
    } else if (isProjecttileNewBullet) { shooter.addBeam(playArea); }

    if (event.code === "KeyZ") {
        addEnemy();
    }

}

document.addEventListener("keydown", keyDownEvents);
init();
setInterval(() => {
    shooter.moveBeams();
    for (let elm of enemies) {
        elm.moveBeams();
    }
}, 10);