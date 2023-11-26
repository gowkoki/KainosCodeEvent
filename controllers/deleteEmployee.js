const fs = require('fs');



const deleteEmployeeById = (req, res) => {
    const employees = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    const employee_number = req.query.id;
    const index = employees.findIndex(employee => employee.employee_number == employee_number);
    employees.splice(index, 1);
    const jsonEmployees = JSON.stringify(employees);
    fs.writeFileSync('./data.json', jsonEmployees, 'utf8');
    fs.closeSync(fs.openSync('./data.json', 'r'));
    res.redirect('/employees');
}

module.exports = {
    deleteEmployeeById,
};