class School {
  // Step 1: Create constructor with common properties
  constructor(name, level, numberOfStudents) {
    this._name = name;
    this._level = level;  // Primary, middle, or high
    this._numberOfStudents = numberOfStudents;
  }

  // Step 2: Getters for the properties
  get name() {
    return this._name;
  }

  get level() {
    return this._level;
  }

  get numberOfStudents() {
    return this._numberOfStudents;
  }

  // Step 3: Setter for numberOfStudents with validation
  set numberOfStudents(newNumberOfStudents) {
    if (typeof newNumberOfStudents === 'number' && newNumberOfStudents > 0) {
      this._numberOfStudents = newNumberOfStudents;
    } else {
      console.log('Invalid input: numberOfStudents must be a positive number.');
    }
  }

  // Step 4: Method to display school details
  quickFacts() {
    console.log(
      `${this.name} educates ${this.numberOfStudents} students at the ${this.level} school level.`
    );
  }

  // Step 5: Static method to pick a substitute teacher
  static pickSubstituteTeacher(substituteTeachers) {
    const randomIndex = Math.floor(Math.random() * substituteTeachers.length);
    return substituteTeachers[randomIndex];
  }
}

// Step 6: Create Primary class that extends School
class Primary extends School {
  constructor(name, numberOfStudents, pickupPolicy) {
    super(name, 'primary', numberOfStudents); // Call parent constructor
    this._pickupPolicy = pickupPolicy;  // Additional property for primary school
  }

  // Getter for pickup policy
  get pickupPolicy() {
    return this._pickupPolicy;
  }
}

// Step 7: Create Middle class that extends School
class Middle extends School {
  constructor(name, numberOfStudents) {
    super(name, 'middle', numberOfStudents); // No additional properties
  }
}

// Step 8: Create High class that extends School
class High extends School {
  constructor(name, numberOfStudents, sportsTeams) {
    super(name, 'high', numberOfStudents);  // Call parent constructor
    this._sportsTeams = sportsTeams;  // Additional property for high school
  }

  // Getter for sports teams
  get sportsTeams() {
    return this._sportsTeams;
  }
}

// Step 9: Create instances of the classes
const lorraineHansbury = new Primary('Lorraine Hansbury', 514, 'Students must be picked up by a parent or guardian.');
lorraineHansbury.quickFacts();  // Outputs quick facts

// Use the static method to pick a substitute teacher
console.log(School.pickSubstituteTeacher(['Mr. Smith', 'Mrs. Jones', 'Ms. Brown'])); // Random teacher

// Step 10: Create a High school instance with sports teams
const alSmith = new High('Al E. Smith', 415, ['Baseball', 'Basketball', 'Volleyball']);
console.log(alSmith.sportsTeams);  // Output sports teams
