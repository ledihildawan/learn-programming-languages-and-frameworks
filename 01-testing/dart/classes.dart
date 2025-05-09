class Person {
  String name;

  Person(this.name);

  Person.create(this.name);

  void sayHello() {
    print("Hello.");
  }
}

class LediHildawan extends Person {
  LediHildawan(String name) : super(name)

  @override
  void sayHello() {
    print("Halo.");
  }
}

void main(List<String> args) {
  var ledihildawan = new LediHildawan("Ledi Hildawan");

  print(ledihildawan);
}
