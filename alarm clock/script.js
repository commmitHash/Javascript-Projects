const selectElements = document.querySelectorAll('.column select');
const currentTime = document.querySelector('.outer-container h1');
const buttonElement = document.querySelector('button');
const form = document.querySelectorAll('form');

const audioElement = new Audio();
audioElement.src = './files/ringtone.mp3';

let alarmTime;

for(let i = 12; i > 0; i--){
  i = i < 10? '0' + i : i;
  let html = `<option value="${i}">${i}</option>`;
  selectElements[0].firstElementChild.insertAdjacentHTML("afterend", html);
}
for(let i = 59; i >= 0; i--){
  i = i < 10? '0' + i : i;
 let html = `<option value="${i}">${i}</option>`;
  selectElements[1].firstElementChild.insertAdjacentHTML("afterend", html);
}
for(let i = 2; i > 0; i--){
  let ampm = (i === 2)? 'PM' : 'AM';
  let html = `<option value="${ampm}">${ampm}</option>`;
  selectElements[2].firstElementChild.insertAdjacentHTML("afterend", html);
}

setInterval(() => {
  const presentDate = new Date();
  let hour = presentDate.getHours();
  let minutes = presentDate.getMinutes();
  let seconds = presentDate.getSeconds();
  let ampm = 'AM';

  if(hour > 12){
    hour = hour - 12;
    ampm = 'PM';
  }
  hour = hour < 10? '0' + hour: hour;
  minutes = minutes < 10? '0' + minutes: minutes;
  seconds = seconds < 10? '0' + seconds: seconds;
  
 let cT = `${hour}:${minutes}:${seconds} ${ampm}`;
 currentTime.textContent = cT;

  if(alarmTime === cT){
    console.log('playing');
    audioElement.play();
  }


}, 1000);

buttonElement.addEventListener('click', () => {
  const element = document.querySelectorAll('.column');
  element.forEach((e) => {
    e.classList.toggle('row');
  });


  alarmTime = `${selectElements[0].value}:${selectElements[1].value}:00 ${selectElements[2].value}`;

  if(alarmTime.includes('Hour') || alarmTime.includes('Minute') || alarmTime.includes('AM/PM')){
    alert('please enter valid time');
    location.reload();
   }

  if(buttonElement.classList.contains('alarm-set')){
    audioElement.pause();
    buttonElement.textContent =  'Set Alarm' ;
    form.forEach((f) => {
      f.reset();
    });
    alarmTime = '';
  }
  else{
    buttonElement.textContent = 'Clear Alarm';
  }
 buttonElement.classList.toggle('alarm-set');
});
