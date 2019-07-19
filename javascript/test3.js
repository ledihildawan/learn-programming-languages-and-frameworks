// Max number
const maxNumber = (...numbers) => {
  return Math.max(...numbers);
};

const maxTwoNumbers = (numberOne, numberTwo) => {
  return numberOne > numberTwo ? numberOne : numberTwo
};

console.log(maxNumber(1, 23, 2323, 3413, 429012));
console.log(maxTwoNumbers(100, 10));

// Landscape
const isLandscape = (width, height) => width > height;
console.log(isLandscape(100, 200));

// FizzBuzz
const fizzBuzz = (input) => {
  if (typeof input !== "number") {
    return 'Not a number'
  }
  
  if (input % 5 === 0 && input % 3 === 0) {
    return 'FizzBuzz';
  } else if (input % 5 === 0) {
    return 'Buzz';
  } else if (input % 3 === 0) {
    return 'Fizz';
  } else {
    return input;
  }
};

console.log(fizzBuzz(1));
console.log(fizzBuzz(1.5));
console.log(fizzBuzz(3));
console.log(fizzBuzz(3.5));
console.log(fizzBuzz(5));
console.log(fizzBuzz(15));
console.log(fizzBuzz(true));
console.log(fizzBuzz(false));
console.log(fizzBuzz('3'));
console.log(fizzBuzz(null));
console.log(fizzBuzz(undefined));
console.log(fizzBuzz({}));
console.log(fizzBuzz([]));
console.log(fizzBuzz(() => console.log('hello')));

// Checkspeed
const checkspeed = (speed) => {
  const speedLimit = 70;

  if (speed < 0) {
    return 'Really?'
  }

  speed = Math.floor(speed);
  let points = 0;

  if (speed >= speedLimit) {
    for (let i = speedLimit; i <= speed; i++) {
      if (i % 5 === 0) {
        points++;
      }
    }

    if (points >= 12) {
      return 'License suspended';
    } else {
      return `Points: ${points}`;
    }
  }

  if (speed <= 70) {
    return 'Ok';
  }
}


console.log(checkspeed(180));
console.log(checkspeed(90));
console.log(checkspeed(75));
console.log(checkspeed(70));
console.log(checkspeed(20));
console.log(checkspeed(-10));

// Show even or odd numbers
const logEvenOrOddNumbers = (maxNumber) => {
  for (let i = 1; i <= maxNumber; i++) {
    if (i % 2 === 0) {
      console.log(`${i} is Even Numbers`);
    } else {
      console.log(`${i} is Odd Numbers`);
    }
  }
}

logEvenOrOddNumbers(100);

// Count truthy
const countTruthy = (arrTypes) => {
  let total = 0;

  for (arrType of arrTypes) {
    if (arrType) {
      total++;
    }
  }

  return total;
}

console.log(countTruthy([1, 2, 3, 0, null, undefined, "", '']));

// Show properties
const favMovie = {
    title: 'Inception',
    director: 'Christopher Nolan',
    releaseYear: 2010
};

const showProperties = (obj) => {
  for (value in obj) {
    console.log(`${value}: ${obj[value]}`);
  }
}

showProperties(favMovie);

// sumMultiplesBetweenXAndY
const sumMultiplesBetweenXAndY = (numX, numY, limit) => {
  let totalX = 0;
  let totalY = 0;

  for (let i = 1; i <= limit; i++) {
    if (i % numX === 0) {
      totalX += i;
    }

    if (i % numY === 0) {
      totalY += i;
    }
  }

  return totalX + totalY;
}

console.log(sumMultiplesBetweenXAndY(3, 5, 10));

// calculate grade
const calculateGrade = (grades) => {
  let totalGrade = 0;
  let avgScore = 0;
  let finalScore = 0;

  for (let grade of grades) {
    totalGrade += grade;
  }

  avgScore = totalGrade / grades.length;
  finalScore = Math.round(avgScore);
  
  if (finalScore >= 90 && finalScore <= 100) {
    return 'A';
  } else if (finalScore >= 80 && finalScore <= 89) {
    return 'B';
  } else if (finalScore >= 70 && finalScore <= 79) {
    return 'C';
  } else if (finalScore >= 60 && finalScore <= 69) {
    return 'D';
  } else {
    return 'E';
  }
}

const grades = [55, 20, 33, 100, 80, 100, 100, 100];
const grades2 = [100, 100, 100];
console.log(calculateGrade(grades));
console.log(calculateGrade(grades2));


// showStars
const showStars = (rows) => {
  for (let i = '*'; i.length <= rows; i += '*') {
    console.log(i);
  }
}

showStars(5);
showStars(10);
showStars(1);

// Prime numbers
const primeNumber = (number) => {
  for (let i = 2; i <= number; i++) {
    let isPrime = true;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      console.log(i);
    }
  }
};

primeNumber(10);