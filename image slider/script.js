window.addEventListener('DOMContentLoaded', () => {

const wrapper = document.querySelector('.wrapper');
const buttons = document.querySelectorAll('.fa-solid');
const scrollBar = document.querySelector('.scrollbar');
const container = document.querySelector('.outer-container');




buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const classes = button.classList;
    const width = wrapper.clientWidth;

    if(classes.contains('chevron-right')){
      wrapper.style.scrollBehavior = 'smooth';
      wrapper.scrollBy(width, 0);
      console.log(width);
    }
    else{
      wrapper.style.scrollBehavior = 'smooth';
      wrapper.scrollBy(-width, 0);
    }

  })
});

wrapper.addEventListener('scroll', () => {
  const scrollAmount = wrapper.scrollLeft;
  console.log(scrollAmount);
  if(scrollAmount > 0){
    buttons[0].style.visibility = 'visible';
  }
  else{
    buttons[0].style.visibility = 'hidden';
  }

  if(scrollAmount >= 2185){
    buttons[1].style.visibility = 'hidden';
  }
  else{
    buttons[1].style.visibility = 'visible';
  }

let leftScroll = (scrollAmount/2185);

scrollBar.style.left = `${leftScroll * (1200 - scrollBar.clientWidth)}px`;
});


scrollBar.addEventListener('mousedown', (e) => {
  const startX = e.clientX;
  const thumbPosition = scrollBar.offsetLeft;
  //console.log(startX,thumbPosition);

  const handleMouseMove = (e) => {
    const deltaX = e.clientX - startX;
    console.log(deltaX);
    const newThumbPosition = thumbPosition + deltaX;
    const maxThumbPosition = wrapper.getBoundingClientRect().width - scrollBar.offsetWidth;
    const boundedPosition = Math.max(0,Math.min(maxThumbPosition, newThumbPosition));

    const scrollAmount = (boundedPosition/maxThumbPosition) * 2185;

    wrapper.scrollLeft = scrollAmount;

    scrollBar.style.left = `${boundedPosition}px`;
  }

  document.addEventListener('mousemove', handleMouseMove);

  const handleMouseUp = () => {
    document.removeEventListener('mousemove',handleMouseMove);
    document.removeEventListener('mouseup',handleMouseUp);
  }

  document.addEventListener('mouseup', handleMouseUp);

})
});


