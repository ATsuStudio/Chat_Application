const User = require("../modules/user");
const bcryptjs = require("bcryptjs");
const { json } = require("body-parser");
const { secret } = require("../tokenSettings");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const userInfo = require("../modules/userInfo");
const { emit } = require("nodemon");

const hashLevel = 8;
const generateToken = (id, role) => {
    const payload = { id, role };
    return jwt.sign(payload, secret, { expiresIn: "24h" });
};
class userController {
    async userUpdate(req, res) {
        try {
            const validError = validationResult(req);
            if (!validError.isEmpty()) {
                return res.status(400).json({ message: validError });
            }

            let {
                login: reqLogin,
                password: reqPassword,
                role: reqRole,
            } = req.body;
            let logUser = new User();
            if (await logUser.getUser(reqLogin)) {
                let passHash = await bcryptjs.hash(reqPassword, hashLevel);
                logUser = !reqRole
                    ? new User(reqLogin, passHash)
                    : new User(reqLogin, passHash, reqRole);
                logUser.Update();
                res.status(200).json({ message: "Updated successfuly" });
            } else {
                res.status(401).json({ message: "User not found" });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getUsers(req, res) {
        let userInstance = new User();
        let query = req.params.login;
        try {
            res.status(200).json({
                message: await userInstance.getUser(query),
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
    async userCheck(req, res) {
        let userEntity = new User();
        let userObject = await userEntity.getUser(req.ulogin);
        res.status(200).json({
            message: {
                username: userObject[0].login,
            },
        });
    }

    
    async postUserInfo(req, res) {
        let {
            age: u_age = 1,
            bio: u_bio = "",
            email: u_email = "",
            gender: u_gender = "",
        } = req.body;

        let uInfo = new userInfo(req.uid, u_age, u_bio, u_email, u_gender);
        try {
            let feedback = await uInfo.Save();
            if(feedback.serverStatus == 2){
                res.status(200).json({message:"User Info created successful"});
            }
            else{
                console.log("SQL Error> "+ feedback);
                res.status(404).json({message:"Something went wrong"});
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({message:"Something went wrong"});
        }
    }
    async getUserInfo(req, res) {
        let user = new User();
        let fuser = await user.getUser(req.params.ulogin);
        if(fuser.length<1){
            res.status(200).json({message: []});
            return;
        }

        let uInfo = new userInfo();
        res.status(200).json({message: await uInfo.GetByUserId(fuser[0].id)});
    }
    async getUserExist(req, res) {
        let uLogin = req.params.ulogin;
        let user = new User();
        if(!(await user.getUser(uLogin))){
            res.status(200).json({message: false});
        }
        else{
            res.status(200).json({message: true});
        }
    }

    async putUserInfo(req, res) {
        let {
            age: u_age = 1,
            bio: u_bio = "",
            email: u_email = "",
            gender: u_gender = "",
        } = req.body;

        let uInfo = new userInfo(req.uid, u_age, u_bio, u_email, u_gender);
        try {
            let feedback = await uInfo.Update();
            if(feedback.serverStatus == 2){
                res.status(200).json({message:"User Info changed successful"});
            }
            else{
                console.log("SQL Error> "+ feedback);
                res.status(404).json({message:"Something went wrong"});
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({message:"Something went wrong"});
        }
    }
}
module.exports = new userController();
