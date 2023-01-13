// Packages needed
const inquirer = require('inquirer');
// const fs = require("fs");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
// const generateHTML = require("./generateHTML");

var team = []

// Array of questions for user input
const managerPrompt = [
    {
        type: "input",
        message: "Please enter the team manager's name: ",
        name: "name",
        validate: answers => {
            if (!answers.trim()) {
                return "Please enter the team manager's name!";
            }
            else {
                return true;
            }
        }
    },
    {
        type: "input",
        message: "Please enter the team manager's ID: ",
        name: "id",
        validate: answers => {
            if (!answers.trim()) {
                return "Please enter the team manager's ID!";
            }
            else {
                return true;
            }
        }
    },
    {
        type: "input",
        message: "Please enter the team manager's email address: ",
        name: "email",
        validate: (answers) => {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers)
            if (valid) {
                return true;
            } else {
                console.log("\n Please enter a valid email!")
                return false;
            }
        }
    },
    {
        type: "input",
        message: "Please enter the team manager's office number: ",
        name: "officeNumber",
        validate: answers => {
            if (!answers.trim()) {
                return "Please enter the team manager's office number!";
            }
            else {
                return true;
            }
        }
    },
    {
        type: "confirm",
        message: "Would you like to add another employee?",
        name: "employee"
    }
]

// Initialize app
const init = () => {
    inquirer
        .prompt(managerPrompt)
        .then((answers) => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
            team.push(manager);
            if (answers.employee === true) {
                initEmployee()
            }
            else {
                writeToFile(team);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

const employeePrompt = [
    {
        type: "list",
        message: "Would you like to add a profile for: ",
        name: "role",
        choices: ["Engineer", "Intern", "Finish building my team"]
    },
    {
        type: "input",
        message: "Please enter the employee's name: ",
        name: "employeeName",
        when(answers) {
            return answers.role !== "Finish building my team";
        },
        validate: answers => {
            if (!answers.trim()) {
                return "Please enter the employee's name!";
            }
            else {
                return true;
            }
        }
    },
    {
        type: "input",
        message: "Please enter the employee's ID: ",
        name: "employeeId",
        when(answers) {
            return answers.role !== "Finish building my team";
        },
        validate: answers => {
            if (!answers.trim()) {
                return "Please enter the employee's ID!";
            }
            else {
                return true;
            }
        }
    },
    {
        type: "input",
        message: "Please enter the employee's email address: ",
        name: "employeeEmail",
        when(answers) {
            return answers.role !== "Finish building my team";
        },
        validate: (answers) => {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers)
            if (valid) {
                return true;
            } else {
                console.log("\n Please enter a valid email!")
                return false;
            }
        }
    }
]

// // Initialize questions to add another employee
const initEmployee = () => {
    inquirer
        .prompt(employeePrompt)
        .then((answers) => {
            // Need to declare these here or it will not print it!
            let employeeName = answers.employeeName;
            let employeeId = answers.employeeId;
            let employeeEmail = answers.employeeEmail;

            if (answers.role === "Engineer") {
                inquirer
                    .prompt(engineerPrompt)
                    .then((answers) => {
                        const engineer = new Engineer(employeeName, employeeId, employeeEmail, answers.employeeGithub)
                        team.push(engineer);
                        if (answers.employee === true) {
                            initEmployee()
                        }
                        else {
                            writeToFile(team);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            else if (answers.role === "Intern") {
                inquirer
                    .prompt(internPrompt)
                    .then((answers) => {
                        const intern = new Intern(employeeName, employeeId, employeeEmail, answers.employeeSchool)
                        team.push(intern);
                        if (answers.employee === true) {
                            initEmployee()
                        }
                        else {
                            writeToFile(team);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            else {
                writeToFile(team);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

const engineerPrompt = [
    {
        type: "input",
        message: "Please enter the engineer's github username (without the @): ",
        name: "employeeGithub",
        validate: answers => {
            if (!answers.trim()) {
                return "Please enter the engineer's github username!";
            }
            else {
                return true;
            }
        }
    },
    {
        type: "confirm",
        message: "Would you like to add another employee?",
        name: "employee"
    }
]

const internPrompt = [
    {
        type: "input",
        message: "Please enter the intern's school: ",
        name: "employeeSchool",
        validate: answers => {
            if (!answers.trim()) {
                return "Please enter the intern's school!";
            }
            else {
                return true;
            }
        }
    },
    {
        type: "confirm",
        message: "Would you like to add another employee?",
        name: "employee"
    }
]

init()

// // Function to write HTML file
const writeToFile = () => {
    // const fileName = './dist/index.html';
    console.log("Generating your team's profile...");
    console.log(team)
    // fs.writeFile(fileName, generateHTML(answers), (err) =>
    //     err ? console.log(err) : console.log("Your team's profile has been successfully generated!")
    // );
}


// // writeToFile.prototype.read = function (file) {
// //     return fs.readFileSync(file, "utf8");
// // };

// // writeToFile.prototype.write = function (path, data) {
// //     return fs.writeFileSync(path, data);
// // };

// // writeToFile.prototype.append = function (file, data) {
// //     return fs.appendFileSync(file, data);
// // };



// // const generateHTML = new generateHTML();

// // generateHTML.write("index.html", "Hello World!");

// // const message1 = generateHTML.read("message.txt");

// // console.log(message1);

// // generateHTML.append("message.txt", "\nGoodbye World!");

// // const message2 = generateHTML.read("message.txt");

// // console.log(message2);