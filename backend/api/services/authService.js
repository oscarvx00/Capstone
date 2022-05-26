const jwt = require('jsonwebtoken')
var expressJWT = require('express-jwt')
var bcrypt = require('bcrypt')

let secret = 'some_secret'

var mongoose = require('mongoose')
    User = mongoose.model('User')

exports.sign = async function(req, res){
    const{
        username,
        password
    } = req.body

    if(username == undefined || password == undefined){
        res.status(400).send({error : "No user or password"})
    }

    let user = await User.findOne({username : username})
    if(user == undefined){
        res.status(404).send({error: "User not found"})
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch){
        res.status(403).json({error: 'Wrong password'})
    }

    let userData = {
        username
    }

    let token = jwt.sign(userData, secret, {expiresIn: '24h'})
    res.status(200).json({token: token})
}

exports.register = async function(req, res){
    const{
        username,
        password
    } = req.body

    if(username == undefined || password == undefined){
        res.status(400).send({error : "No user or password"})
    }
    let hash = await bcrypt.hash(password, 10)
    
    await User({
        username: username,
        password: hash
    }).save()

    res.status(200).send({msg : "OK"})
       
}