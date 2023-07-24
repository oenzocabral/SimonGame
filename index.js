const buttonColors = ["green", "red", "yellow", "blue"];
let gameSequence = [];
let userSequence = [];

let level = 0;
let started = false;

function playSound(color) {
  const sound = new Audio(`sounds/${color}.mp3`);
  sound.play();
}

function animateButton(color) {
  $(`#${color}`).addClass("pressed");
  setTimeout(() => {
    $(`#${color}`).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userSequence = [];
  level++;
  $("#level-title").text(`Level ${level}`);

  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gameSequence.push(randomColor);

  animateButton(randomColor);
  playSound(randomColor);
}

$(".btn").click(function () {
  const userChosenColor = $(this).attr("id");
  userSequence.push(userChosenColor);
  animateButton(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userSequence.length - 1);
});

function checkAnswer(currentLevel) {
  if (userSequence[currentLevel] === gameSequence[currentLevel]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}

function startOver() {
  level = 0;
  gameSequence = [];
  started = false;
}

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

$('#level-title').click(function () {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
})

// by: Enzo S. Cabral
