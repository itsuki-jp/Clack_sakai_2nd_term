const ball = document.getElementById("ball");
const strike = document.getElementById("strike");
const out = document.getElementById("out");

const ballBtn = document.getElementById("ballBtn");
const strikeBtn = document.getElementById("strikeBtn");
const outBtn = document.getElementById("outBtn");

let num = {
    "ball": 0,
    "strike": 0,
    "out": 0,
};

function clearCount(objArr) {
    for (let obj of objArr) {
        for (let i = 0; i < obj.childElementCount - 1; i++) {
            const target = obj.children[i + 1];
            target.classList.add("off");
            target.classList.remove("on");
        }
    }
}

function addOnOff(target) {
    target.classList.add("on");
    target.classList.remove("off");
}

function ballController() {
    if (num.ball < 3) {
        addOnOff(ball.children[num.ball + 1]);
        num.ball++;
    } else {
        clearCount([ball, strike]);
        num.ball = 0;
        num.strike = 0;
    }
}

function strikeController() {
    if (num.strike < 2) {
        addOnOff(strike.children[num.strike + 1]);
        num.strike++;
    } else {
        clearCount([ball, strike]);
        num.ball = 0;
        num.strike = 0;
        outController();
    }
}

function outController() {
    if (num.out < 2) {
        addOnOff(out.children[num.out + 1]);
        num.out++;
    } else {
        clearCount([ball, strike, out]);
        document.getElementById("gameover").innerText = "GAME OVER";
        num = {
            "ball": 0,
            "strike": 0,
            "out": 0,
        };
    }
}

ballBtn.onclick = () => {
    ballController();
}
strikeBtn.onclick = () => {
    strikeController();
}
outBtn.onclick = () => {
    outController();
}