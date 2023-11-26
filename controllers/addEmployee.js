const fs = require('fs');

const employees = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
const last_employee_index = employees.length;
const last_employee_number =parseInt(employees[last_employee_index - 1].employee_number);
const employee_number = last_employee_number + 1;

const getAddEmployee = (req, res) => {
    res.render('addEmployee.ejs');
}

const addEmployee = (req, res) => {
    console.log(req.body);
    const first_name = req.body.firstNameField;
    const last_name = req.body.lastNameField;
    const address = req.body.addressField;
    const city = req.body.cityField;
    const country = req.body.countryField;
    const post_code = req.body.postCodeField;
    const salary = req.body.salaryField;
    const role = req.body.RoleField;

    const newEmployee = {
        employee_number,
        first_name,
        last_name,
        address,
        city,
        country,
        post_code,
        salary,
        role
    };
    employees.push(newEmployee);
    const jsonEmployees = JSON.stringify(employees);
    fs.writeFileSync('./data.json', jsonEmployees, 'utf8');
    fs.closeSync(fs.openSync('./data.json', 'r'));
    res.redirect('/employees');
    }

module.exports = {
    getAddEmployee,
    addEmployee,
};
    