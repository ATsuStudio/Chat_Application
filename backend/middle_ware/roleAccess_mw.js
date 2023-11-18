const jwt = require("jsonwebtoken");
const { secret } = require('../tokenSettings');
const { json } = require("express");

module.exports = function (Roles){
    return function(req, res, next){
        if(req.method === "OPTIONS"){
            next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token){
                return res.status(401).json({massage: "User is not registrated"});
            }
            const jwtresult = jwt.verify(token,secret);
            
            if(Roles.includes(jwtresult.role)){
                next();
            }
            else
                return res.status(401).json({massage: "User doesn't have permission"})
            
        } catch (error) {
            console.log(error);
            return res.status(401).json({massage: "User is not registrated"});
        }
    }
    
}