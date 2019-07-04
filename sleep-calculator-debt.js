const getSleepHours = day => {
  switch (day) {
    case 'monday':
      return 8
    case 'tuesday':
      return 8
    case 'wednesday':
      return 8
    case 'thursday':
      return 8
    case 'friday':
      return 8
    case 'saturday':
      return 4
    case 'sunday':
      return 4
  }
}

const getActualSleepHours = () => {
  const nameOfDays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ]
  let totalHoursOfSleep = 0;
  
  
  for (let i = 0; i < nameOfDays.length; i++)
    totalHoursOfSleep += getSleepHours(nameOfDays[i])
  
  return totalHoursOfSleep;
}

// Ideal sleep times per week
const getIdealSleepHours = (hours) => hours * 7

const calculateSleepDebt = () => {
  const actualSleepHours = getActualSleepHours()
  // Set your ideal sleep per days
  const idealSleepHours = getIdealSleepHours(6)
  
  console.log(`Your total sleep per week ${actualSleepHours} hours\nYour total ideal sleep per week ${idealSleepHours} hours\n---`)
  
  if (actualSleepHours === idealSleepHours)
    console.log(`You got the perfect amount of sleep.`)
  else if (actualSleepHours > idealSleepHours)
    console.log(`You got more sleep than you need this week. ${actualSleepHours - idealSleepHours} hours.`)
  else
    console.log(`You should get some rest. You only sleep ${Math.abs(actualSleepHours - idealSleepHours)} hours this week.`)
}

calculateSleepDebt();