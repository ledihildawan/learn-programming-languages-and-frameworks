const nextTag = document.querySelector("footer svg.next");
const prevTag = document.querySelector("footer svg.prev");
const bodyTag = document.body;
const circleTag = document.querySelector("section div.circle");
const outputTag = document.querySelector("h2");
const randomTag = document.querySelector('.random');

const pages = [
  { copy: "a Brooklyn-based graphic design", background: "#edc7a9", circle: "#3e78ed" },
  { copy: "Kanye Wes't biggest fan", background: "#a1fffe", circle: "#e34a47" },
  { copy: "looking for a job the start of October", background: "#d3c7f3" },
  { copy: "letting you <a href='#'>download her pdf</a>", background: "#b472e6" },
];

let pageNumber = 0;

function next() {
  pageNumber += 1;

  if (pageNumber > pages.length - 1) {
    pageNumber = 0;
  }

  updateSection();
}

function random() {
  pageNumber = Math.floor(Math.random() * pages.length);

  updateSection();
}

function previous() {
  pageNumber -= 1;

  if (pageNumber < 0) {
    pageNumber = pages.length - 1;
  }

  updateSection();
}

function updateSection() {
  const { copy, circle, background } = pages[pageNumber];

  outputTag.innerHTML = copy;

  bodyTag.style.backgroundColor = background;
  circleTag.style.backgroundColor = circle;
}

nextTag.addEventListener("click", () => {
  next();
});

prevTag.addEventListener("click", () => {
  previous();
});

randomTag.addEventListener("click", () => {
  random();
});

document.addEventListener("keyup", (event) => {
  if (event.key === "r") {
    random();
  }

  if (event.key === "ArrowLeft") {
    previous();
  }

  if (event.key === "ArrowRight") {
    next();
  }
});
