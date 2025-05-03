type Person = {
  name: string;
  age: number;
};

type Studying = {
  semester: number;
};

type Student = {
  id: string;
  age: number;
  semester: number;
};

function createPerson() {
  return { name: 'Stefan', age: 39, semester: 25, id: 'XPA' };
}

function printPerson(person: Person) {
  for (const key in person) {
    console.log(`${key}: ${person[key as keyof Person]}`);
  }
}

function studyForAnotherSemester(student: Studying) {
  student.semester++;
}

function isLongTimeStudent(student: Student) {
  return student.age - student.semester / 2 > 30 && student.semester > 20;
}

const me = createPerson();

printPerson(me);
studyForAnotherSemester(me);
isLongTimeStudent(me);
