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
                "View ALL Employees by Department",
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

                case "View ALL Employees by Department":
                    viewEmByD();
                    break;

                case "View ALL Employees by Manager":
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


function viewEmByD(){
    connection.query ("SELECT * FROM department", function(err,res) {
        console.table(res);
        run();
    })
}

function viewEmByMa()

function addEm()

function remEm()

function addDep()

function remDep()

function addRole()

function remRole()

function updateEmRole()

function updateEmMa()