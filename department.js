console.log('Starting department.js');
const fs = require('fs');
// Reading departments from departments.json
var fetchDepts = () => {
    try {
        var deptString = fs.readFileSync('departments.json');
        return JSON.parse(deptString);
    } catch (e) {
        return [];
    }
};

// Save departments by writing to json file
var saveDepts = (dept) => {
    fs.writeFileSync('departments.json', JSON.stringify(dept));
};

// Add a new department.
var addDept = (dept_no, dept_name) => {
    var depts = fetchDepts();
    var dept = {
        dept_no,
        dept_name
    };

    // Checking if a department with the same dept no exists and then pushing the newly added dept
    var duplicateDepts = depts.filter((dept) => dept.dept_no === dept_no);
    if (duplicateDepts.length === 0) {
        depts.push(dept);
        saveDepts(depts);
        return dept;
    }
};

// Fetch all departments
var getAll = () => {
    console.log('Getting all Departments');
    return fetchDepts();
};

// Get department based on given department no
var getDept = (dept_no) => {
    console.log('Getting Department', dept_no);
    var depts = fetchDepts();
    var filteredDepts = depts.filter((dept) => dept.dept_no === dept_no);
    return filteredDepts[0];
};

// Remove department based on given department no
var removeDept = (dept_no) => {
    console.log('Removing Department', dept_no);
};
// Logging Departments info
var logDept = (dept) => {
    console.log("-------------");
    console.log('Department Number', dept.dept_no);
    console.log('Department Name', dept.dept_name);
}
// Exporting methods inorder to use it in app.js
module.exports = {
    addDept,
    getAll,
    getDept,
    removeDept,
    logDept
};