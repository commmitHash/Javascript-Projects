const resetButton = document.getElementById("reset-game");
const hintContainer = document.querySelector(".hint span");
const guessContainer = document.querySelector(".guess span");
const wrongLettersContainer = document.querySelector(".wrong-letters span");
const displayContainer = document.querySelector(".word-container");
const inputElement = document.querySelector(".get-input");

let incorrect = [];
let correct = [];
let gameWord = "";
let chances = 8;

let word, hint;
function initGame() {
  let html = "";
  const randomNumber = Math.floor(Math.random() * words.length);
  word = words[randomNumber].word;
  hint = words[randomNumber].hint;

  for (let i = 0; i < word.length; i++) {
    html += '<input class="input" type="text" disabled> ';
  }

  displayContainer.innerHTML = html;
  hintContainer.textContent = hint;
  guessContainer.textContent = chances;
  wrongLettersContainer.textContent = incorrect;
}
initGame();

inputElement.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();

  if (value.match(/^[a-z]+$/)) {
    if (word.includes(value)) {
      if (!correct.includes(value)) {
        correct.push(value);
      }

      for (let i = 0; i < word.length; i++) {
        if (word[i] === value) {
          const display = document.querySelectorAll(".input")[i];
          display.value = value;
        }
      }
    } else {
      if (!incorrect.includes(value)) {
        incorrect.push(value);
        chances--;
        guessContainer.textContent = chances;

        if (chances <= 0) {
          alert("The game is over!!");
          location.reload();
        }
      }
    }

    wrongLettersContainer.textContent = incorrect.join(", ");

    gameWord = "";
    document.querySelectorAll(".input").forEach((data) => {
      gameWord += data.value;
    });

    if (gameWord === word) {
      setTimeout(() => {
        alert("You found the word, congrats! Now onto the next word.");
        location.reload();
      }, 200);
    }
  }

  e.target.value = "";
});

document.addEventListener("keydown", () => {
  inputElement.focus();
});

resetButton.addEventListener("click", () => {
  incorrect = [];
  correct = [];
  chances = 8;
  wrongLettersContainer.textContent = incorrect;
  guessContainer.textContent = chances;
  initGame();
});
