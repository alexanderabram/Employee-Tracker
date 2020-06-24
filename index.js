var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_db"
});

connection.connect(function(err) {
    if (err) throw err;
    employeeTrack(); //NEED TO RUN ACTUAL FUNCTION
});

function employeeTrack () {
    inquirer
    .prompt({
        name: "start",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View ALL Employees",
            "View ALL Employees by Eepartment",
            "View ALL Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager"
        ]
    })
}
