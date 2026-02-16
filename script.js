let score = 0;
let miss = 0;
let basketX = 170;
let berry;
let berryY = 0;
let berryX = 0;
let gameInterval;
let speed = 4;

function setMode(mode) {
    if (mode === "easy") speed = 3;
    if (mode === "medium") speed = 5;
    if (mode === "hard") speed = 8;
}

function startGame() {
    resetGame();
    createBerry();
    gameInterval = setInterval(moveBerry, 20);
}

function resetGame() {
    clearInterval(gameInterval);
    document.getElementById("gameArea").innerHTML = '<div id="basket">🧺</div>';
    basketX = 170;
    score = 0;
    miss = 0;
    updateDisplay();
    document.getElementById("message").textContent = "";
}

function createBerry() {
    berry = document.createElement("div");
    berry.classList.add("berry");
    berry.textContent = randomBerry();
    berryY = 0;
    berryX = Math.random() * 380;
    berry.style.left = berryX + "px";
    berry.style.top = berryY + "px";
    document.getElementById("gameArea").appendChild(berry);
}

function moveBerry() {
    berryY += speed;
    berry.style.top = berryY + "px";

    if (berryY > 370) {
        checkCatch();
        berry.remove();
        createBerry();
    }
}

function checkCatch() {
    let basketLeft = basketX;
    let basketRight = basketX + 60;

    if (berryX > basketLeft && berryX < basketRight) {
        score++;
    } else {
        miss++;
    }

    updateDisplay();
    checkGameOver();
}

function updateDisplay() {
    document.getElementById("score").textContent = score;
    document.getElementById("miss").textContent = miss;
}

function checkGameOver() {
    if (score >= 15) {
        clearInterval(gameInterval);
        document.getElementById("message").textContent = "You Win!";
    }

    if (miss >= 5) {
        clearInterval(gameInterval);
        document.getElementById("message").textContent = "Game Over!";
    }
}

function randomBerry() {
    let berries = ["🍓", "🫐", "🍑"];
    return berries[Math.floor(Math.random() * berries.length)];
}

document.addEventListener("keydown", function(e) {
    let basket = document.getElementById("basket");

    if (e.key === "ArrowLeft" && basketX > 0) {
        basketX -= 20;
    }

    if (e.key === "ArrowRight" && basketX < 340) {
        basketX += 20;
    }

    basket.style.left = basketX + "px";
});

