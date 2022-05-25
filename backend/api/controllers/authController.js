module.exports = function(app){

    var authService = require('../services/authService')

    app.route('/token/sign')
        .post(authService.sign)

    app.route('/register')
        .post(authService.register)
}