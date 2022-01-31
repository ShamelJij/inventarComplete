const express = require('express');
const bodyParser = require('body-parser');


const { mongoose } = require('./db.js');
var employeeController = require('./controllers/employeeController.js');

var app = express();
app.use(bodyParser.json());
// Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


app.listen(3000, () => console.log('Server started at port : 3000'));

app.use('/employees', employeeController);