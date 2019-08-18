const bowls = document.querySelectorAll(".bowl");
const scoreBoard = document.querySelector(".score");
const avocados = document.querySelectorAll(".avocado");
//Save the last bowl to prevent the same bowl 2 times in a row
let lastBowl;
let isGameStarted = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomBowl(bowls) {
  const index = Math.floor(Math.random() * bowls.length);
  const bowl = bowls[index];
  if (lastBowl === bowl) {
    return randomBowl(bowls);
  }

  lastBowl = bowl;

  return bowl;
}

function popUp() {
  const time = randomTime(400, 1000);
  const bowl = randomBowl(bowls);
  bowl.classList.add("up");
  setTimeout(() => {
    bowl.classList.remove("up");
    if (isGameStarted) {
      popUp();
    }
  }, time);
}

function startGame() {
  if (isGameStarted === false) {
    isGameStarted = true;
    scoreBoard.textContent = 0;
    score = 0;
    popUp();
    setTimeout(() => {
      isGameStarted = false;
    }, 10000);
  }
}

function hit(event) {
  if (!event.isTrusted) {
    return;
  }
  score++;
  this.classList.remove("up");
  scoreBoard.textContent = score;
}

avocados.forEach(avocado => avocado.addEventListener("click", hit));
