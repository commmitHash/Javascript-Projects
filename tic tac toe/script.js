const firstContainer = document.querySelector('.select-container');
const playerXButton = document.getElementById('x');
const playerOButton = document.getElementById('o');
const secondContainer = document.querySelector('.wrapper');
const turnShower = document.querySelector('.turn-shower');
const playBox = document.querySelectorAll('section span');
const thirdContainer = document.querySelector('.result-container');
const resultPara = document.querySelector('.result-container p');
const playerDisplay = document.querySelector('.result-container p span');
const replayButton = document.querySelector('.result-container button');



let playerMove,computerMove;
let playerXIcon = 'fas fa-times';
let playerOIcon = 'far fa-circle';
let leftOverMoves = [];
let count = 0;


playerXButton.addEventListener('click', () => {
  firstContainer.classList.add('hide');
  secondContainer.classList.add('show');
  playerMove = playerXIcon;
  computerMove = playerOIcon;
});

playerOButton.addEventListener('click', () => {
  firstContainer.classList.add('hide');
  secondContainer.classList.add('show');
  turnShower.classList.add('right');
  playerMove = playerOIcon;
  computerMove = playerXIcon;
});

playBox.forEach((box) => {
  box.setAttribute('onclick','playGame(this)');
});

function playGame(element){
  element.innerHTML = `<i class="${playerMove}"></i>`;
  element.style.pointerEvents = 'none';
  leftOverMoves = [];

  playBox.forEach((box,index) => {
    if(box.childElementCount === 0){
      leftOverMoves.push(index);
    }
  });
  
  if(playerMove === playerXIcon){
    turnShower.classList.add('right');
  }
  else{
    turnShower.classList.remove('right');
  }
    secondContainer.style.pointerEvents = 'none';
    decisionMaker();
    generateComputerMove();
}

function generateComputerMove(){
  const randomTime = Math.floor(Math.random() * 1000 + 200);
  const randomNo = Math.floor(Math.random() * leftOverMoves.length);
  const randomBoxNo = leftOverMoves[randomNo];
  setTimeout(() => {
    if(leftOverMoves.length){
      playBox[randomBoxNo].innerHTML = `<i class="${computerMove}"></i>`; 
      playBox[randomBoxNo].style.pointerEvents = 'none';
      if(computerMove === playerXIcon){
        turnShower.classList.add('right');
      }
      else{
        turnShower.classList.remove('right');
      }
    }
    decisionMaker();
    secondContainer.style.pointerEvents = 'auto';
  },randomTime);
}

function checkWinner(val1, val2, val3, sign) {
  if(sign === playerXIcon){
    sign = 'fas';
  }
  else{
    sign = 'far';
  }
  try {
    // console.log('Checking winner:', val1, val2, val3, sign);
    const span1 = document.querySelector(`.box${val1}`);
    const span2 = document.querySelector(`.box${val2}`);
    const span3 = document.querySelector(`.box${val3}`);
    
    // console.log('Spans:', span1, span2, span3);

    if (span1 && span2 && span3) {
      const classList1 = span1.firstChild ? span1.firstChild.classList : null;
      const classList2 = span2.firstChild ? span2.firstChild.classList : null;
      const classList3 = span3.firstChild ? span3.firstChild.classList : null;

      // console.log('ClassLists:', classList1, classList2, classList3);

      if (classList1 && classList2 && classList3) {
        // console.log(classList1.contains('fas'));
        // console.log(sign, classList1);
        if (classList1.contains(sign) && classList2.contains(sign) && classList3.contains(sign)) {
          return true;
        }
      }
    }
  } catch (e) {
    console.log('Error in checkWinner:', e);
  }
  return false;
}


function decisionMaker(){
  if(    
  checkWinner(1, 2, 3, playerMove) ||
  checkWinner(4, 5, 6, playerMove) ||
  checkWinner(7, 8, 9, playerMove) ||
  checkWinner(1, 4, 7, playerMove) ||
  checkWinner(2, 5, 8, playerMove) ||
  checkWinner(3, 6, 9, playerMove) ||
  checkWinner(1, 5, 9, playerMove) ||
  checkWinner(3, 5, 7, playerMove)){
    secondContainer.classList.remove('show');
    thirdContainer.classList.add('show');
    changeOutput(playerMove);
  }
  else if(
    checkWinner(1, 2, 3, computerMove) ||
    checkWinner(4, 5, 6, computerMove) ||
    checkWinner(7, 8, 9, computerMove) ||
    checkWinner(1, 4, 7, computerMove) ||
    checkWinner(2, 5, 8, computerMove) ||
    checkWinner(3, 6, 9, computerMove) ||
    checkWinner(1, 5, 9, computerMove) ||
    checkWinner(3, 5, 7, computerMove)
  ){
    secondContainer.classList.remove('show');
    thirdContainer.classList.add('show');
    changeOutput(computerMove);
  }
  else{
    count = 0;
    playBox.forEach((box) => {
      if(box.childElementCount !== 0){
        count++;
      }
    })
    if(count === 9){
      secondContainer.classList.remove('show');
      thirdContainer.classList.add('show');
      resultPara.innerHTML = 'The match has been drawn!';
    }
  }
}

function changeOutput(icon){
  playerDisplay.innerHTML = `<i class="${icon}"></i>`;
}

replayButton.addEventListener('click', () => {
  location.reload();
});

