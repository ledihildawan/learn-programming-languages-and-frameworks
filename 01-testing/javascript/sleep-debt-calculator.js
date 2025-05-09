function getSleepHours(day) {
  return {
    'monday': 8,
    'tuesday': 7,
    'wednesday': 6,
    'thursday': 5,
    'friday': 9,
    'saturday': 10,
    'sunday': 7,
  }[day.toLowerCase()] || 0;
};

function getActualSleepHours() {
  return [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ].reduce((acc, day) => acc + getSleepHours(day), 0);
};

function getIdealSleepHours(idealHoursPerNight) {
  return idealHoursPerNight * 7;
};

function calculateSleepDebt() {
  const actualSleepHours = getActualSleepHours();
  const idealSleepHours = getIdealSleepHours(8);

  if (actualSleepHours === idealSleepHours) {
    console.log('You got the perfect amount of sleep!');
  } else if (actualSleepHours > idealSleepHours) {
    console.log(`You got more sleep than needed by ${actualSleepHours - idealSleepHours} hours.`);
  } else {
    console.log(`You should get some rest! You are short by ${idealSleepHours - actualSleepHours} hours.`);
  }
};

calculateSleepDebt();
