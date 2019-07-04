CREATE TABLE customers(
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE orders(
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_date DATE,
  amount DECIMAL(8, 2),
  customer_id INT,
  FOREIGN KEY(customer_id) REFERENCES customers(id)
);

-- Data for customers and orders
INSERT INTO customers(first_name, last_name, email)
VALUES ('Boy', 'Goerge', 'goerge@gmail.com'),
       ('Goerge', 'Michael', 'gm@gmail.com'),
       ('David', 'Bowie', 'david@gmail.com'),
       ('Blue', 'Steele', 'blue@gmail.com'),
       ('Bette', 'Davis', 'better@aol.com');

INSERT INTO orders (order_date, amount, customer_id)
VALUES ('2016/02/10', 99.99, 1),
       ('2017/11/11', 35.50, 1),
       ('2014/12/12', 800.67, 2),
       ('2015/01/03', 800.67, 2),
       ('2015/04/11', 450.25, 5);

INSERT INTO orders (order_date, amount, customer_id) VALUES ('2016/06/06', 33.67, 98);

--- CROSS JOIN

SELECT id FROM customers WHERE last_name='Goerge';
SELECT * FROM orders WHERE customer_id = 1;

SELECT * FROM orders WHERE customer_id = (
  SELECT id FROM customers
  WHERE last_name = 'Goerge'
);

SELECT * FROM customers, orders;

-- If we only use join it will be inner join

----- IMPLICIT INNER JOIN
SELECT * FROM customers, orders WHERE customers.id = orders.customer_id;

SELECT first_name, last_name, order_date, amount
FROM
  customers, orders
WHERE customers.id = orders.customer_id;

---- EXPLICIT INNER JOIN
SELECT * FROM customers
JOIN orders
  ON customers.id = orders.customer_id;

SELECT * FROM orders
JOIN customers
  ON orders.customer_id = customers.id;

SELECT first_name, last_name, order_date, amount FROM customers
JOIN orders
  ON customers.id = orders.customer_id;
     --- this is the keys of join

SELECT first_name, last_name, order_date, amount FROM orders
JOIN customers
  ON orders.customer_id = customers.id;


--- GETTING fancier
SELECT first_name, last_name, order_date, amount FROM orders
JOIN customers
  ON orders.customer_id = customers.id
ORDER BY amount;

SELECT first_name, last_name, order_date, amount FROM orders
JOIN customers
  ON orders.customer_id = customers.id
ORDER BY order_date;

SELECT first_name, last_name, order_date, amount FROM orders
JOIN customers
  ON orders.customer_id = customers.id
GROUP BY orders.customer_id;

SELECT first_name, last_name, order_date, SUM(amount) AS total_spent FROM orders
JOIN customers
  ON orders.customer_id = customers.id
GROUP BY orders.customer_id;

SELECT
  first_name,
  last_name,
  order_date,
  SUM(amount) AS total_spent
    FROM orders
JOIN customers
  ON orders.customer_id = customers.id
GROUP BY orders.customer_id
ORDER BY total_spent DESC;

-- LEFT
SELECT first_name, last_name, order_date, amount FROM customers
LEFT JOIN orders
  ON customers.id = orders.customer_id;

SELECT first_name, last_name, order_date, amount FROM orders
LEFT JOIN customers
  ON orders.customer_id = customers.id;

SELECT
  first_name,
  last_name,
  SUM(amount)
    FROM customers
LEFT JOIN orders
  ON customers.id = orders.customer_id
GROUP BY customers.id;

SELECT
  first_name,
  last_name,
  IFNULL(SUM(amount), 0) AS total_spent
    FROM customers
LEFT JOIN orders
  ON customers.id = orders.customer_id
GROUP BY customers.id
ORDER BY total_spent;

-- RIGHT
SELECT
  IFNULL(first_name, 'Missing') AS first,
  IFNULL(last_name, 'Missing') AS last,
  order_date,
  amount,
  SUM(amount)
    FROM customers
RIGHT JOIN orders
  ON customers.id = orders.customer_id
GROUP BY customers.first_name, customers.last_name;

-- ON DELETE CASCADE
CREATE TABLE customers(
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE orders(
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_date DATE,
  amount DECIMAL(8, 2),
  customer_id INT,
  FOREIGN KEY(customer_id)
    REFERENCES customers(id)
    ON DELETE CASCADE 
);

INSERT INTO customers(first_name, last_name, email)
VALUES ('Boy', 'Goerge', 'goerge@gmail.com'),
       ('Goerge', 'Michael', 'gm@gmail.com'),
       ('David', 'Bowie', 'david@gmail.com'),
       ('Blue', 'Steele', 'blue@gmail.com'),
       ('Bette', 'Davis', 'better@aol.com');

INSERT INTO orders (order_date, amount, customer_id)
VALUES ('2016/02/10', 99.99, 1),
       ('2017/11/11', 35.50, 1),
       ('2014/12/12', 800.67, 2),
       ('2015/01/03', 800.67, 2),
       ('2015/04/11', 450.25, 5);

---- test cacat method
CREATE TABLE customers(
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE orders(
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_date DATE,
  amount DECIMAL(8, 2),
  customer_id INT
);

INSERT INTO customers(first_name, last_name, email)
VALUES ('Boy', 'Goerge', 'goerge@gmail.com'),
       ('Goerge', 'Michael', 'gm@gmail.com'),
       ('David', 'Bowie', 'david@gmail.com'),
       ('Blue', 'Steele', 'blue@gmail.com'),
       ('Bette', 'Davis', 'better@aol.com');

INSERT INTO orders (order_date, amount, customer_id)
VALUES ('2016/02/10', 99.99, 1),
       ('2017/11/11', 35.50, 1),
       ('2014/12/12', 800.67, 2),
       ('2015/01/03', 800.67, 2),
       ('2015/04/11', 450.25, 5);

INSERT INTO orders(order_date, amount, customer_id) VALUES ('2017/11/05', 23.45, 45),
(CURDATE(), 777.77, 109);

SELECT * FROM customers
LEFT JOIN orders
  ON customers.id = orders.customer_id;

SELECT * FROM orders
LEFT JOIN customers
  ON orders.customer_id = customers.id;

SELECT * FROM orders
RIGHT JOIN customers
  ON customers.id = orders.customer_id;

SELECT * FROM orders
RIGHT JOIN customers
  ON orders.customer_id = customers.id;