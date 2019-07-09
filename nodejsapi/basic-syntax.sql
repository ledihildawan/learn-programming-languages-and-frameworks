SELECT * FROM [table];
SELECT column1, column2 FROM [table];

INSERT INTO [table] (column1, column2) VALUES (value1, value2);

UPDATE [table] SET column1 = value1, column2 = value2 WHERE <condition>;

DELETE FROM [table] WHERE <condition>;

-- INNER JOIN, select only joined recores
-- LEFT JOIN, select all records from Table A, and Table B where condition is met
-- RIGHT JOIN, select all records from Table B, and Table A where condition is met
-- FULL JOIN, select all records from both tables