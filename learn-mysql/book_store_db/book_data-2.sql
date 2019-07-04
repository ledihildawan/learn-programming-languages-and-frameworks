-- source book_data.sql

INSERT INTO books(title, author_fname, author_lname, released_year, stock_quantity, pages)
VALUES ('10% Happoer', 'Dan', 'Harris', 2014, 29, 256),
       ('fake_book', 'Freida', 'Harris', 2001, 287, 428),
       ('Lincoln In The Bardo', 'Goerge', 'Saunders', 2017, 1000, 367);

SELECT * FROM books;

-- DISTINCT, it will only give us the distinct our unique records (not show duplicate record)
SELECT author_lname FROM books;
SELECT DISTINCT author_lname FROM books;
SELECT released_year FROM books;
SELECT DISTINCT released_year FROM books;
SELECT author_fname, author_lname FROM books;
SELECT DISTINCT author_fname, author_lname FROM books;

SELECT DISTINCT
  CONCAT(author_fname, ' ', author_lname)
  AS 'author full name'
FROM books;

-- ORDER BY
-- ASCENDING By Default
SELECT author_lname FROM books;
SELECT author_lname FROM books ORDER BY author_lname;
SELECT title FROM books;
SELECT title FROM books ORDER BY title;

SELECT author_lname FROM books ORDER BY author_lname DESC;
SELECT title FROM books ORDER BY title DESC;

SELECT released_year FROM books ORDER BY released_year;
SELECT released_year FROM books ORDER BY released_year DESC;
-- SELECT released_year FROM books ORDER BY released_year ASC; not necessery

SELECT title, released_year, pages FROM books ORDER BY released_year;
SELECT title, pages FROM books ORDER BY released_year;

--      1         2            3
SELECT title, author_fname, author_lname FROM books ORDER BY 2; -- Order by author_fname

SELECT author_fname, author_lname FROM books ORDER BY author_lname;
SELECT author_fname, author_lname FROM books ORDER BY author_lname, author_fname;

-- LIMIT
SELECT title FROM books;
SELECT title FROM books LIMIT 3;
SELECT title FROM books LIMIT 1;
SELECT title FROM books LIMIT 10;

SELECT * FROM books LIMIT 1;

SELECT title, released_year FROM books;
SELECT title, released_year FROM books ORDER BY released_year DESC;
SELECT title, released_year FROM books ORDER BY released_year DESC LIMIT 5;
SELECT title, released_year FROM books ORDER BY released_year DESC LIMIT 1;
SELECT title, released_year FROM books ORDER BY released_year DESC LIMIT 14;
--                                                             start point, end point?
SELECT title, released_year FROM books ORDER BY released_year DESC 0,5;
SELECT title, released_year FROM books ORDER BY released_year DESC 1,3;
SELECT title, released_year FROM books ORDER BY released_year DESC 10,1;
-- SELECT * FROM tbl LIMIT 95,184447489213312;
SELECT title FROM books LIMIT 5, 50;

-- LIKE
SELECT title, stock_quantity FROM books;
-- wildcard
-- % all
-- _ digit
SELECT title, stock_quantity FROM books WHERE stock_quantity LIKE '%';
SELECT title, stock_quantity FROM books WHERE stock_quantity LIKE '____';
SELECT title, stock_quantity FROM books WHERE stock_quantity LIKE '%\%%';
SELECT title, stock_quantity FROM books WHERE stock_quantity LIKE '%\_%';
SELECT title, stock_quantity FROM books WHERE stock_quantity LIKE 'da%';

