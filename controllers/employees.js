const fs = require('fs');


const getEmployees = (req, res) => {
    const employees = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    res.render('employees.ejs', { employees: employees });
}

module.exports = getEmployees;