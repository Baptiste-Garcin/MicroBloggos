/**
* @Author: Ernest
* @Date:   12-Jan-2017
* @Project: MEAN_rush
* @Filename: passport.js
* @Last modified by:   Ernest
* @Last modified time: 12-Jan-2017
* @License: MIT
*/

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: "email"
},

function(username, password, done){
    User.findOne({"email":username}, function(err, user){
        if(err)
        return done(err)
        if(!user)
        {
            return done(null, false, {
            message : 'User not found'
            })
        }
        if (!user.validPassword(password))
        {
            return done(null, false, {
                message: 'Password is wrong'
            });
        }
        return done(null, user);
    })
})
)
