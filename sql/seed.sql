USE employees_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tommy", "Buns", 1, 10), ("Tony", "Stark", 2, 11), ("Selina", "Meyer", 3, 12);

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 200000, 1), ("Software Engineer", 115000, 2), ("Legal Counsel", 150000, 3);

INSERT INTO department (name)
VALUES ("Executive"), ("Engineering"), ("Legal");