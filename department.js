console.log('Starting department.js');
const fs = require('fs');

var fetchDepts = () => {
    try {
        var deptString = fs.readFileSync('departments.json');
        return JSON.parse(deptString);
    } catch (e) {
        return [];
    }
};

var saveDepts = (dept) => {
    fs.writeFileSync('departments.json', JSON.stringify(dept));
};

var addDept = (dept_no, dept_name) => {
    var depts = fetchDepts();
    var dept = {
        dept_no,
        dept_name
    };
    var duplicateDepts = depts.filter((dept) => dept.dept_no === dept_no);
    if (duplicateDepts.length === 0) {
        depts.push(dept);
        saveDepts(depts);
        return dept;
    }
};

var getAll = () => {
    console.log('Getting all Departments');
    return fetchDepts();
};

var getDept = (dept_no) => {
    console.log('Getting Department', dept_no);
    var depts = fetchDepts();
    var filteredDepts = depts.filter((dept) => dept.dept_no === dept_no);
    return filteredDepts[0];
};

var removeDept = (dept_no) => {
    console.log('Removing Department', dept_no);
};

var logDept = (dept) => {
    console.log("-------------");
    console.log('Department Number', dept.dept_no);
    console.log('Department Name', dept.dept_name);
}
module.exports = {
    addDept,
    getAll,
    getDept,
    removeDept,
    logDept
};