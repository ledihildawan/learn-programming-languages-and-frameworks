// const paragraph = document.querySelectorAll("p");
// const errors = document.querySelectorAll(".error");

// get an element by ID
// const title = document.getElementById("page-title");

// get elements by their class name
// const errors = document.getElementsByClassName("error");

// get elements by their tag name
// const paragraph = document.getElementsByTagName("p");

// const content = document.querySelector(".content");

// const people = ["ledi", "joko", "tyan", "bayu"];

// people.forEach(person => content.innerHTML += `<p>${person}</p>`);

// const a = document.querySelector("a");

// a.setAttribute("href", "https://github.com/ledihildawan/");
// a.setAttribute("target", "_blank");
// console.log(a.getAttribute("href"));

// a.setAttribute("style", "color: red;");

// const title = document.querySelector("#page-title");

// title.style.padding = "10px";

// const paragraphs = document.querySelectorAll("p");

// paragraphs.forEach(paragraph => {
//   if (paragraph.innerText.includes("error")) {
//     paragraph.classList.add("error");
//   }

//   if (paragraph.innerText.includes("success")) {
//     paragraph.classList.add("success");
//   }
// });

// const articleSection = document.querySelector("article");

// Array.from(articleSection.children).forEach(articleSectionChild => {
//   articleSectionChild.classList.add("artcile-child");
// }); 

// const h2 = document.querySelector("h2");

// // console.log(h2.previousElementSibling.parentElement.firstChild.nextSibling);

// h2.addEventListener("click", function(){
//   this.style.background = "teal";
// });

// h2.remove();

// const copyMe = document.getElementsByClassName("copy-me")[0];

// copyMe.addEventListener("copy", function(){
//   alert("cannot be coppied");
// });

console.dir(document.forms);

function isValidUsername(value) {
  return /^[a-z]{6,}$/.test(value);
}

document.forms[0].addEventListener("submit", e => {
  e.preventDefault();

  const inputVal = document.forms[0].username.value;
  
  if (isValidUsername(inputVal)) {
    console.log(`Welcome ${inputVal}`);
  } else {
    console.log(`At least character is 6 and only use uppercase`);
  }
});