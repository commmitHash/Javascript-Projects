const lists = document.querySelectorAll(".item");
//console.log(lists);
const leftContainer = document.querySelector(".left-container");
const rightContainer = document.querySelector(".right-container");

//console.log(leftContainer);
//console.log(rightContainer);

lists.forEach((listItem) => {
  listItem.addEventListener("dragstart", (e) => {
    let selected = e.target;

    rightContainer.addEventListener("drop", () => {
      rightContainer.appendChild(selected);
      //console.log(leftContainer);
      console.log(selected);
      selected = null;
    });
    leftContainer.addEventListener("drop", () => {
      leftContainer.appendChild(selected);
      //console.log(rightContainer);
      selected = null;
    });
    leftContainer.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    rightContainer.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
  });
});
