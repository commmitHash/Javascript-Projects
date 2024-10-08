const stopButton = document.getElementById("stop");
const pauseButton = document.getElementById("pause");
const resumeButton = document.getElementById("resume");
const resetButton = document.getElementById("reset");
const headingElement = document.querySelector("div h1");

let [seconds, minutes, hours] = [0, 0, 0];
let timer = null;
let isPlaying = false;

function changeIcon() {
  if (!isPlaying) {
    resumeButton.style.display = "inline-block";
    pauseButton.style.display = "none";
  } else {
    resumeButton.style.display = "none";
    pauseButton.style.display = "inline-block";
  }
}

function changeState() {
  if (timer !== null) {
    clearInterval(timer);
  }
  countTime();
  timer = setInterval(countTime, 1000);
  isPlaying = isPlaying ? false : true;
  changeIcon();
}

function countTime() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  if (hours === 24) {
    hours = 0;
  }
  headingElement.innerHTML = `${h}:${m}:${s}`;
}

resumeButton.addEventListener("click", changeState);
pauseButton.addEventListener("click", () => {
  clearInterval(timer);
  isPlaying = false;
  changeIcon();
});

resetButton.addEventListener("click", () => {
  seconds = 0;
  minutes = 0;
  hours = 0;
  headingElement.innerHTML = "00:00:00";
  clearInterval(timer);
  isPlaying = false;
  changeIcon();

});

stopButton.addEventListener("click", () => {
  clearInterval(timer);
  isPlaying = false;
  changeIcon();
});
