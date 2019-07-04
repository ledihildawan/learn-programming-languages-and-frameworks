CREATE DATABASE many_many;

USE many_many;

CREATE TABLE reviewers(
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100),
  last_name VARCHAR(100)
);

CREATE TABLE series(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100),
  released_year YEAR(4),
  genre VARCHAR(100)
);

CREATE TABLE reviews(
  id INT PRIMARY KEY AUTO_INCREMENT,
  rating DECIMAL(2, 1),
  series_id INT,
  reviewer_id INT,
  FOREIGN KEY (series_id) REFERENCES series(id),
  FOREIGN KEY (reviewer_id) REFERENCES reviewers(id)
);

INSERT INTO series (title, released_year, genre) VALUES
    ('Archer', 2009, 'Animation'),
    ('Arrested Development', 2003, 'Comedy'),
    ("Bob's Burgers", 2011, 'Animation'),
    ('Bojack Horseman', 2014, 'Animation'),
    ("Breaking Bad", 2008, 'Drama'),
    ('Curb Your Enthusiasm', 2000, 'Comedy'),
    ("Fargo", 2014, 'Drama'),
    ('Freaks and Geeks', 1999, 'Comedy'),
    ('General Hospital', 1963, 'Drama'),
    ('Halt and Catch Fire', 2014, 'Drama'),
    ('Malcolm In The Middle', 2000, 'Comedy'),
    ('Pushing Daisies', 2007, 'Comedy'),
    ('Seinfeld', 1989, 'Comedy'),
    ('Stranger Things', 2016, 'Drama');

INSERT INTO reviewers (first_name, last_name) VALUES
    ('Thomas', 'Stoneman'),
    ('Wyatt', 'Skaggs'),
    ('Kimbra', 'Masters'),
    ('Domingo', 'Cortes'),
    ('Colt', 'Steele'),
    ('Pinkie', 'Petit'),
    ('Marlon', 'Crafford');

INSERT INTO reviews(series_id, reviewer_id, rating) VALUES
    (1,1,8.0),(1,2,7.5),(1,3,8.5),(1,4,7.7),(1,5,8.9),
    (2,1,8.1),(2,4,6.0),(2,3,8.0),(2,6,8.4),(2,5,9.9),
    (3,1,7.0),(3,6,7.5),(3,4,8.0),(3,3,7.1),(3,5,8.0),
    (4,1,7.5),(4,3,7.8),(4,4,8.3),(4,2,7.6),(4,5,8.5),
    (5,1,9.5),(5,3,9.0),(5,4,9.1),(5,2,9.3),(5,5,9.9),
    (6,2,6.5),(6,3,7.8),(6,4,8.8),(6,2,8.4),(6,5,9.1),
    (7,2,9.1),(7,5,9.7),
    (8,4,8.5),(8,2,7.8),(8,6,8.8),(8,5,9.3),
    (9,2,5.5),(9,3,6.8),(9,4,5.8),(9,6,4.3),(9,5,4.5),
    (10,5,9.9),
    (13,3,8.0),(13,4,7.2),
    (14,2,8.5),(14,3,8.9),(14,4,8.9);


-- Exercise 1
SELECT
  series.title,
  reviews.rating
FROM series
JOIN reviews
  ON series.id = reviews.series_id;

SELECT
  series.title,
  AVG(reviews.rating) AS avg_rating
FROM series
JOIN reviews
  ON series.id = reviews.series_id
GROUP BY series.id
ORDER BY avg_rating;

SELECT
  reviewers.first_name,
  reviewers.last_name,
  reviews.rating
FROM reviewers
JOIN reviews
  ON reviewers.id = reviews.reviewer_id;

SELECT
  series.title
FROM series
LEFT JOIN reviews
  ON series.id = reviews.series_id
WHERE reviews.rating IS NULL;

SELECT
  series.genre,
  ROUND(AVG(reviews.rating), 2) AS avg_rating
FROM series
JOIN reviews
  ON series.id = reviews.series_id
GROUP BY series.genre;

-- My version 6
SELECT
  reviewers.first_name,
  reviewers.last_name,
  COUNT(*) AS 'COUNT',
  IFNULL(MIN(reviews.rating), 0) AS 'MIN',
  IFNULL(MAX(reviews.rating), 0) AS 'MAX',
  IFNULL(AVG(reviews.rating),0 ) AS 'AVG',
  CASE
    WHEN reviews.rating IS NULL THEN 'INACTIVE'
    ELSE 'ACTIVE'
  END AS 'STATUS'
FROM reviewers
LEFT JOIN reviews
  ON reviewers.id = reviews.reviewer_id
GROUP BY reviewers.id;
-- Solution version
SELECT
  reviewers.first_name,
  reviewers.last_name,
  COUNT(*) AS 'COUNT',
  IFNULL(MIN(reviews.rating), 0) AS 'MIN',
  IFNULL(MAX(reviews.rating), 0) AS 'MAX',
  IFNULL(AVG(reviews.rating),0 ) AS 'AVG',
  CASE
    WHEN COUNT(reviews.rating) >= 1 'ACTIVE'
    ELSE 'INACTIVE'
  END AS 'STATUS'
FROM reviewers
LEFT JOIN reviews
  ON reviewers.id = reviews.reviewer_id
GROUP BY reviewers.id;
-- Solution version 2
SELECT
  reviewers.first_name,
  reviewers.last_name,
  COUNT(*) AS 'COUNT',
  IFNULL(MIN(reviews.rating), 0) AS 'MIN',
  IFNULL(MAX(reviews.rating), 0) AS 'MAX',
  ROUND(IFNULL(AVG(reviews.rating), 0), 2) AS 'AVG',
  CASE
    WHEN COUNT(reviews.rating) >= 10 THEN 'POWER USER' 
    WHEN COUNT(reviews.rating) > 0 THEN 'ACTIVE'
    ELSE 'INACTIVE'
  END AS 'STATUS'
FROM reviewers
LEFT JOIN reviews
  ON reviewers.id = reviews.reviewer_id
GROUP BY reviewers.id;

SELECT
  series.title,
  reviews.rating,
  CONCAT(
    reviewers.first_name, ' ', reviewers.last_name
  ) AS reviewer
FROM reviews
  JOIN series ON reviews.series_id = series.id
  JOIN reviewers ON reviews.reviewer_id = reviewers.id
GROUP BY reviews.id
ORDER BY series.title
  LIMIT 15;