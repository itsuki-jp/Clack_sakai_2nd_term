const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gameSize = { H: 10, W: 10 };
const canvasSize = { H: 500, W: 500 };
const blockSize = {
  H: canvasSize.H / gameSize.H,
  W: canvasSize.W / gameSize.W,
};
canvas.width = canvasSize.W;
canvas.height = canvasSize.H;
const mapDataSet = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const player = { y: 3, x: 0 };

function drawStage(mapData) {
  for (let y = 0; y < gameSize.H; y++) {
    for (let x = 0; x < gameSize.W; x++) {
      if (mapData[y][x] === 0) {
        ctx.fillStyle = "lightblue";
      } else {
        ctx.fillStyle = "#482e00";
      }
      ctx.fillRect(x * blockSize.W, y * blockSize.H, blockSize.W, blockSize.H);
      ctx.strokeStyle = "white";
      ctx.strokeRect(
        x * blockSize.W,
        y * blockSize.H,
        blockSize.W,
        blockSize.H
      );
    }
  }
}
function drawPlayer(y, x) {
  ctx.fillStyle = "red";
  ctx.fillRect(x * blockSize.W, y * blockSize.H, blockSize.W, blockSize.H);
}
function convertEventKey2dydx(event) {
  let directionDict = {
    ArrowRight: [0, 1],
    ArrowLeft: [0, -1],
    ArrowDown: [1, 0],
    ArrowUp: [-1, 0],
  };
  if (event.key in directionDict) {
    return directionDict[event.key];
  }
  return false;
}
function main() {
  drawStage(mapDataSet);
  drawPlayer(player.y, player.x);
}
document.onkeydown = (event) => {
  let dydx = this.convertEventKey2dydx(event);
  if (!dydx) {
    return false;
  }
  let [dy, dx] = dydx;
  player.y += dy;
  player.x += dx;
  main();
};
main();
