-- Data Query Language (DQL)
-- Data Manipulation Language (DML)
-- Data Definition Language (DDL)
-- Data Control Language (DCL)
-- Transaction Control Language (TCL)
CREATE TABLE
  users (id INT, name TEXT);

INSERT INTO
  users
VALUES
  (1, 'Alice');

SELECT
  *
FROM
  users;

CREATE TABLE
  books (
    id INT PRIMARY KEY,
    title VARCHAR,
    price DECIMAL(10, 2)
  );

INSERT INTO
  (title, price) VALUE ("The Great Gatsby", 10.99);

INSERT INTO
  (title, price) VALUE ("1984", 12.99);

INSERT INTO
  (title, price)
VALUES
  ("To Kill a Mockingbird", 14.99);