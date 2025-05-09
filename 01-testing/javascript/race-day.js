let raceNumber = Math.floor(Math.random() * 1000);

const registeredEarly = false;
const age = 19;

if (age > 18 && registeredEarly) {
  raceNumber += 1000;
}

if (age > 18 && registeredEarly) {
  console.log(`Race will begin at 9:30, your race number is: ${raceNumber}.`);
} else if (age > 18 && !registeredEarly) {
  console.log(`Race will begin at 11:00, your race number is: ${raceNumber}.`);
} else if (age < 18) {
  console.log(`Race will begin at 12:30, your race number is: ${raceNumber}.`);
} else {
  console.log("Please approach the registration desk, thanks!");
}
