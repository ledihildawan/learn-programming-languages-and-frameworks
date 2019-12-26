const CourseDb = () => {
  return {
    dbInfo({ id, title }) {
      console.log(`Course id: ${id}...Course title: ${title}`);
    }
  };
};

module.exports = CourseDb();
