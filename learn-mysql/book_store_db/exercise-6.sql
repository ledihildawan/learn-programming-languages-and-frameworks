SELECT * FROM books;
SELECT COUNT(*) FROM books;

-- PRINT out how many book released each years
SELECT released_year, COUNT(released_year) FROM books GROUP BY released_year;

SELECT title, stock_quantity FROM books;
SELECT SUM(stock_quantity) FROM books;

SELECT author_fname, author_lname, AVG(released_year) FROM books GROUP BY author_lname, author_fname;

-- SELECT CONCAT(author_fname, ' ', author_lname) FROM books WHERE pages=634;
-- SELECT CONCAT(author_fname, ' ', author_lname) FROM books WHERE pages= (SELECT MAX(pages) FROM books);
SELECT
  pages,
  CONCAT(author_fname, ' ', author_lname) AS 'Author who wrote the longest book'
FROM books ORDER BY pages DESC LIMIT 1;

SELECT
  released_year AS year,
  COUNT(released_year) AS '# books',
  AVG(pages) AS 'avg pages'
FROM books
  GROUP BY released_year ORDER BY released_year;