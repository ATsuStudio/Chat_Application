const mysql = require("mysql2");
const { _DB } = require("../appConfig");

const connection = mysql.createConnection(_DB);

class userInfo{
    constructor(UserId = 0, Age = 1, Bio = "", Email = "", Gender = ""){
        this.__uid = UserId;
        this.__age = Age;
        this.__bio = Bio;
        this.__email = Email;
        this.__gender = Gender;
    }
    
    async Save(){
        if(!this.__uid || this.__uid == 0){
            console.log("User id not selected!");
            return 0;
        }
        if(this.__age < 1 || this.__age >100){
            console.log("Age is not correct!");
            return 0;
        }
        const sqlquery = `INSERT INTO User_Info(uid, age, bio, mail, gender) VALUES (?,?,?,?,?);`;
        return new Promise((resolve,reject)=>{
            try {
                connection.connect((err)=>{
                    if(err){
                        reject(err);
                    }
                    connection.query(sqlquery,[this.__uid, this.__age, this.__bio, this.__email, this.__gender],(err,result)=>{
                        if(err){
                            console.log(err);
                            reject(err);
                        }
                        resolve(result);
    
                    })
                });
            } catch (error) {
                console.log(error);
                reject(0);
            }
        })
    }
    async Update(){
        if(!this.__uid || this.__uid == 0){
            console.log("User id not selected!");
            return 0;
        }
        if(this.__age < 1 || this.__age >100){
            console.log("Age is not correct!");
            return 0;
        }
        const sqlquery = `UPDATE User_Info SET User_Info.age = ?, User_Info.bio = ?, User_Info.mail = ?, User_Info.gender = ? WHERE uid = ?;`;
        return new Promise((resolve,reject)=>{
            try {
                connection.connect((err)=>{
                    if(err){
                        reject(err);
                    }
                    connection.query(sqlquery,[this.__age, this.__bio, this.__email, this.__gender, this.__uid],(err,result)=>{
                        if(err){
                            console.log(err);
                            reject(err);
                        }
                        resolve(result);
    
                    })
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }
    async GetByUserId(UserId){
        if(UserId<0 || !UserId){
            console.log("UserId is not correct: "+UserId);
            return 0;
        }
        const sqlquery = `SELECT * FROM User_Info WHERE uid = ?`;
        return new Promise((resolve,reject)=>{
            try {
                connection.connect((err)=>{
                    if(err){
                        reject(err);
                    }
                    connection.query(sqlquery,UserId,(err,result)=>{
                        if(err){
                            console.log(err);
                            reject(err);
                        }
                        resolve(result);
    
                    })
                });
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })
    }
}

module.exports = userInfo;