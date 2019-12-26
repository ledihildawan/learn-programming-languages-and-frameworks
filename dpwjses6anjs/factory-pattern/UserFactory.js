const Instructor = require("./Student");
const Student = require("./Student");

const UserFactory = (
  type,
  name,
  position,
  earnings = 0,
  level = "beginner"
) => {
  if (type === "instructor") {
    return new Instructor(name, position, earnings);
  }

  if (type === "student") {
    return new Student(name, level);
  }
};

module.exports = UserFactory;
