/**
* @Author: Ernest
* @Date:   12-Jan-2017
* @Project: MEAN_rush
* @Filename: register.Ctrl.js
* @Last modified by:   Ernest
* @Last modified time: 12-Jan-2017
* @License: MIT
*/

var User = require('../models/users');


module.exports.register = function(req, res)
{
    if(!req.body.name)
        res.status(400).json({"fail": "missing name"});
    else if(!req.body.email.match(/\S+@\S+\.\w{1,4}/))
        res.status(400).json({"fail": "email invalid"});
    else if((req.body.password != req.body.password_confirmation) || req.body.password == "")
        res.status(400).json({"fail": "password invalid"});
    else
    {
        User.add(req.body.name, req.body.email, req.body.password, function(response){
            console.log(response);
            res.json(response);
        });

    }
}
