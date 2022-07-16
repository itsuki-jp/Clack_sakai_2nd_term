const playArea = document.getElementById("canvas");
const ctx = playArea.getContext("2d");
const mainSize = { H: 500, W: 800 };
const shooterSize = { H: 60, W: 75 };
const enemySize = { H: 100, W: 80 };
const beamSize = { H: 20, W: 20 };

canvas.width = mainSize.W;
canvas.height = mainSize.H;

class ObjClass {
  constructor(y, x, size) {
    this.src;
    this.y = y;
    this.x = x;
    this.h = size.H;
    this.w = size.W;
    this.elm;
  }

  createElm(img) {
    this.img = img;
  }

  collisionDetection(obj2) {
    let obj1 = this;
    let obj1Centre = { x: obj1.x + obj1.w / 2, y: obj1.y + obj1.h / 2 };
    let obj2Centre = { x: obj2.x + obj2.w / 2, y: obj2.y + obj2.h / 2 };
    let distX = Math.abs(obj1Centre.x - obj2Centre.x);
    let distY = Math.abs(obj1Centre.y - obj2Centre.y);
    if (distX <= (obj1.w + obj2.w) / 2 && distY <= (obj1.h + obj2.h) / 2) {
      console.log("hit");
      return true;
    }
    return false;
  }
  collisionDetectionWithArr(arr, both = false) {
    let newArr = [];
    let deleteSelf = false;
    for (let obj of arr) {
      if (this.collisionDetection(obj)) {
        obj.elm.remove();
        deleteSelf = true;
        continue;
      }
      newArr.push(obj);
    }
    if (both) {
      return deleteSelf;
    }
  }
}

class ShooterClass extends ObjClass {
  constructor(y, x, size) {
    super(y, x, size);
    this.beams = [];
  }

  moveBeams() {
    if (this.beams.length === 0) {
      return;
    }
    let newBeams = [];
    for (let beam of this.beams) {
      if (
        beam.y < -beam.h ||
        mainSize.H < beam.y + beam.h ||
        beam.x < -beam.w ||
        mainSize.W < beam.x + beam.w
      ) {
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

  addBeam(beam, playArea) {
    beam.createElm("beam");
    playArea.appendChild(beam.elm);
    this.beams.push(beam);
  }

  addNormalBeam(playArea) {
    for (let angle = -2; angle < 3; angle++) {
      let beam = new BeamClass(
        this.y + this.h / 2,
        this.x + this.w / 2,
        angle / 5,
        1,
        0,
        "images/enemyBullet.png",
        beamSize
      );
      this.addBeam(beam, playArea);
    }
  }
  addCircularBeam(playArea) {
    let numOfBullet = 10;
    for (let angle = 0; angle < numOfBullet; angle++) {
      let beam = new BeamClass(
        this.y + this.h / 2,
        this.x + this.w / 2 - 25 / 2,
        2 * Math.sin((angle * (2 * Math.PI)) / numOfBullet),
        2 * Math.cos((angle * (2 * Math.PI)) / numOfBullet),
        0,
        "images/enemyBullet.png",
        beamSize
      );
      this.addBeam(beam, playArea);
    }
  }
  addCircularBeam2(playArea) {
    let count = 0;
    let interval = 1;
    let numOfBullet = 20;
    let angle = 0;
    let timeCount = 0;
    let temp = setInterval(() => {
      if (this.deleted) {
        clearInterval(temp);
      }
      if (count == 20) {
        clearInterval(temp);
      }
      if (timeCount === interval) {
        let beam = new BeamClass(
          this.y + this.h / 2,
          this.x + this.w / 2 - 25 / 2,
          Math.sin((angle * (2 * Math.PI)) / numOfBullet),
          Math.cos((angle * (2 * Math.PI)) / numOfBullet),
          0,
          "images/enemyBullet.png",
          beamSize
        );
        this.addBeam(beam, playArea);
        timeCount = 0;
        angle++;
        if (angle % numOfBullet === 0) {
          count++;
        }
      } else {
        timeCount++;
      }
    }, 10);
  }
}

class BeamClass extends ObjClass {
  constructor(y, x, dy, dx, theta, src, size) {
    super(y, x, size);
    this.src = src;
    this.dy = dy;
    this.dx = dx;
    this.theta = theta;
  }
}

class PlayerClass extends ShooterClass {}
class EnemyClass extends ObjClass {
  constructor(size) {
    let y = Math.random() * (mainSize.H - 100);
    let x = Math.random() * (mainSize.W / 4);
    super(y, x, size);
    this.src = "images/enemy.png";
    this.beams = [];
    this.deleted = false;
  }
}

let shooter;
let enemies = [];

function init() {
  shooter = new ShooterClass(
    mainSize.H - shooterSize.H,
    mainSize.W - shooterSize.W,
    shooterSize
  );
  shooter.createElm("shooter");
  playArea.appendChild(shooter.elm);
}

function addEnemy() {
  let enemy = new EnemyClass(enemySize);
  enemy.addCircularBeam2(playArea);
  enemy.createElm("enemy");
  playArea.appendChild(enemy.elm);
  enemies.push(enemy);
}

function collisionDetectionWithEnemyBullet() {
  for (let enemy of enemies) {
    shooter.collisionDetectionWithArr(enemy.beams);
  }
}

function collisionDetectionWithShooterBullet() {
  for (let enemy of enemies) {
    if (enemy.deleted) {
      continue;
    }
    if (enemy.collisionDetectionWithArr(shooter.beams, true)) {
      enemy.elm.remove();
      enemy.deleted = true;
    }
  }
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
  } else if (isProjecttileNewBullet) {
    shooter.addBeam(playArea);
  }
}

document.addEventListener("keydown", keyDownEvents);
init();
setInterval(() => {
  if (Math.random() < 0.002) {
    addEnemy();
  }
  collisionDetectionWithEnemyBullet();
  collisionDetectionWithShooterBullet();
  shooter.moveBeams();
  let rmv = [];
  for (let i = 0; i < enemies.length; i++) {
    let elm = enemies[i];
    if (elm.deleted &&rec elm.beams.length === 0) {
      rmv.push(i);
      continue;
    }
    elm.moveBeams();
  }
  for (let i = 0; i < rmv.length; i++) {
    enemies.splice(rmv[i] - i, 1);
  }
}, 10);
