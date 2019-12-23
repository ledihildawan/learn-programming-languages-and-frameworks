void main() {
  var name = myName();
  var person = new Person('Ledi');

  person.printName();

  print('My name is $name');
}

String myName() {
  return 'Ledi Hildawan';
}

class Person {
  // Field
  String firstName;

  // Constructor
  Person(this.firstName);

  // Methhod
  printName() {
    print(firstName);
  }
}
