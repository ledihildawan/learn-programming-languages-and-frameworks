-- String functions expand our way of selecting data and working with text or with strings.

-- CONCAT combine data for cleaner output
-- CONCAT(column, 'text', anotherColumn, 'more text')

SELECT
  CONCAT(author_fname, ' ', author_lname)
  AS 'Full Name'
FROM books;

SELECT author_fname AS first, author_lname last,
CONCAT(author_fname, ' ', author_lname) AS full
FROM books;

SELECT CONCAT(title, ' - ', author_fname, ' - ', author_lname) FROM books;
SELECT CONCAT_WS(' - ', title, author_fname, author_lname) FROM books;

-- SUBSTRING / SUBSTR, working with parts of strings
SELECT SUBSTRING('Hello world', 1, 4); -- Hell
SELECT SUBSTRING('Hello world', 7); -- world
SELECT SUBSTRING('Hello world', -3); -- rld
SELECT SUBSTRING('Hello world', -7); -- o world
SELECT SUBSTRING("Where I'm Calling Form: Selected Stories", 1, 10); -- Where I'm 

SELECT SUBSTRING(title, 1, 10) AS 'short title' FROM books;
SELECT CONCAT(
  SUBSTRING(title, 1, 10), '...'
  ) AS 'short title'
FROM books;

-- REPLACE, replace parts of strings
SELECT REPLACE('Hello World', 'Hell', '%$#@'); -- %$#@o World
SELECT REPLACE('cheese bread coffee milk', ' ', ' and '); -- cheese and bread and coffee and milk

SELECT REPLACE(title, 'e', '3') FROM books;
SELECT
  SUBSTRING(REPLACE(title, 'e', 3), 1, 10
) AS 'wired string' FROM books;

-- REVERSE, super straightforward!
SELECT REVERSE('Hello World'); -- dlroW olleH
SELECT REVERSE('Meow meow'); -- woem woeM

SELECT REVERSE(author_fname) FROM books;

SELECT CONCAT('woof', REVERSE('woof')); -- wooffoow

SELECT CONCAT(author_fname, REVERSE(author_fname)) FROM books;

-- CHAR_LENGTH, counts characters in string
SELECT CHAR_LENGTH('Hello World'); -- 11
SELECT CHAR_LENGTH('Hello Worldfklasdjflaksdjflkajsflkajfklfjaldksfjadskl');

SELECT author_lname, CHAR_LENGTH(author_lname) AS 'Author Last Name Character Length' FROM books;

SELECT CONCAT(author_lname, ' is ', CHAR_LENGTH(author_lname), ' characters long') FROM books;

-- UPPER() AND LOWER(), change a string's case
SELECT LOWER('Hello World');

SELECT CONCAT('MY FAVORITE BOOK iS THE ', UPPER(title)) AS 'Title v. upper' FROM books;