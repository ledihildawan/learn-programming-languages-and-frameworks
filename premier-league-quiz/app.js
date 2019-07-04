const footballQuizForm = document.forms["football-quiz"];
const scoreHTML = document.querySelector(".score");

const correctAnswers = ['A', 'B', 'A', 'B', 'A', 'B', 'A', 'B', 'A', 'B'];

function displayScore(score) {
  scoreHTML.style.display = "block";
  
  let output = 0;
  const timer = setInterval(() => {
    scoreHTML.textContent = output + "%";
    if (output === score) {
      clearInterval(timer);
    } else {
      output++;
    }
  }, 10);
}

footballQuizForm.addEventListener("submit", e => {
  e.preventDefault();

  const userAnswers = [];
  let score = 0;

  Array.from(footballQuizForm).forEach(el => {
    if (el.tagName === "INPUT" && el.checked) {
      userAnswers.push(el.value);
    }
  });

  // userAnswers.forEach((userAnswer, idx) => {
  //   if (userAnswer === correctAnswers[idx]) {
  //     score += 10;
  //   }
  // });

  // for (let i = 0; i < userAnswers.length; i++) {
  //   let userAnswer = userAnswers[i];
  //   for (let j = 0; j < correctAnswers.length; j++) {
  //     console.log(userAnswer === correctAnswers[j])
  //   }
  // }

  const pointPerAnswer = 100 / correctAnswers.length;

  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === correctAnswers[i]) {
      score += pointPerAnswer;
    }
  }



  scrollTo(0, 0);
  displayScore(score);
});