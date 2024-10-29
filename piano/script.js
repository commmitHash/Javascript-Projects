const audioElement = new Audio();
const volumeElement = document.querySelector('.volume-range');
const checkboxElement = document.querySelector('.checkbox');

const pianoKeys = document.querySelectorAll('.key');

pianoKeys.forEach((pianoKey) => {
  pianoKey.addEventListener('click', (e) => {
    const key = e.currentTarget.dataset.key;
    audioElement.src = `./tunes/${key}.wav`;
    audioElement.play();
  });
});

volumeElement.addEventListener('click', () => {
  audioElement.volume = volumeElement.value;
});

document.addEventListener('keydown', (e) => {
  const key = e.key;
  let theKey = '';
  let sound = '';
  pianoKeys.forEach((pianoKey) => {
    theKey = pianoKey.dataset.key;
    if(key === theKey){
      pianoKey.classList.add('active');
      setTimeout(() => {
        pianoKey.classList.remove('active');
      },120);
      sound = key;
    }
  });
  if(key !== sound){
    alert('key not available');
    location.reload();
  }
  audioElement.src = `./tunes/${key}.wav`;
  audioElement.play();
});

checkboxElement.addEventListener('click', () => {
  checkboxElement.classList.toggle('afterbox');
    const spanElement = document.querySelectorAll('.keys-container span');
    spanElement.forEach((span) => {
      span.classList.toggle('span1');
    });
});

