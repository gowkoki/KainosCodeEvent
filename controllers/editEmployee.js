const fs = require('fs');

const getUpdateEmployeeById = (req, res) => {
    const employees = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    const employee_number = req.query.id;
    const index = employees.findIndex(employee => employee.employee_number == employee_number);
    const employee = employees[index];
    // console.log(employee);
    res.render('editEmployee.ejs', { employee });
}

const updateEmployeeById = (req, res) => {
    const employees = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    const employee_number = req.query.id;
    console.log(employee_number);
    const index = employees.findIndex(employee => employee.employee_number == employee_number);
    console.log(index);
    // const employee = employees[index];
    const first_name = req.body.firstNameField;
    const last_name = req.body.lastNameField;
    const address = req.body.addressField;
    const city = req.body.cityField;
    const country = req.body.countryField;
    const salary = req.body.salaryField;
    const role = req.body.RoleField;

    const updatedEmployee = {
        employee_number,
        first_name,
        last_name,
        address,
        city,
        country,
        salary,
        role
    };
    employees[index] = updatedEmployee;
    const jsonEmployees = JSON.stringify(employees);
    fs.writeFileSync('./data.json', jsonEmployees, 'utf8');
    fs.closeSync(fs.openSync('./data.json', 'r'));
    res.redirect('/employees');
}

module.exports = {
    getUpdateEmployeeById,
    updateEmployeeById,
};