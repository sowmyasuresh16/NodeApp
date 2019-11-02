// Statement to just let the user know that app execution has begun
console.log('Starting app.js');

// Importing file system dependency package and storing in a variable
const fs = require('fs');

var express = require("express");

require('dotenv').config();

var app = express();
app.use('/', express.static('public/public'));

app.get('/', function (req, res) {
    res.send('<html><body><h1>Node App</h1></body></html>');
});
// Sets port 8080 to default or unless otherwise specified in the environment
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

// Importing the department.js file which has all the methods to perform CRUD operation on department collection in mongodb
const dept= require('./department.js');

// Importing loadash module
const _ = require('lodash');

// Importing yarg module for validating user inputs
const yargs = require('yargs');

// Creating a variable to store command line arguments
const argv = yargs.argv;

// Storing the first command item in a variable
var command = argv._[0];

// Log to view the command object
console.log('Command: ', command);

// Log to view the argv object
console.log('Yargs', argv);

// Department functions begins

// 
if (command === 'add') {
  var department = dept.addDept(argv.dept_no, argv.dept_name);
  if (dept){
    console.log('Department created');
    console.log('--');
    console.log(`Number: ${department.dept_no}`);
    console.log(`Name: ${department.dept_name}`);
  } else {
    console.log('Department already exists');
  }
} 
// List all departments
else if (command === 'list') {
  var allDept = dept.getAll();
    console.log(`The total number of departments is ${allDept.length}`);
    allDept.forEach((deptartment) => {
        dept.logDept(deptartment);
    });
} 
// Get all departments
else if (command === 'read') {
   var department = dept.getDept(argv.dept_no);
    if(dept) {
        console.log("Found Department");
        console.log('-------------');
        console.log(`Department Number: ${department.dept_no}`);
        console.log(`Department Name: ${department.dept_name}`);
    }
    else {
        console.log("Department not found");
    }
} 
// Delete department
else if (command === 'remove') {
    dept.removeDept(argv.dept_no);
} 
// If a command other than the above mentioned commnd is given
else {
  console.log('Command not recognized');
}