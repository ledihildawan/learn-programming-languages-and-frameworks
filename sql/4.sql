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

-- SELECT Fundamentals
CREATE TABLE
    books (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        author VARCHAR NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        discount INTEGER DEFAULT 0
    );

INSERT INTO
    books (title, author, price, discount)
VALUES
    (
        'The Great Gatsby',
        'F. Scott Fitzgerald',
        10.99,
        1
    ),
    ('1984', 'George Orwell', 12.99, 2),
    ('To Kill a Mockingbird', 'Harper Lee', 8.99, 3);

SELECT
    title,
    price
FROM
    books;

-- Alias and Constants
SELECT
    title,
    price AS cost
FROM
    books;

SELECT
    title,
    100 AS pric
FROM
    books;

-- Expressions on SELECT
SELECT
    title,
    author,
    price - 1 AS price
FROM
    books;

SELECT
    title,
    price,
    discount,
    price - discount AS final_price
FROM
    books;

SELECT
    title,
    author,
    price,
    price * 100 AS cent_price
FROM
    books;

-- Selecting Distinct Values
CREATE TABLE
    orders (
        id SERIAL PRIMARY KEY,
        customer_id INT NOT NULL,
        order_date DATE NOT NULL,
        status VARCHAR NOT NULL
    );

INSERT INTO
    orders (customer_id, order_date, status)
VALUES
    (101, '2024-01-01', 'completed'),
    (102, '2024-01-02', 'pending'),
    (103, '2024-01-03', 'completed'),
    (101, '2024-01-04', 'cancelled'),
    (103, '2024-01-05', 'completed');

SELECT DISTINCT
    status
FROM
    orders;

SELECT DISTINCT
    order_date
FROM
    orders;
