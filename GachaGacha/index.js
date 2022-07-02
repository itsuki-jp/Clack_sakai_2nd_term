const gachaBtn = document.getElementById("gachaBtn");
const imgArea = document.getElementById("imgArea");
const money = document.getElementById("money");
const buyItemBtn = document.getElementById("buyItemBtn");
const data = [
    { path: "./img/out0.png", prob: 10 },
    { path: "./img/out1.png", prob: 10 },
    { path: "./img/out2.png", prob: 30 },
    { path: "./img/out3.png", prob: 10 }
];
let moneyAmount = 10;
const price = 10;
const total = (function() {
    let res = 0;
    for (eachData of data) {
        res += eachData.prob;
    }
    return res;
})();


function setMoney(amount) {
    money.innerText = `Money : ${moneyAmount}`;
}

setMoney(moneyAmount);

gachaBtn.onclick = () => {
    imgArea.innerHTML = "";
    if (!(price <= moneyAmount)) {
        console.log("no money");
        return;
    }
    const img = document.createElement("img");
    let rnd = Math.random()
    let pre = 0;
    for (eachData of data) {
        if (rnd <= pre + eachData.prob / total) {
            console.log(eachData.prob)
            img.src = eachData.path;
            break;
        }
        pre += eachData.prob / total;
    }
    imgArea.appendChild(img);
    moneyAmount -= price;
    setMoney(moneyAmount);
}

buyItemBtn.onclick = () => {
    moneyAmount += price;
    setMoney(moneyAmount);
}