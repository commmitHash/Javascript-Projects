const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0; 

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.querySelector('.back-side img').src === secondCard.querySelector('.back-side img').src;

  if (isMatch) {
    disableCards();
    matchedPairs++;
    if (matchedPairs === 8) endGame(); 
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function endGame() {
  setTimeout(() => {
    alert("Congratulations!");
    resetGame();
  }, 500);
}

function resetGame() {
  matchedPairs = 0;
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });
  shuffle();
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
