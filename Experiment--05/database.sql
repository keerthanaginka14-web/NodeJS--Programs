
CREATE DATABASE labdb;

USE labdb;

CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    marks INT
);

INSERT INTO students VALUES (1, 'Ravi', 85);
INSERT INTO students VALUES (2, 'Sita', 90);

SELECT * FROM students;
