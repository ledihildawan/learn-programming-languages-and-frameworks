const CHOICES = ["rock", "paper", "scissor"];

function playGame(userChoice) {
  const computerChoice = getComputerChoice();

  const result = determineWinner(userChoice, computerChoice);

  logResult(userChoice, computerChoice, result);
};

function logResult(userChoice, computerChoice, result) {
  console.log(`You chose: ${userChoice}`);
  console.log(`Computer chose: ${computerChoice}`);
  console.log(result);
}

function formatInput(input) {
  return input.toLowerCase();
}

function isValidChoice(choice) {
  return CHOICES.includes(choice) || choice === "bomb";
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return "It's a tie!";
  }

  if (userChoice === "bomb") {
    return "You win with a secret bomb!";
  }

  const winConditions = {
    rock: "scissor",
    paper: "rock",
    scissor: "paper"
  };

  return winConditions[userChoice] === computerChoice ? "You win!" : "Computer wins!";
};

function getComputerChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

const userInput = "scissor";
const userChoice = formatInput(userInput);

if (!isValidChoice(userChoice)) {
  console.log("Invalid input. Please choose rock, paper, or scissor.");

  return;
}

playGame(userInput);
