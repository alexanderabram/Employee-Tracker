var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    employeeTrack(); //NEED TO RUN ACTUAL FUNCTION
});

function run() {
    inquirer
        .prompt({
            name: "start",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View ALL Employees",
                "View ALL Departments",
                "View ALL Roles",
                "View ALL Employees by Manager",
                "Add Employee",
                "Remove Employee",
                "Add Department",
                "Remove Department",
                "Add Role",
                "Remove Role",
                "Update Employee Role",
                "Update Employee Manager",
                "Exit"
            ]
        })
        .then(function (res) {
            switch (res.employeeTrack) {
                case "View ALL Employees":
                    viewEm();
                    break;

                case "View ALL Departments":
                    viewDep();
                    break;

                case "View ALL Roles":
                    viewRole();
                    break;

                case "View ALL Employees By Manager":
                    viewEmByMa();
                    break;

                case "Add Employee":
                    addEm();
                    break;

                case "Remove Employee":
                    remEm();
                    break;

                case "Add Department":
                    addDep();
                    break;

                case "Remove Department":
                    remDep();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Remove Role":
                    remRole();
                    break;

                case "Update Employee Role":
                    updateEmRole();
                    break;

                case "Update Employee Manager":
                    updateEmMa();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        })
}

function viewEm() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS \"role\", manager.first_name AS \"manager\" FROM employee LEFT JOIN role ON employee.role_id = roles.id LEFT JOIN employee manager ON employee.manager_id = manager.id GROUP BY employee.id",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            run();
        });
}


function viewDep() {
    connection.query("SELECT * FROM department", function (err, res) {
        console.table(res);
        run();
    })
}

// function viewEmByMa() {
//     connection.query ("SELECT * FROM manager")
// }

function addEm() {
    console.log("Inserting a new employee!");
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "Provide employee's first name",
            },
            {
                name: "last_name",
                type: "input",
                message: "Provide employee's last name"
            },
            {
                name: "role",
                type: "list",
                message: "What is the employee's role?",
                choices: [1, 2, 3]
            },
            {
                name: "manager",
                type: "input",
                name: "Who is the employee's manager?"
            }
        ])
        .then(function (res) {
            const query = connection.query(
                "INSERT INTO employees SET ?",
                res,
                function (err, res) {
                    if (err) throw err;
                    console.log("Employee added!");

                    run();
                }
            );
        })
}


function remEm() {
    let employeeArr = [];
    connection.query(
        "SELECT employee.first_name, employee.last_name FROM employee", (err, res) => {
            for (let i = 0; i < res.length; i++) {
                employeeList.push(res[i].first_name + " " + res[i].last_name);
            }
            inquirer
                .prompt([
                    {
                        name: "employee",
                        type: "list",
                        message: "Which employee would you like to remove?",
                        choices: employeeList

                    },
                ])
                .then(function (res) {
                    const query = connection.query(
                        `DELETE FROM employees WHERE concat(first_name, ' ' ,last_name) = '${res.employee}'`,
                        function (err, res) {
                            if (err) throw err;
                            console.log("Employee deleted!\n");
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
                name: "department_name",
                type: "input",
                message: "What Department would you like to add?"
            }
        ])
        .then(function (res) {
            console.log(res);
            const query = connection.query(
                "INSERT INTO department SET ?",
                {
                    name: res.department_name
                },
                function (err, res) {
                    connection.query("SELECT * FROM department", function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        start();
                    })
                }
            )
        })
}

function remDep()

function addRole() {
    function addRole() {
        let departments = [];
        connection.query("SELECT * FROM departments",
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
                            message: "What role would you like to add?"
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
                            "INSERT INTO roles SET ?",
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

    function remRole()

    function updateEmRole()

    function updateEmMa()