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
        switch (res.employeeTrack){
            case "View ALL Employees":
            viewEm();
            break;

            case "View ALL Employees by Department":
            viewEmByD();
            break;

            case "View ALL Employees by Manager":
                viewEmByMa();
                break;
            
            case 
        }
    })
}
