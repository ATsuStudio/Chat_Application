const User = require('../modules/user');
const bcryptjs = require('bcryptjs');
const { json } = require("body-parser");
const { secret }  = require('../tokenSettings');
const {validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

const hashLevel = 8;
const generateToken = (id,login, role)=>{
    const payload = {id,login,role};
    return(jwt.sign(payload, secret, {expiresIn: '24h'}))
}
class authController{
    
    async login(req,res) {

        try {
            //res.send(JSON.stringify( req));
            const validError = validationResult(req);
            if(!validError.isEmpty()){
                return res.status(400).json({message: validError});
            }
            let {login: reqLogin, password: reqPassword} = req.body;
            let logUser = new User();
            if(!await logUser.getUser(reqLogin) && reqLogin !="users"){
                let passHash = await bcryptjs.hash(reqPassword , hashLevel);
                logUser = new User(reqLogin,passHash);
                let result = await logUser.Save();
                if(result){
                    res.status(201).json({message: 'Logined successfuly'});
                }
                else{
                    res.status(500).json({message: 'Somthing went wrong'});
                }
            }
            else{
                res.status(401).json({message: 'User with that login is exist'});
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    
    async singin(req,res) {
        try {
            const validError = validationResult(req);
            if(!validError.isEmpty()){
                return res.status(400).json({message: validError});
            }
            let {login: reqLogin, password: reqPassword} = req.body;
            let singUser = new User();
            if(await singUser.getUser(reqLogin)){
                const ourUser = await singUser.getUser(reqLogin);
                console.log("our user " + JSON.stringify(ourUser));
                let passHashUser = ourUser[0].password;
                const validPass = await bcryptjs.compare(reqPassword, passHashUser);
                const genToken = generateToken(ourUser[0].id,ourUser[0].login, ourUser[0].type);
                if (validPass){
                    res.status(200).json({message: genToken});
                }
                else{
                    res.status(400).json({message: 'Password is not correct'});
                }
            }
            else{
                res.status(400).json({message: 'User with that login is exist'});
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = new authController();