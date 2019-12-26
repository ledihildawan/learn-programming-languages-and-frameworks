const CourseDb = require("./CourseDb");

class Course {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  DbRequest() {
    CourseDb.dbInfo(this);
  }
}

module.exports = Course;
