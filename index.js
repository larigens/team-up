// Packages needed.
const inquirer = require('inquirer');
// const fs = require("fs");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");
// const generateHTML = require("./generateHTML");

// Will be an array of objects with all employee information separated by role.
var team = []

// Array of prompts to enter the team manager’s informations.
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

// Function call to initialize app.
const init = () => {
    inquirer
        .prompt(managerPrompt)
        .then((answers) => {
            // Sets up the manager profile card.
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
            team.push(manager);
            // Conditional statement to start another series of questions to collect information necessary for the addition of another employee's card.
            if (answers.employee === true) {
                initEmployee()
            }
            // Finalize prompts and start building team profile cards.
            else {
                writeToFile(team);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

// Array of questions prompted to enter the employee’s informations.
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
        // This prompt will only be displayed if the user decides not to finish building his team profile.
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

// Initializes prompts to add another employee.
const initEmployee = () => {
    inquirer
        .prompt(employeePrompt)
        .then((answers) => {
            // Need to declare these variables here or it won't print it in the constants below.
            let employeeName = answers.employeeName;
            let employeeId = answers.employeeId;
            let employeeEmail = answers.employeeEmail;
            // Conditional statement to only collect the information below if the employee is an engineer.
            if (answers.role === "Engineer") {
                inquirer
                    .prompt(engineerPrompt)
                    .then((answers) => {
                        // Sets up the engineer profile card.
                        const engineer = new Engineer(employeeName, employeeId, employeeEmail, answers.employeeGithub)
                        team.push(engineer);
                        // If the user wants to add another employee, this function is invoked again.
                        if (answers.employee === true) {
                            initEmployee()
                        }
                        // Finalize prompts and start building team profile cards.
                        else {
                            writeToFile(team);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            // Conditional statement to only collect the information below if the employee is an intern.
            else if (answers.role === "Intern") {
                inquirer
                    .prompt(internPrompt)
                    .then((answers) => {
                        // Sets up the intern profile card.
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
            // Finalize prompts and start building team profile cards if the user selects the "Finish building my team" option.
            else {
                writeToFile(team);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

// Specific question for engineers.
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

// Specific question for interns.
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

// Initialize app.
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