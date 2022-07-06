const playArea = document.getElementById("playArea");
const shooter = {
    src: "images/shooter.png",
    x: 100,
    y: 100,
};
let beams = [];

function init() {
    const shooterElm = document.createElement("img");
    shooterElm.src = shooter.src;
    shooterElm.setAttribute("id", "shooter")
    shooterElm.style.top = shooter.x + "px";
    shooterElm.style.left = shooter.y + "px";
    shooter.shooterElm = shooterElm;
    playArea.appendChild(shooterElm);
}

function addBeam() {
    let beam = { src: "images/ball.png" };
    beam.x = shooter.x;
    beam.y = shooter.y;
    const beamElm = document.createElement("img");
    beamElm.src = beam.src;
    beamElm.setAttribute("class", "beam");
    beamElm.style.top = beam.x + "px";
    beamElm.style.left = beam.y + "px";
    beam.beamElm = beamElm;
    beams.push(beam);
    playArea.appendChild(beamElm);

}

function moveBeam() {
    if (beams.length === 0) { return; }
    let newBeams = []
    for (let beam of beams) {
        if (beam.y < 0) { beam.beamElm.remove() }
        beam.y -= 1;
        beam.beamElm.style.left = beam.y + "px";
        newBeams.push(beam);
    }
    beams = newBeams;
}

function moveShooter(event) {
    let isShooterMoved = true;
    let isProjecttileNewBullet;
    if (event.code === "ArrowUp") {
        shooter.x -= 10;
    } else if (event.code === "ArrowDown") {
        shooter.x += 10;
    } else if (event.code === "ArrowLeft") {
        shooter.y -= 10;
    } else if (event.code === "ArrowRight") {
        shooter.y += 10;
    } else {
        isShooterMoved = false;
        isProjecttileNewBullet = event.code === "Space" ? true : false;
    }
    if (isShooterMoved) {
        shooter.shooterElm.style.top = shooter.x + "px";
        shooter.shooterElm.style.left = shooter.y + "px";
    } else if (isProjecttileNewBullet) { addBeam(); }

}

document.addEventListener("keydown", moveShooter);
init()
setInterval(() => {
    moveBeam();
}, 10);