const getUserChoice = userInput => {
  userInput = userInput.toLowerCase()
  
  if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors' || userInput === 'bomb')
    return userInput
  
  return 'Error: invalid choice'
}

const getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3)
  
  switch (randomNumber) {
    case 0:
			return 'rock'
    case 1:
      return 'paper'
    case 2:
      return 'scissors'
  }
}

const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === 'bomb')
    return 'You won!'

  if (userChoice === computerChoice)
    return 'Tie'
  
  if (userChoice === 'rock') {
    if (computerChoice === 'paper')
      return 'The computer won!'
    else
      return 'You won!'
  }

  if (userChoice === 'paper') {
    if (computerChoice === 'rock')
      return 'You won!'
    else
      return 'The computer won!'
  }

  if (userChoice === 'scissors') {
    if (computerChoice === 'rock')
      return 'The computer won!'
    else
      return 'You won!'
  }
}

const playGame = () => {
  const userChoice = getUserChoice('bomb')
  const computerChoice = getComputerChoice()

  return determineWinner(userChoice, computerChoice)
}

console.log(playGame())