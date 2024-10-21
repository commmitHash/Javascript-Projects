const inputElement = document.querySelector('.input-container textarea');
const chatContainer = document.querySelector('.chatarea');
console.log(chatContainer);
const sendButton = document.getElementById('send-btn');
const inputContainer = document.querySelector('.input-contaiener');
const icon = document.querySelector('.icons-container');

let userMessage;
let result;
let paragraph;
let initialHeight = inputElement.scrollHeight;
inputElement.style.height = `${initialHeight}px`;

async function generateResponse(){
  const apiUrl = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4';

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '1697178608msh21572bb03aa2b74p1f59f3jsn679b9849f826',
      'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          content: userMessage
        }
      ],
      system_prompt: '',
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      web_access: false
    })
  };
  try{
    const response = await fetch(apiUrl, options);
    if(!response.ok){
      throw new Error(`HTTP error! ${response.status}`);
    }
   const apiData = await response.json();
    result = apiData.result;
    paragraph.innerHTML = result;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  }
 catch(error){
  console.error(error);
 }
}


sendButton.addEventListener('click', () => {
  const input = inputElement.value.trim();
  userMessage = input;
  if(!input){
    return;
  }

  createElement(input,"incoming");
  chatContainer.scrollTo(0, chatContainer.scrollHeight);

  setTimeout(() => {
   let prevElement = createElement("thinking...","outgoing");
   chatContainer.scrollTo(0, chatContainer.scrollHeight);
   paragraph = prevElement.querySelector('p');
    generateResponse();
  },600);
  inputElement.value = '';
});

function createElement(inputValue, className){
  const liElement = document.createElement('li');
  liElement.classList.add('chat', className);

  let markUp = (className === 'incoming')? `<p></p>` : `     <span><i class="fa-solid fa-robot fa-fw"></i></span>
  <p></p>
  `;

liElement.innerHTML = markUp;
chatContainer.appendChild(liElement);
liElement.querySelector('p').textContent = inputValue;

return liElement;
}

inputElement.addEventListener('input', () => {
 if(inputElement.value === ''){
    inputElement.style.height = `${initialHeight}px`;
 }
  inputElement.style.height = `${initialHeight}px`;
  inputElement.style.height = `${inputElement.scrollHeight}px`;
})
inputElement.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    const input = inputElement.value.trim();
    userMessage = input;
    if(!input){
      return;
    }
  
    createElement(input,"incoming");
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  
    setTimeout(() => {
     let prevElement = createElement("thinking...","outgoing");
     chatContainer.scrollTo(0, chatContainer.scrollHeight);
     paragraph = prevElement.querySelector('p');
      generateResponse();
    },600);
    inputElement.value = '';
  }
});
icon.addEventListener('click', () => {
  document.body.classList.toggle('show');
})
/*
const apiUrl = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4';

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': '1697178608msh21572bb03aa2b74p1f59f3jsn679b9849f826',
    'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
  },
  body: JSON.stringify({
    messages: [
      {
        role: 'user',
        content: 'hello'
      }
    ],
    system_prompt: '',
    temperature: 0.9,
    top_k: 5,
    top_p: 0.9,
    max_tokens: 256,
    web_access: false
  })
};

fetch(apiUrl, options)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
*/