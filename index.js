const mysql = require("mysql");
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "start",
                choices: [
                    "Add Employee",
                    "Remove Employee",
                    "View all Employees",
                    "Add Department",
                    "Remove Department",
                    "View all Departments",
                    "Add Roles",
                    "Remove Roles",
                    "View all Roles",
                    "Update Employee Role",
                    "Exit"
                ]
            }
        ])
        .then(function (res) {
            switch (res.start) {

                case "Add Employee":
                    addEmp();
                    break;

                case "View all Employees":
                    viewEmp();
                    break;

                case "Remove Employee":
                    removeEmp();
                    break;

                case "Add Department":
                    addDep();
                    break;

                case "Remove Department":
                    removeDep();
                    break;

                case "View all Departments":
                    viewDep();
                    break;

                case "Add Roles":
                    addRole();
                    break;

                case "Remove Roles":
                    removeRole();
                    break;

                case "View all Roles":
                    viewRole();
                    break;

                case "Update Employee Role":
                    updateEmpRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        })
}

function addEmp() {
    console.log("Inserting a new employee!");
    let roleChoice = [];
    connection.query(
        "SELECT role.id, role.title FROM role", (err, res) => {
            for (let i = 0; i < res.length; i++) {
                roleChoice.push({ name: res[i].title, value: res[i].id });
            }
        }
    )
    inquirer
        .prompt([
            {
                type: "input",
                message: "Provide the employee's first name",
                name: "first_name",
            },
            {
                type: "input",
                message: "Provide the employee's last name",
                name: "last_name"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role_id",
                choices: roleChoice
            },
            {
                type: "input",
                message: "What is employee's manager's id?",
                name: "manager_id"
            }
        ])
        .then(function (res) {
            const query = connection.query(
                "INSERT INTO employee SET ?",
                res,
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee added!\n");

                    start();
                }
            );
        })
}
function viewEmp() {

    connection.query("SELECT employee.first_name, employee.last_name, role.title AS \"role\", employee.manager_id AS \"manager\" FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee managers ON employee.manager_id = managers.id GROUP BY employee.id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        });
}

function removeEmp() {
    let employeeList = [];
    connection.query(
        "SELECT employee.first_name, employee.last_name FROM employee", (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                employeeList.push(res[i].first_name + " " + res[i].last_name);
            }
            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Which employee would you like to remove?",
                        name: "employee",
                        choices: employeeList

                    },
                ])
                .then(function (res) {
                    const query = connection.query(
                        `DELETE FROM employee WHERE concat(first_name, ' ' ,last_name) = '${res.employee}'`,
                        function (err, res) {
                            if (err) throw err;
                            console.log("Employee deleted!");
                            start();
                        });
                });
        }
    );
};

function addDep() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "depName",
                message: "What Department would you like to add?"
            }
        ])
        .then(function (res) {
            console.log(res);
            const query = connection.query(
                "INSERT INTO department SET ?",
                {
                    name: res.depName
                },
                function (err, res) {
                    if (err) throw err;
                    connection.query("SELECT * FROM department", function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        start();
                    })
                }
            )
        })
}

function removeDep() {
    let departmentList = [];
    connection.query(
        "SELECT department.name FROM department", (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                departmentList.push(res[i].name);
            }
            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Which department would you like to remove?",
                        name: "department",
                        choices: departmentList

                    },
                ])
                .then(function (res) {
                    const query = connection.query(
                        `DELETE FROM department WHERE (name) = '${res.department}'`,
                        function (err, res) {
                            if (err) throw err;
                            console.log("Department removed!");
                            start();
                        });
                });
        }
    );
};

function viewDep() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function addRole() {
    let departments = [];
    connection.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                res[i].first_name + " " + res[i].last_name
                departments.push({ name: res[i].name, value: res[i].id });
            }
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "title",
                        message: "What role would you like to add? (Be sure the proper department exists)"
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "What is the salary for the role?"
                    },
                    {
                        type: "list",
                        name: "department",
                        message: "what department?",
                        choices: departments
                    }
                ])
                .then(function (res) {
                    console.log(res);
                    const query = connection.query(
                        "INSERT INTO role SET ?",
                        {
                            title: res.title,
                            salary: res.salary,
                            department_id: res.department
                        },
                        function (err, res) {
                            if (err) throw err;
                            //const id = res.insertId;
                            start();
                        }
                    )
                })
        })
}

function removeRole() {
    let roleList = [];
    connection.query(
        "SELECT role.title FROM role", (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                roleList.push(res[i].title);
            }
            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Which role would you like to remove?",
                        name: "role",
                        choices: roleList

                    },
                ])
                .then(function (res) {
                    const query = connection.query(
                        `DELETE FROM role WHERE (title) = '${res.role}'`,
                        function (err, res) {
                            if (err) throw err;
                            console.log("Employee deleted!");
                            start();
                        });
                });
        }
    );
};

function viewRole() {
    connection.query("SELECT role.*, department.name FROM role LEFT JOIN department ON department.id = role.department_id", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    }
    )
}

function updateEmpRole() {
    connection.query("SELECT first_name, last_name, id FROM employee",
        function (err, res) {
            let employees = res.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: employee.id }));

            connection.query
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employeeName",
                        message: "Which employee's role would you like to update?",
                        choices: employees
                    },
                    {
                        type: "input",
                        name: "role",
                        message: "What is employee's new role?",
                    }
                ])
                .then(function (res) {
                    connection.query(`UPDATE employee SET role_id = ${res.role} WHERE id = ${res.employeeName}`,
                        function (err, res) {
                            console.log(res);
                            start()
                        }
                    );
                })
        }
    )
}