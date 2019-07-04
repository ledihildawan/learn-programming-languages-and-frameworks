SELECT 10 != 10; -- 0
SELECT 15 > 14 && 9 - 5 <= 94; -- 1
SELECT 1 IN (5, 3) || 9 BETWEEN 8 AND 10; -- 1

SELECT title, author_fname, author_lname, released_year FROM books WHERE released_year < 1980 ORDER BY released_year;

SELECT title, author_fname, author_lname, released_year FROM books WHERE author_lname='Eggers' OR author_fname='Chabon' ORDER BY released_year;
SELECT title, author_fname, author_lname, released_year FROM books WHERE author_lname IN ('Eggers', 'Lahiri') ORDER BY released_year;

SELECT title, released_year FROM books WHERE author_lname='Lahiri' AND released_year > 2000;

SELECT title, pages FROM books WHERE pages >= 100 AND pages <= 200;
SELECT title, pages FROM books WHERE pages BETWEEN 100 AND 200;

SELECT title, pages, released_year, stock_quantity FROM books
WHERE SUBSTRING(author_lname,1,1) = 'C' OR SUBSTRING(author_lname,1,1) = 'S';
SELECT title, pages, released_year, stock_quantity FROM books
WHERE SUBSTRING(author_lname,1,1) IN ('C', 'S');
SELECT title, pages, released_year, stock_quantity FROM books
WHERE author_lname LIKE 'C%' OR author_lname LIKE 'S%';

SELECT title, author_lname,
  CASE
    WHEN title LIKE '%Stories%' THEN 'Short Stories'
    WHEN title='Just Kids' || title LIKE '%A Heartbreaking Work%' THEN 'Memoir'
    ELSE 'Novel'
  END AS TYPE
FROM books;

SELECT title, author_lname, CONCAT(COUNT(title), ' book(s)')
FROM books GROUP BY author_lname, author_fname;

SELECT author_lname,
  CASE
    WHEN COUNT(*) = 1 THEN CONCAT(COUNT(*), ' book')
    ELSE CONCAT(COUNT(*), ' books')
  END AS COUNT
FROM books
GROUP BY author_lname, author_fname;

SELECT author_lname,
  CASE
    WHEN COUNT(*) = 1 THEN '1 book'
    ELSE CONCAT(COUNT(*), ' books')
  END AS COUNT
FROM books
GROUP BY author_lname, author_fname;