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
        stock INT NOT NULL,
        discount INTEGER DEFAULT 0,
        markup INTEGER DEFAULT 0
    );

INSERT INTO
    books (title, author, price, stock, discount)
VALUES
    (
        'The Great Gatsby',
        'F. Scott Fitzgerald',
        15.99,
        5,
        1,
        1.10
    ),
    (
        'To Kill a Mockingbird',
        'Harper Lee',
        15.99,
        8,
        3,
        1.15
    ),
    ('1984', 'George Orwell', 12.99, 3, 2),
    (
        'Pride and Prejudice',
        'Jane Austen',
        10.99,
        10,
        0,
        1.05
    ),
    (
        'The Catcher in the Rye',
        'J.D. Salinger',
        14.99,
        2,
        1,
        1.12
    ),
    ('The Hobbit', 'J.R.R. Tolkien', 20.99, 4, 0),
    ('Fahrenheit 451', 'Ray Bradbury', 18.99, 6, 2),
    ('Brave New World', 'Aldous Huxley', 16.99, 7, 1),
    (
        'The Picture of Dorian Gray',
        'Oscar Wilde',
        11.99,
        9,
        0,
        1.15
    ),
    (
        'The Alchemist',
        'Paulo Coelho',
        13.99,
        1,
        0,
        1.10
    );

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

-- Selecting DISTINCT Values
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

-- Filtering with WHERE
CREATE TABLE
    customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        phone VARCHAR NULL,
        email VARCHAR NOT NULL,
        registred_at DATE NOT NULL,
        is_active BOOLEAN NOT NULL,
        country VARCHAR NOT NULL
    );

INSERT INTO
    customers (
        name,
        registred_at,
        is_active,
        country,
        phone,
        email
    )
VALUES
    (
        'John Doe',
        '2024-01-01',
        TRUE,
        'USA',
        NUL,
        'johndoe@example.com'
    ),
    (
        'Jane Smith',
        '2024-01-02',
        FALSE,
        'Canada',
        NULL,
        'janesmith@example.com'
    ),
    (
        'Alice Johnson',
        '2024-01-03',
        TRUE,
        'USA',
        NULL,
        'slicejohnson@example.com'
    ),
    (
        'Bob Smith',
        '2024-01-04',
        TRUE,
        'Canada',
        NULL,
        'bobsmith@example.com'
    ),
    (
        'Charlie Davis',
        '2024-01-05',
        FALSE,
        'USA',
        '555-555-5555',
        'charliedavis@example.com'
    );

SELECT
    *
FROM
    customers
WHERE
    is_active = TRUE;

SELECT
    *
FROM
    customers
WHERE
    is_active = TRUE
    AND country = 'Canada';

CREATE TABLE
    orders (
        id SERIAL PRIMARY KEY,
        customer_id INT NOT NULL,
        order_date DATE NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL
    );

INSERT INTO
    orders (customer_id, order_date, totla_amount)
VALUES
    (1, '2024-01-01', 100.00),
    (2, '2024-01-01', 150.00),
    (3, '2024-01-01', 200.00),
    (4, '2024-01-01', 250.00),
    (5, '2024-01-01', 300.00);

SELECT
    *
FROM
    orders
WHERE
    total_amount > 200;

SELECT
    *
FROM
    orders
WHERE
    total_amount BETWEEN 100 AND 200;

SELECT
    * FORM orders
WHERE
    customer_id IN (1, 2, 3);

SELECT
    *
FROM
    customers
WHERE
    name LIKE '%Smith';

SELECT
    *
FROM
    customers
WHERE
    name LIKE 'S%';

SELECT
    *
FROM
    customers
WHERE
    name Like 'Sm_th';

SELECT
    *
FROM
    customers
WHERE
    name Like '%Sm_th';

SELECT
    *
FROM
    orders
WHERE
    customer_id NOT IN (1, 3);

SELECT
    *
FROM
    orders
WHERE
    name NOT LIKE '%S';

SELECT
    *
FROM
    orders
WHERE
    total_amount NOT BETWEEN 100 AND 200;

SELECT
    *
FROM
    customers
WHERE
    name NOT LIKE '%i%';

SELECT
    *
FROM
    customers
WHERE
    name LIKE 'A%n';

-- Sorting with ORDER BY
SELECT
    *
FROM
    orders
ORDER BY
    total_amount DESC;

SELECT
    *
FROM
    orders
ORDER BY
    total_amount ASC;

SELECT
    *
FROM
    books
ORDER BY
    price DESC,
    stock ASC;

SELECT
    *
FROM
    books
ORDER BY
    price DESC,
    stock DESC;

-- LIMITING Results with LIMIT
SELECT
    *
FROM
    orders
LIMIT
    2;

SELECT
    *
FROM
    orders
WHERE
    total > 200
LIMIT
    2;

SELECT
    *
FROM
    orders
WHERE
    total > 200
ORDER BY
    total DESC
LIMIT
    2;

SELECT
    *
FROM
    orders
WHERE
    total > 200
ORDER BY
    total DESC
LIMIT
    2
OFFSET
    1;

SELECT
    *
FROM
    order
ORDER BY
    total ASC
LIMIT
    1;

-- Handling NULL values
SELECT
    *
FROM
    customers
WHERE
    phone IS NULL;

SELECT
    *
FROM
    customers
WHERE
    phone IS NOT NULL;

SELECT
    name,
    COALESCE('phone', '- missing - ') AS phone,
    email
FROM
    customers;

-- Project Challenge
SELECT
    name AS "Full Name",
    email AS "Email"
FROM
    customers;

-- Select Expression
SELECT
    title,
    price + markup - discount AS final_price
FROM
    books;

-- Select Unique
SELECT DISTINCT
    customer_id
FROM
    order
WHERE
    status = 'pending';

-- Logical Operators
SELECT
    *
FROM
    books
WHERE
    genre IN ('Fiction', 'Mystery')
    AND price < 20
    AND (
        year > 2018
        OR stock > 10
    );

-- Sorting Challenge
SELECT
    *
FROM
    books
WHERE
    genre IN ('Fiction', 'Science')
    AND price BETWEEN 10 and 20
ORDER BY
    stock DESC,
    price ASC;