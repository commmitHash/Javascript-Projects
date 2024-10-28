const wordsCont = document.querySelector('.words-container');
const keywordsCont = document.querySelector('.keywords-container');
const wordCont = document.querySelector('.guess-container');
const hintCont = document.querySelector('h4 b');
const incorrectCont = document.querySelector('h4 span');
const imageElement = document.querySelector('.hangman-container img');
const resultsContWin = document.querySelector('.results-container-win');
const resultsContLose = document.querySelector('.results-container-lose');
const endWord = document.querySelectorAll('.results p span');
const playButton = document.querySelectorAll('.play-again');


let correctWord = '';
let count = 0;
let incorrectGuesses = 0;

for(let i = 97; i <= 122; i++){
  const button = document.createElement('button');
  button.innerText = String.fromCharCode(i);
  keywordsCont.appendChild(button);

  button.addEventListener('click', () => {
    const wordList = document.querySelectorAll('.guess-container li');

    correctWord.split('').forEach((l,index) => {
      if(l === String.fromCharCode(i)){
        wordList[index].classList.add('guessed');
        wordList[index].innerText = l;
        count++;
      }
    });
    if(!correctWord.includes(`${String.fromCharCode(i)}`) && (incorrectGuesses < 6)){
      incorrectGuesses++;
    }

    incorrectCont.textContent = `${incorrectGuesses} / 6`;
    imageElement.src = `./images/hangman-${incorrectGuesses}.svg`;

    if(incorrectGuesses === 6){
      resultsContLose.style.display = 'flex';
      endWord[1].textContent = correctWord;
    }
    if(count === correctWord.length){
      resultsContWin.style.display = 'flex';
      endWord[0].textContent = correctWord;
    }

    button.disabled = true;
  })
}

function generateWord(){
  const {word, hint} = words[Math.floor(Math.random() * words.length)];
  correctWord = word;
  const markup = word.split('').map(() => {
    return `<li class="letters"></li>`;
  }).join('');

  wordCont.innerHTML = markup;
  hintCont.textContent = hint;
}

playButton.forEach((btn) => {
  btn.addEventListener('click', () => {
    location.reload();
  })
});

generateWord();
