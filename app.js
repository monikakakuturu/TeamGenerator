const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const managerQues = [
  {
    type: "input",
    name: "name",
    message: "What is the Manager's name?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the Manager's email?",
  },
  {
    type: "input",
    name: "officenumber",
    message: "What is the Manager's office number?",
  },
  {
    type: "list",
    message: "What type of team member you want to add?",
    name: "type",
    choices: ["Engineer", "Intern", "No, I am done adding"],
  },
];

const engineerQues = [
  {
    type: "input",
    name: "name",
    message: "What is the Engineer's name?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the Engineer's email?",
  },
  {
    type: "input",
    name: "githublink",
    message: "What is the Engineer's github profile?",
  },
  {
    type: "list",
    message: "What type of team member you want to add?",
    name: "type",
    choices: ["Engineer", "Intern", "No, I am done adding"],
  },
];

const internQues = [
  {
    type: "input",
    name: "name",
    message: "What is the Intern's name?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the Intern's email?",
  },
  {
    type: "input",
    name: "school",
    message: "What is the Intern's school name?",
  },
  {
    type: "list",
    message: "What type of team member you want to add?",
    name: "type",
    choices: ["Engineer", "Intern", "No, I am done adding"],
  },
];

var employeeList = [];
// employee id is unique so update it programatically instead of user entered value
var employeeID = 1;

// function to initialize program and gets the manager info
function initManager() {
  employeeList.length = 0;
  inquirer.prompt(managerQues).then(function (data) {
    const manager = new Manager(
      data.name,
      employeeID,
      data.email,
      data.officeNumber
    );
    employeeID++;
    employeeList.push(manager);
    checkEmployeeType(data.type);
  });
}

// gets the engineer information
function EngineerInfo() {
  inquirer.prompt(engineerQues).then(function (data) {
    const engineer = new Engineer(
      data.name,
      employeeID,
      data.email,
      data.github
    );
    employeeID++;
    employeeList.push(engineer);
    checkEmployeeType(data.type);
  });
}

// gets the intern information
function InternInfo() {
  inquirer.prompt(internQues).then(function (data) {
    const intern = new Intern(data.name, employeeID, data.email, data.school);
    employeeID++;
    employeeList.push(intern);
    checkEmployeeType(data.type);
  });
}

// checks the employee type and continue to enter info until done
function checkEmployeeType(type) {
  switch (type) {
    case "Engineer":
      EngineerInfo();
      break;
    case "Intern":
      InternInfo();
      break;
    default:
      createHTML();
      break;
  }
}

// renders the employee list and generates output html file
function createHTML() {
  const html = render(employeeList);
  // check if directory exists and create if not exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFile(outputPath, html, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully created the Team profile file!");
    }
  });
}

// function call to initialize program
initManager();
