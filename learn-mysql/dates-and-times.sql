SELECT name, birthdate, DATEDIFF(NOW(), birthdate) FROM people;
SELECT birthdt, DATE_ADD(birthdt, INTERVAL 1 MONTH) FROM people;
SELECT birthdt, DATE_ADD(birthdt, INTERVAL 10 SECOND) FROM people;
SELECT birthdt, DATE_ADD(birthdt, INTERVAL 3 QUARTER) FROM people;

SELECT birthdt, birthdt + INTERVAL 1 MONTH FROM people;
SELECT birthdt, birthdt - INTERVAL 5 MONTH FROM people;
SELECT birthdt, birthdt + INTERVAL 15 MONTH + INTERVAL 10 HOUR FROM people;

CREATE TABLE comments(
  content VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comments2(
  content VARCHAR(100),
  change_at TIMESTAMP DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE comments2(
  content VARCHAR(100),
  change_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

-- DATE_FORMAT look documentation

-- EXERCISE 1
SELECT CURTIME();
SELECT CURDATE();
SELECT DAYOFWEEK(CURDATE());
SELECT DAYOFWEEK(NOW());
SELECT DATE_FORMAT(NOW(), '%w')
SELECT DAYNAME(CURDATE());
SELECT DAYNAME(NOW());
SELECT DATE_FORMAT(NOW(), '%W')

SELECT REPLACE(
  CURDATE(), '-', '/'
) AS 'current date';
SELECT DATE_FORMAT(CURDATE(), '%m/%d/%Y');

SELECT CONCAT(
  MONTHNAME(CURDATE()), ' ',
  DAYOFWEEK(CURDATE()), 'nd at ',
  SUBSTRING(CURTIME(), 1, 5)
) AS 'current time';
SELECT DATE_FORMAT(NOW(), '%M %D at %h:%i');

-- database

CREATE DATABASE exercise;
SHOW DATABASES;

USE exercise;

CREATE TABLE tweets(
  content VARCHAR(140),
  username VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (username)
);

