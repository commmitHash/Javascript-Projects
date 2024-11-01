const inputElement = document.querySelector('.wrapper input');
const outerContainer = document.querySelector('.outer-container');
const textContainer = document.querySelector('.text-container p');
const mistakesContainer = document.querySelector('.mistakes-number');
const timeContainer = document.querySelector('.info-container p b');
const correctContainer = document.querySelector('.correct');
const wpmContainer = document.querySelector('.wpm-container');
const tryAgainButton = document.querySelector('button');

let charIndex = 0;
let mistakes = 0;
let count = 60;  
const maxCount = 60;
let correctCount = 0;
let wpm = 0;
let isTimerRunning = false;
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    if (count > 0) {
      count--;
      timeContainer.textContent = `${count}s`;
      calculateWPM();
    } else {
      endTypingTest();
    }
  }, 1000);
}

function calculateWPM() {
  if (count < maxCount) {  
    wpm = Math.round((correctCount / 5) / ((maxCount - count) / 60)) || 0;
  } else {
    wpm = 0;  
  }
  wpmContainer.textContent = wpm;
}

function generateRandomParagraph() {
  textContainer.innerHTML = '';
  const randomNumber = Math.floor(Math.random() * paragraphs.length);
  paragraphs[randomNumber].split('').forEach(letter => {
    textContainer.innerHTML += `<span>${letter}</span>`;
  });
  textContainer.querySelector('span').classList.add('active');
}

function initTyping() {
  if (!isTimerRunning) {
    startTimer();
    isTimerRunning = true;
  }

  const typingLetter = inputElement.value[charIndex];
  const span = textContainer.querySelectorAll('span');

  if (typingLetter === undefined && charIndex > 0) {  
    span[charIndex].classList.remove('active', 'correct', 'incorrect');
    charIndex--;
    if (span[charIndex].classList.contains('incorrect')) {
      mistakes--;
      span[charIndex].classList.remove('incorrect');
    }
    if (span[charIndex].classList.contains('correct')) {
      correctCount--;
      span[charIndex].classList.remove('correct');
    }
    span[charIndex].classList.add('active');
  } else if (typingLetter) { 
    if (typingLetter === span[charIndex].textContent) {
      span[charIndex].classList.add('correct');
      correctCount++;
    } else {
      span[charIndex].classList.add('incorrect');
      mistakes++;
    }
    span[charIndex].classList.remove('active');
    if (charIndex < span.length - 1) {
      charIndex++;
      span[charIndex].classList.add('active');
    }
  }

  mistakesContainer.textContent = mistakes;
  correctContainer.textContent = correctCount;
  calculateWPM();
}

function endTypingTest() {
  clearInterval(timerInterval);
  document.removeEventListener('keydown', focusInput);
  outerContainer.removeEventListener('click', focusInput);
  inputElement.removeEventListener('input', initTyping);

  alert(`Time's up! Your WPM is ${wpm}.`);
  resetTest();
}

function resetTest() {
  clearInterval(timerInterval);
  inputElement.value = '';
  generateRandomParagraph();
  count = maxCount;
  correctCount = mistakes = charIndex = wpm = 0;
  isTimerRunning = false;

  mistakesContainer.textContent = mistakes;
  correctContainer.textContent = correctCount;
  timeContainer.textContent = `${count}s`;
  wpmContainer.textContent = wpm;

  inputElement.addEventListener('input', initTyping);
  document.addEventListener('keydown', focusInput);
  outerContainer.addEventListener('click', focusInput);
}

function focusInput() {
  inputElement.focus();
}

inputElement.addEventListener('input', initTyping);
document.addEventListener('keydown', focusInput);
outerContainer.addEventListener('click', focusInput);
tryAgainButton.addEventListener('click', resetTest);

generateRandomParagraph();
focusInput();
