-- CRUD (Create Read Update Delete)

CREATE TABLE cats
(
  cat_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  breed VARCHAR(100),
  age INT,
  PRIMARY KEY (cat_id)
);

-- DESC cats;

-- Create
INSERT INTO cats(name, breed, age)
VALUES ('Ringo', 'Tabby', 4),
       ('Cindy', 'Maine Coon', 10),
       ('Dumbledore', 'Maine Coon', 11),
       ('Egg', 'Persian', 4),
       ('Misty', 'Tabby', 13),
       ('Goerge Michael', 'Ragdoll', 9),
       ('Jackson', 'Sphynx', 7);

-- Read
SELECT * FROM cats; /* Give me all columns */
SELECT name FROM cats;
SELECT age FROM cats;
SElECT cats_id FROM cats;
SELECT name, age FROM cats;
SELECT cat_id, name, age, breed FROM cats;
SELECT * FROM cats;
SELECT age, breed, name, cat_id FROM cats;

SELECT * FROM cats WHERE age=4;
SELECT * FROM cats WHERE name='Egg';

-- Exercise 1
SELECT cat_id FROM cats;
SELECT name, breed FROM cats;
SELECT name, age FROM cats WHERE bredd='Tabby';
SELECT cat_id, age FROM cats WHERE cat_id=age;
SELECT * FROM cats WHERE cat_id=age;

-- Aliases
SELECT cat_id AS id, name FROM cats;
SELECT name AS 'cat name', breed AS 'kitty breed' FROM cats;

-- Update
UPDATE cats SET breed='Shorthair' WHERE bredd='Tabby';
UPDATE cats SET age=14 WHERE name='Misty';

-- Exercise 2
SELECT * FROM cats WHERE name='Jackson';
UPDATE cats SET name='Jack' WHERE name='Jackson';

SELECT * FROM cats WHERE name='Ringo';
UPDATE cats SET breed='British Shorthair' WHERE name='Ringo';

SELECT * FROM cats WHERE breed='Manie Coon';
UPDATE cats SET age=12 WHERE breed='Manie Coon';

-- Delete
DELETE FROM cats WHERE name='Egg';
DELETE FROM cats; -- DON'T RUN IT, this command will delete all data from table

SELECT * FROM cats WHERE age=4;
DELETE FROM cats WHERE age=4;

SELECT * FROM cats WHERE cat_id=age;
DELETE FROM cats WHERE cat_id=age;

SElECT * FROM cats;
DELETE FROM cats;