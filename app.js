const express = require('express');
const bodyParser = require('body-parser');
const getEmployees = require('./controllers/employees');
const addEmployee = require('./controllers/addEmployee');
const deleteEmployee = require('./controllers/deleteEmployee');
const editEmployee = require('./controllers/editEmployee');
const app = express();
const port = 3500;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.locals.isAuth = false;

const auth = (req, res, next) => {
    if (app.locals.isAuth) {
        next();
    } else {
        res.redirect('/login');
    }
}

// const JSON_FILE_PATH = './data.json';
app.get('/login', (req, res) => {
    res.render('login.ejs');
}
);

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username == 'admin' && password == 'admin') {
        app.locals.isAuth = true;
        console.log('app.locals.isAuth', app.locals.isAuth)
        res.redirect('/employees');
    } else {
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    app.locals.isAuth = false;
    res.redirect('/');
});



app.get('/', (req, res) => {
    res.render('home.ejs');
}
);

app.get('/employees', getEmployees);
app.get('/addEmployee', auth, addEmployee.getAddEmployee);
app.post('/addEmployee', auth, addEmployee.addEmployee);
app.get('/deleteEmployee', auth, deleteEmployee.deleteEmployeeById);
app.get('/updateEmployee', auth, editEmployee.getUpdateEmployeeById);
app.post('/updateEmployee', auth, editEmployee.updateEmployeeById);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}
);