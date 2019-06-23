// const paragraph = document.querySelectorAll("p");
// const errors = document.querySelectorAll(".error");

// get an element by ID
// const title = document.getElementById("page-title");

// get elements by their class name
// const errors = document.getElementsByClassName("error");

// get elements by their tag name
// const paragraph = document.getElementsByTagName("p");

const content = document.querySelector(".content");

const people = ["ledi", "joko", "tyan", "bayu"];

people.forEach(person => content.innerHTML += `<p>${person}</p>`);

const a = document.querySelector("a");

a.setAttribute("href", "https://github.com/ledihildawan/");
a.setAttribute("target", "_blank");
console.log(a.getAttribute("href"));