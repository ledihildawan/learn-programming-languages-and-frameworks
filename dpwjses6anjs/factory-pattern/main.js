const UserFactory = require("./UserFactory");

const john = UserFactory("student", "john");
const mark = UserFactory("instructor", "mark", "software developer");

console.log(john.toString());
console.log(mark.toString());
