-- equal =

-- Not equal !=
SELECT title, released_year FROM books WHERE released_year != 2017;
SELECT title, author_lname FROM books WHERE author_lname = 'Harris';
SELECT title, author_lname FROM books WHERE author_lname != 'Harris';

-- Not like
SELECT title FROM books WHERE title LIKE 'W%';
SELECT title FROM books WHERE title NOT LIKE 'W%';

-- Greater than > - Greater than or equal to >=
SELECT title, released_year FROM books WHERE released_year > 2000 ORDER BY released_year;
SELECT title, stock_quantity FROM books WHERE stock_quantity >= 100;
SELECT 99 > 567; -- 0
SELECT 88 > 1; -- 1
-- notes

-- Less than < - Less than or equal to <=
SELECT title, released_year FROM books WHERE released_year < 2000 ORDER BY released_year;
SELECT title, released_year FROM books WHERE released_year <= 2000 ORDER BY released_year;
-- notes

-- Logical AND &&
SELECT title, author_lname, released_year FROM books WHERE author_lname='Eggers';
SELECT title, author_lname, released_year FROM books WHERE released_year > 2010;
SELECT title, author_lname, released_year FROM books WHERE author_lname='Eggers' AND released_year > 2010;
-- notes
-- 1 <  5 && 7 = 9 -- 0
-- -10 > -20 && 0 <= 0 -- 1
-- -40 <= 0 AND 10 > 40 -- 0
-- 54 <= 54 && 'a' = 'A' -- 1

SELECT * FROM books WHERE author_lname='Eggers' AND released_year > 2010 AND title LIKE '%novel%';

-- Logical OR ||
SELECT  title, author_lname, released_year FROM books WHERE author_lname = 'Eggers' || released_year > 2000 OR stock_quantity > 100;
-- notes
-- 1 <  5 || 7 = 9 -- 1
-- -10 > -20 || 0 <= 0 -- 1
-- -40 <= 0 OR 10 > 40 -- 1
-- 54 <= 54 || 'a' = 'A' -- 1

-- BETWEEN
SELECT title, released_year FROM books WHERE released_year >= 2004 AND released_year <= 2015;
SELECT title, released_year FROM books WHERE released_year BETWEEN 2004 AND 2015;
-- NOT BETWEEN
SELECT title, released_year FROM books WHERE released_year NOT BETWEEN 2004 AND 2015 ORDER BY released_year;

-- CAST, for comparing DATE
CAST('2019-05-02' AS DATETIME); 
SELECT name, birthdt FROM people WHERE birthdt BETWEEN CAST('1980-01-01' AS DATETIME) AND CAST('200-10-10' AS DATETIME);


-- IN
SELECT * FROM books WHERE author_lname='Carver' OR
author_lname='Lahiri' OR
author_lname='Smith';

-- persaanku seperti and
SELECT title, author_lname FROM books WHERE author_lname IN ('Carver', 'Lahiri', 'Smith');

SELECT title, released_year FROM books
WHERE released_year IN (2017, 1985);

-- NOT IN
SELECT title, released_year FROM books WHERE released_year != 2000
AND released_year != 2002
AND released_year != 2004
AND released_year != 2006
AND released_year != 2008
AND released_year != 2010
AND released_year != 2012
AND released_year != 2014
AND released_year != 2016;

SELECT title, released_year FROM books NOT IN (2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016);
SELECT title, released_year FROM books WHERE released_year >= 2000 AND released_year NOT IN (2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016);

SELECT title, released_year FROM books WHERE released_year >= 2000 AND released_year NOT IN (released_year % 2 = 0) ORDER BY released_year;
SELECT title, released_year FROM books WHERE released_year >= 2000 AND released_year NOT IN (released_year % 2 != 0) ORDER BY released_year;

SELECT title, released_year FROM books WHERE released_year >= 2000 AND released_year % 2 != 0 ORDER BY released_year;
SELECT title, released_year FROM books WHERE released_year >= 2000 AND released_year % 2 = 0 ORDER BY released_year;


-- CASE, logical
SELECT title, released_year,
  CASE
    WHEN released_year >= 2000 THEN 'Modern Lit'
    ELSE '20th Century Lit'
  END AS GENRE
FROM books;

SELECT title, stock_quantity,
  CASE
    WHEN stock_quantity BETWEEN 0 AND 50 THEN '*'
    WHEN stock_quantity BETWEEN 51 AND 100 THEN '**'
    WHEN stock_quantity BETWEEN 101 AND 150 THEN '***'
    ELSE '****'
  END AS STOCK
FROM books;

SELECT title, stock_quantity,
  CASE
    WHEN stock_quantity <= 50 THEN '*'
    WHEN stock_quantity <= 100 THEN '**'
    ELSE '***'
  END AS STOCK
FROM books;