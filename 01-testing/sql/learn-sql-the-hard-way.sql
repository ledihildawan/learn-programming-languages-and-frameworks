CREATE TABLE
    person (
        id INTEGER PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        age INTEGER
    );

CREATE TABLE
    pet (
        id INTEGER PRIMARY KEY,
        name TEXT,
        breed TEXT,
        age INTEGER,
        dead INTEGER
    );

CREATE TABLE
    person_pet (person_id INTEGER, pet_id INTEGER);

INSERT INTO
    person (id, first_name, last_name, age)
VALUES
    (0, 'Zed', 'Shaw', 37);

INSERT INTO
    pet (id, name, breed, age, dead)
VALUES
    (0, 'Fluffy', 'Unicorn', 1000, 0);

INSERT INTO
    pet (id, name, breed, age, dead)
VALUES
    (1, 'Gigantor', 'Robot', 1, 1);

INSERT INTO
    person_pet (person_id, pet_id)
VALUES
    (0, 0);

INSERT INTO
    person_pet (person_id, pet_id)
VALUES
    (0, 1);

-- Selecting Data
SELECT
    *
FROM
    person;

SELECT
    name,
    age
FROM
    pet;

SELECT
    name,
    age
FROM
    pet
WHERE
    dead = 0;

SELECT
    *
FROM
    person
WHERE
    first_name != 'Zed';

-- Deleting Data
SELECT
    name,
    age
FROM
    pet
WHERE
    dead = 1;

DELETE FROM pet
WHERE
    dead = 1;

SELECT
    *
FROM
    pet;

INSERT INTO
    pet
VALUES
    (1, 'Gigantor', 'Robot', 1, 0);

SELECT
    *
FROM
    pet;

-- Updating Data
UPDATE person
SET
    first_name = 'Hilarious Guy'
WHERE
    first_name = 'Zed';

UPDATE pet
SET
    name = 'Fancy Pants'
WHERE
    id = 0;

SELECT
    *
FROM
    person;

SELECT
    *
FROM
    pet;