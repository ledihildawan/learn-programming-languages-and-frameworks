-- Spring Cleaning (The Annual Closet Inventory)

-- Create database
CREATE DATABASE shirts_db;
SHOW DATABASES;
USE shirts_db;

-- Create table
CREATE TABLE shirts
(
  shirt_id INT NOT NULL AUTO_INCREMENT,
  article VARCHAR(100),
  color VARCHAR(100),
  shirt_size VARCHAR(100),
  last_worn INT,
  PRIMARY KEY (shirt_id)
)

SHOW TABLES;
DESC shirts;

-- Insert value into table shirts
INSERT INTO shirts(article, color, shirt_size, last_worn)
VALUES ('t-shirt', 'white', 'S', 10),
       ('t-shirt', 'green', 'S', 200),
       ('polo shrit', 'black', 'M', 10),
       ('tank top', 'blue', 'S', 50),
       ('t-shirt', 'pink', 'S', 0),
       ('polo shirt', 'red', 'S', 200),
       ('tank top', 'blue', 'M', 15);

SELECT * FROM shirts;

INSERT INTO shirts(article, color, shirt_size, last_worn) VALUES('polo shirt', 'purple', 'M', 50);

SELECT article, color FROM shirts;
SELECT * FROM shirts WHERE shirt_size='M';
SELECT article, color, shirt_size, last_worn FROM shirts WHERE shirt_size='M';

-- Update value
SELECT * FROM shirts WHERE article='polo shirt';
UPDATE shirts SET shirt_size='L' WHERE article='polo shirt';
SELECT * FROM shirts;

SELECT * FROM shirts WHERE last_worn=15;
UPDATE shirts SET last_worn=0 WHERE last_worn=15;
SELECT * FROM shirts;

SELECT * FROM shirts WHERE color='white';
UPDATE shirts SET shirt_size='XS', color='off white' WHERE color='white';
SELECT * FROM shirts;

-- Delete
SELECT * FROM shirts WHERE last_worn=200;
DELETE FROM shirts WHERE last_worn=200;
SELECT * FROM shirts;

SELECT * FROM shirts WHERE article='tank top';
DELETE FROM shirts WHERE article='tank top';
SELECT * FROM shirts;

SELECT * FROM shirts;
DELETE FROM shirts;
SELECT * FROM shirts;

-- Remove table shirts
DROP TABLE shirts;