// Child tipe parent
// prent bukan tipe child

// variable
// for loop
// while
// if statement
// switch case
// class

class Logger {
  public msg = 'Hello';

  constructor() {
    console.log(this.msg);
  }

  public printMsg(): void {
    console.log(this.msg);
  }
}

class Person {
  constructor(public logger: Logger) {}
}

class Animal {
  constructor(public logger: Logger) {}
}
const logger = new Logger();
const james = new Person(logger);
james.logger.msg = 'Hi';

const cat = new Animal(logger);
