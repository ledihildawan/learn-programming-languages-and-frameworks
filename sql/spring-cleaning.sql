-- Spring Cleaning - The Annual Closet Inventory

CREATE DATABASE shirts_db;

USE shirts_db;

CREATE TABLE shirts (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  article VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULL,
  shirt_size VARCHAR(255) NOT NULL,
  last_worn INT,
)

DESC shirts;

INSERT INTO
  shirts('article', 'color', 'shirt_size', 'last_worn')
VALUES
  ('t-shirt', 'white', 'S', 10),
  ('t-shirt', 'green', 'S', 200),
  ('polo shirt', 'black', 'M', 10),
  ('tank top', 'blue', 'S', 50),
  ('t-shirt', 'pink', 'S', 0),
  ('polo shirt', 'red', 'M', 5),
  ('tank top', 'white', 'S', 200),
  ('tank top', 'blue', 'M', 15),

SELECT article, color FROM shirts;
SELECT article, color, shirt_size, last_worn FROM shirts WHERE shirt_size='M';

UPDATE shirts SET shirt_size='L' WHERE article='polo shirt';
UPDAte shirts SET color='off white', shirt_size='white' WHERE color='white';

DELETE FROM shirts WHERE last_worn=200;
