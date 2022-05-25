var express = require('express')
const { default: mongoose } = require('mongoose')

app = express()
port = 3000
clientURL = "http://localhost:8080";
Data = require('./api/models/dataModel')
User = require('./api/models/userModel')
bodyParser = require('body-parser');

var bodyParser = require('body-parser')
var cors = require('cors')
var expressJWT = require('express-jwt')

//Warning duplicated in files
let secret = 'some_secret'

mongoose.connect('mongodb://localhost:40000/capstone')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))



app.use(cors({credentials: true, origin: clientURL}))



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressJWT({secret : secret, algorithms : ['HS256']})
  .unless(
    {path: [
      '/token/sign',
      '/register'
    ]}
  ))


var routes = require('./api/controllers/dataController'); //importing route
var authRoutes = require('./api/controllers/authController')
routes(app); //register the route
authRoutes(app)

app.get('/', (req,res) => {
    res.send('HELLO')
})

app.listen(port);

app.use(function(req, res){
    res.status(404).send({url: req.originalUrl + ' not found'})
});


console.log('todo list RESTful API server started on: ' + port);


