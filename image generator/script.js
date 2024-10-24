import apikey from "./apiKey.js";
const formElement = document.querySelector("form");
const imageContainer = document.querySelector(".image-container");
const icon1 = document.querySelector(".icon");
const button = document.querySelector("button");
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = e.target[0].value;
  const noOfImages = parseInt(e.target[1].value, 10);

  const generatedHTML = Array.from({ length: noOfImages }, () => {
    return `
    <div class="icon loading">
    <img src="./images-2/loader.svg" class="pic loading">
    <a href="#">
      <div class="download-icon">
        <img src="./images-2/download.svg" alt="download-icon">
      </div>
    </a>
  </div>
      `;
  }).join(" ");

  icon1.classList.add("loading");
  button.classList.add("loading");
  button.innerHTML = "Generating";
  getData(input, noOfImages);
  imageContainer.innerHTML = generatedHTML;
});

async function getData(input, noOfImages) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${input}&client_id=${apikey}&per_page=${noOfImages}`
  );
  const data = await response.json();

  data.results.forEach((item, index) => {
    console.log(item.urls.raw);
    const image = document.querySelectorAll(".pic")[index];
    const link = document.querySelectorAll("a")[index];
    const icon = document.querySelectorAll(".icon")[index];
    image.src = item.urls.raw;

    image.addEventListener("load", () => {
      icon.classList.remove("loading");
      image.classList.remove("loading");
      link.setAttribute("href", item.urls.raw);
      link.setAttribute("download", `${new Date().getTime()}.jpg`);
      console.log(icon);
      button.classList.remove("loading");
      button.innerHTML = "Generate";
    });
  });
}
