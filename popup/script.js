const clickMeBtn = document.querySelector('.outer-container button');
const popUp = document.querySelector('.popup-container');
const cancelBtn = document.getElementById('cancel');
const deleteBtn = document.getElementById('delete');

clickMeBtn.addEventListener('click', () => {
  popUp.style.display = 'block';
})

cancelBtn.addEventListener('click', () => {
  popUp.style.display = 'none';
})

deleteBtn.addEventListener('click', () => {
  alert('Your Account Deleted Successfully');
  popUp.style.display = 'none';
  setTimeout(() => {
    clickMeBtn.textContent = 'Click Me';
  },2000);
  clickMeBtn.textContent = 'Account Deleted'
})