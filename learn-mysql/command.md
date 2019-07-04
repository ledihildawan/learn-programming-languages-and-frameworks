# Learn MySQL

DROP TABLE <name_table>, <name_table>

```HELP;```

```SHOW DATABASES;```

```SELECT @HOSTNAME;```

Create Database ```CREATE DATABASE <database name>;```

Delete Database ```DROP DATABASE <database name>;```

Use Database ```USE <database name>;```

Check current database in used ```SELECT DATABASE();```

## Data Types
* Numeric Types
  * INT (max value of 4294967295)
  * DECIMAL // DECIMAL(5,2) 555.99 DECIMAL(6)
  * FLOAT
  * DOUBLE v
* String Types
  * CHAR
  * VARCHAR (Between 1 and 255 characters)
* Date & Times
  * DATE // 'YYYY-MM-DD' Format CURDATE()
  * TIME // Values with a time but no date 'HH:MM:SS' Format CURTIME()
  * DATETIME // Values with a date and time 'YYYY-MM-DD HH:MM:SS' Format v NOW()
  * TIMESTAMP

**Exercise 1**
```
  username - VARCHAR(15)
  tweet_content - VARCHAR(140)
  number_of_favorites - INT
```

## Tables
Creating Table
```
  CREATE TABLE <table_name>
    (
      <column_name data_type>,
      <column_name data_type>,
    );

    CREATE TABLE cats
    (
      name VARCHAR(100),
      age INT
    );
```

Show table ```SHOW TABLES;```

Show column ```SHOW COLUMNS FROM cats;``` / ```DESC cats```

Delete table ```DROP TABLE <table_name>```

**Exercise 2**
```
  CREATE TABLE pastries
  (
    name VARCHAR(50), 
    quantity INT
  );

  SHOW TABLES;
  DESC pastries;
  DROP TABLE pastries;
```

Inserting Data

***\* The order metters***
```
  INSERT INTO <table_name>(<column_name>) VALUES(<value>);
  INSERT INTO cats(name, age) VALUES('Blue', 1);
```

Multiple Insert Data
```
  INSERT INTO cats(name, age)
  VALUES ('Blue', 1)
        ,('Sadie', 3)
        ,('Lazy Bear', 1);
```

Retrive / get data from tables ```SELECT * FROM <table_name>;```

**Exercies 3**
```
  CREATE TABLE people
  (
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    age INT
  );

  SHOW TABLES:
  DESC people;

  INSERT INTO people(first_name, last_name, age) VALUES('Tina', 'Belcher', 13);
  INSERT INTO people(first_name, last_name, age) VALUES('Bob', 'Belcher', 42);

  INSERT INTO people(first_name, last_name, age)
  VALUES ('Linda', 'Belcher', 45)
        ,('Phillip', 'Frond', 38)
        ,('Calvin', 'Fishoeder', 70);

  SELECT * FROM people;
  DROP TABLE people;
```

### Warnings ```SHOW WARNINGS;```
***warning will be remove if you run another commnad***

NULL, if you not define values to column table

NOT NULL, columns require value if you add to data cannot be empty

### Default Values
To set default value
```
  CREATE TABLE cats3
  (
    name VARCHAR(100) DEFAULT 'unamed',
    age INT DEFAULT 99
  );

  INSERT INTO cats3(age) VALUES(3);
  INSERT INTO cats3(name, age) VALUES('Cali', NULL);
  INSERT INTO cats3() VALUES();
  INSERT INTO cats3() VALUES();

  SELECT * FROM cats3;

  CREATE TABLE cats4
  (
    name VARCHAR(100) NOT NULL DEFAULT 'unamed',
    age INT NOT NULL DEFAULT 99
  );

  INSERT INTO cats4(name, age) VALUES('Cali', NULL);
```

### Primary Key
A Unique Identifier (ID)

```
  CREATE TABLE unique_cats(
    cat_id INT NOT NULL
    ,name VARCHAR(100)
    ,age INT
    ,PRIMARY KEY (cat_id)
  );

  INSERT INTO unique_cats(cat_id, name, age) VALUES(1, 'James', 3);

  CREATE TABLE unique_cats2(
    cat_id INT NOT NULL AUTO_INCREMENT
    ,name VARCHAR(100)
    ,age INT
    ,PRIMARY KEY (cat_id)
  );

  INSERT INTO unique_cats2(name, age) VALUES('Jenny', 3);
```

**Exercise 4**
```
  CREATE TABLE employees
  (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    age INT NOT NULL,
    current_status VARCHAR(100) NOT NULL DEFAULT 'employed'
  );

  SHOW TABLES;
  DESC employees;

  INSERT INTO employees(last_name, first_name, age) VALUES('Doe', 'John', 25);

  SELECT * FROM TABLE employees;
```

# CRUD
CREATE READ UPDATE DELETE

The ```WHERE``` clause let's get specifical

**Aliases** Easier to read results

*Try selecting before you update

# Operators
Not Equal `!=`
`SELECT title, released_year FROM books WHERE released_year != 2017;`