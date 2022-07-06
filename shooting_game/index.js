const playArea = document.getElementById("playArea");
const shooter = {
    src: "images/shooter.png",
    x: 100,
    y: 100,
};

function init() {
    const shooterElm = document.createElement("img");
    shooterElm.src = shooter.src;
    shooterElm.setAttribute("id", "shooter")
    shooterElm.style.top = shooter.x + "px";
    shooterElm.style.left = shooter.y + "px";
    shooter.shooterElm = shooterElm;
    playArea.appendChild(shooterElm);
}

function move(event) {
    if (event.code === "ArrowUp") {
        shooter.x -= 10;
    } else if (event.code === "ArrowDown") {
        shooter.x += 10;
    } else if (event.code === "ArrowLeft") {
        shooter.y -= 10;
    } else if (event.code === "ArrowRight") {
        shooter.y += 10;
    }
    shooter.shooterElm.style.top = shooter.x + "px";
    shooter.shooterElm.style.left = shooter.y + "px";
}
document.addEventListener("keydown", move);
init()