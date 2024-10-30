const playBox = document.querySelector('.game-container');
const scoreContainer = document.querySelector('.score-container');
const highScoreContainer = document.querySelector('.high-score-container');


let foodX = 5, foodY = 2;
let snakeX = 1, snakeY = 2;
let gameHtml = '';
let newHtml = '';
let intervalId;
let score = 0;
let highScore = localStorage.getItem('h') || 0;
highScoreContainer.textContent = `High Score: ${highScore}`;
const snakeBody = [];
let previousMove = '';

function gameSetUp(){
  //changes the position of food 
    foodX = Math.floor(Math.random() * 30 ) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    updateHtml();
}

function updateHtml(){
  //updates the html
  gameHtml = `<div class="food" style="grid-area:${foodX}/${foodY};"></div>
  <div class="snake" style="grid-area:${snakeX}/${snakeY};"></div>
  ` + newHtml;
  playBox.innerHTML = gameHtml;
}

function checkIfFoodIsAte(){
  if(foodX === snakeX && foodY === snakeY){
    score++;
    scoreContainer.textContent = `Score: ${score}`;
    snakeBody.push([foodX,foodY]);
    gameSetUp();
  }
  for(let i = snakeBody.length - 1; i > 0;i--){
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX,snakeY];

    newHtml = '';
    snakeBody.forEach((food) => {
      newHtml += `<div class="snake" style="grid-area:${food[0]} / ${food[1]};"></div>`
    });
}
function checkGameOver(){
  if(snakeX < 0 || snakeX > 30 || snakeY < 0 || snakeY > 30){
    if(score > highScore){
      highScore = score;
      localStorage.setItem('h',highScore);
     // highScoreContainer.textContent = `High Score: ${highScore}`;
    }
    alert('Game Over.Please press ok to play the game again...');
    clearInterval(intervalId);
    location.reload();
  }

  snakeBody.forEach((body) => {
    if(snakeX === body[0] && snakeY === body[1]){
      if(score > highScore){
        highScore = score;
        localStorage.setItem('h',highScore);
       // highScoreContainer.textContent = `High Score: ${highScore}`;
      }
      alert('Game Over.Please press ok to play the game again...');
      clearInterval(intervalId);
      location.reload();
    }
  });

}



document.addEventListener('keydown', (e) => {
  if(intervalId){
    clearInterval(intervalId);
  }
  let key = e.key;

  intervalId = setInterval(() => {
        if(key === 'ArrowUp' && previousMove !== 'down'){
          snakeX -= 1;
          previousMove = 'up';
        }
        else if(key ==='ArrowDown' && previousMove != 'up'){
          snakeX += 1;
          previousMove = 'down';
        }
        else if(key === 'ArrowLeft' &&  previousMove != 'right'){
          snakeY -= 1;
          previousMove = 'left';
        }
        else if(key === 'ArrowRight' && previousMove != 'left'){
          snakeY += 1;
          previousMove = 'right';
        }
        else{
          if(previousMove === 'up'){
            snakeX -= 1;
          }
          if(previousMove === 'down'){
            snakeX += 1;
          }
          if(previousMove === 'left'){
            snakeY -= 1;
          }
          if(previousMove === 'right'){
            snakeY += 1;
          }
        }
        checkGameOver();
        checkIfFoodIsAte();
        updateHtml();
      },125);
});

gameSetUp();



