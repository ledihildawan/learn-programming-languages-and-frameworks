CREATE DATABASE students_and_papers;

USE students_and_papers;

CREATE TABLE students(
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100)
);

CREATE TABLE papers(
  title VARCHAR(100),
  grade INT,
  student_id INT,
  FOREIGN KEY (student_id) REFERENCES students(id)
  ON DELETE CASCADE
);

INSERT INTO students (first_name)
VALUES ('Celeb'),
       ('Samantha'),
       ('Raj'),
       ('Carlos'),
       ('Lisa');

INSERT INTO papers (student_id, title, grade)
VALUES (1, 'My First Book Report', 60),
       (1, 'My Second Book Reports', 75),
       (2, 'Russian Lit Through The Ages', 94),
       (2, 'De Montaigne and The Art of The Eassy', 98),
       (4, 'Borges and Megical Realism', 89);

SELECT
  students.first_name,
  papers.title,
  papers.grade
FROM papers
JOIN students
ON papers.student_id = students.id
ORDER BY grade DESC;

SELECT
  students.first_name,
  papers.title,
  papers.grade
FROM papers
RIGHT JOIN students
ON papers.student_id = students.id;

SELECT
  students.first_name,
  IFNULL(papers.title, 'MISSING') AS title,
  IFNULL(papers.grade, 0) AS grade
FROM papers
RIGHT JOIN students
  ON papers.student_id = students.id;

SELECT
  students.first_name,
  IFNULL(AVG(papers.grade), 0) AS average
FROM papers
RIGHT JOIN students
  ON papers.student_id = students.id
GROUP BY students.first_name
ORDER BY average DESC;

SELECT
  students.first_name,
  IFNULL(AVG(papers.grade), 0) AS average,
  CASE
    WHEN SUM(papers.grade) >= 75 THEN 'PASSING'
    ELSE 'FAILING'
  END AS passing_status
FROM papers
RIGHT JOIN students
ON papers.student_id = students.id
GROUP BY students.first_name
ORDER BY average DESC;