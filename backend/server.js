var express = require('express')
const { default: mongoose } = require('mongoose')

app = express()
port = 3000
clientURL = "http://localhost:8080";
Data = require('./api/models/dataModel')
bodyParser = require('body-parser');

var bodyParser = require('body-parser')
var cors = require('cors')


mongoose.connect('mongodb://localhost:40000/capstone')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))



app.use(cors({credentials: true, origin: clientURL}))



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/controllers/dataController'); //importing route
routes(app); //register the route

app.get('/', (req,res) => {
    res.send('HELLO')
})

app.listen(port);

app.use(function(req, res){
    res.status(404).send({url: req.originalUrl + ' not found'})
});


console.log('todo list RESTful API server started on: ' + port);

/*

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/
