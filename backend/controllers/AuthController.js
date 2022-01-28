const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jws = require("jsonwebtoken")

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10 , function(err, hashedPass) {
        if(err) {
            res.json({
                error:err
            })
        }
    })

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
    })
    user.save()
    .then(user => {
        res.json({
            message: 'User Added Succesfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports = {
    register
}