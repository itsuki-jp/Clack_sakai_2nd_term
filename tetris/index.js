const canavs = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const mainSize = { H: 440, W: 240 };

canvas.width = mainSize.W;
canvas.height = mainSize.H;

const empt = 0;
const wall = 1;
const moving = 2;
const fixed = 3;

const field = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // ここまで余裕もたせたやつ
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const mino = {
  O: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  I: [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  T: [
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  Z: [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  L: [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
};

let movingArr = [];
let minoArr = ["O", "I", "T", "S", "Z", "J", "L"];
let minoIdx = -1;

function drawField() {
  ctx.strokeStyle = "white";
  for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 12; j++) {
      if (field[i + 3][j] === wall) {
        ctx.fillStyle = "black";
      } else if (field[i + 3][j] === moving) {
        ctx.fillStyle = "blue";
      } else if (field[i + 3][j] === fixed) {
        ctx.fillStyle = "red";
      } else {
        ctx.fillStyle = "grey";
      }
      ctx.fillRect(j * 20, i * 20, 20, 20);
      ctx.strokeRect(j * 20, i * 20, 20, 20);
    }
  }
}

function shuffle(array) {
  for (i = array.length; 1 < i; i--) {
    k = Math.floor(Math.random() * i);
    [array[k], array[i - 1]] = [array[i - 1], array[k]];
  }
}

function setMino() {
  let nowMino = createMino();
  console.log(nowMino);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (nowMino[i][j] === empt) {
        continue;
      }
      field[i + 1][j + 4] = moving;
      movingArr.push([i + 1, j + 4]);
    }
  }
  movingArr.reverse();
}
function convert2fiexed() {
  for (movingObj of movingArr) {
    let [y, x] = movingObj;
    field[y][x] = fixed;
  }
  movingArr = [];
}
function createMino() {
  if (minoIdx === minoArr.length - 1) {
    shuffle(minoArr);
    minoIdx = -1;
  }
  minoIdx++;
  temp = mino[minoArr[minoIdx]];
  return mino[minoArr[minoIdx]];
}

function dropMino() {
  console.log("dropping");
  const checkMovingArr = [];
  for (movingObj of movingArr) {
    let [y, x] = movingObj;
    if (field[y + 1][x] === wall || field[y + 1][x] === fixed) {
      break;
    }
    checkMovingArr.push([y + 1, x]);
  }
  if (checkMovingArr.length !== 4) {
    console.log("end");
    convert2fiexed();
    setMino();
  } else {
    movingArr = checkMovingArr;
    for (movingObj of movingArr) {
      let [y, x] = movingObj;
      field[y - 1][x] = empt;
      field[y][x] = moving;
    }
  }
}

shuffle(minoArr);
setMino();
drawField();
let interval = setInterval(() => {
  dropMino();
  drawField();
}, 100);
