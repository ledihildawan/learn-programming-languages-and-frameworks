var students = [
  { name: 'John', age: 21 },
  { name: 'Lorde', age: 21 },
  { name: 'Tayler', age: 21 },
  { name: 'Alex', age: 21 },
  { name: 'Siri', age: 21 }
]

var search = 'alex';

for (var i = 0; i < students.length; i += 1) {
  var student = students[i];

  if (student.name.toLocaleLowerCase() === search) {
    console.log (student);
  }
}