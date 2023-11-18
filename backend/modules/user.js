const mysql = require("mysql2");
const { _DB } = require("../appConfig");
const Role = require('./role');

const connection = mysql.createConnection(_DB);
//SELECT login, password, type FROM Users JOIN Role USING(role_id);
class User {
    constructor(login = 'default', password= 'default', role = 'user') {
        this.login = login;
        this.password = password;
        this.role = role;
    }
    async Update(){
        if(this.login  == 'default'){
            throw new Error('that user is default'); 
        }
        let roleObj = new Role(this.role);
        let roleId = await roleObj.getRoleID()
        console.log("that role id: "+roleId);
        if(!roleId)
            throw new Error('that role is not exist');
        
        connection.connect((err)=>{

            let sqlquery = `UPDATE Users SET Users.password = ?, Users.role_id=? WHERE login = ?'`;
            console.log("User query: " +  sqlquery);
            connection.query(sqlquery, [this.password, roleId, this.login],(err,result, fields)=>{
                if(!err){
                    console.log(err);
                }
                else{
                    console.log("User updated successful");
                }
            });
        });
    }   
    async Save(){
        if(this.login  == 'default'){
            throw new Error('that user is default'); 
        }
        let roleObj = new Role(this.role);
        let roleId = await roleObj.getRoleID()
        console.log("that role id: "+roleId);
        let sqlquery = `INSERT INTO Users(login, password, role_id) VALUES(?, ?, ?)`;
        return(new Promise((resolve,reject)=>{
            if(!roleId)
                resolve(false);

            connection.connect((err)=>{
            console.log("User query: " +  sqlquery);
            connection.query(sqlquery, [this.login, this.password, roleId], (err,result, fields)=>{
                if(err){
                    console.log(err);
                    resolve(false);
                }
                else{
                    console.log("User saved successful");
                    resolve(true);
                }
            });
            });
        }))
        
    }   
    async findUser(login){
        if(!login){
            return false;
        }
        return new Promise((resolve, reject) => {
            let value = `%${login}%`;
            let sqlquery = "SELECT id, login FROM \`Users\` WHERE login LIKE ?";
            connection.connect((err)=>{
                connection.query(sqlquery, value, (err,result, fields)=>{
                    if(err){
                        console.log(err);
                        reject(err);
                    }
                    else{
                        //console.log('findUserjson: '+ JSON.stringify(result));
                        resolve(result.length == 0 ? false: result);
                    }
                });
            });
        });
    }
    async getUser(login){
        return new Promise((resolve, reject) => {
            connection.connect((err)=>{
                let sqlquery = !login? `SELECT Users.id, Users.login, Users.password, Users.status, Role.type FROM Users LEFT JOIN Role ON Users.role_id = Role.role_id` : `SELECT Users.id, Users.login, Users.password, Users.status, Role.type FROM Users LEFT JOIN Role ON Users.role_id = Role.role_id WHERE Users.login = ?`;
                connection.query(sqlquery, login,(err,result, fields)=>{
                    if(err){
                        console.log(err);
                        reject(err);
                    }
                    else{
                        console.log('getUserjson: '+ JSON.stringify(result));
                        resolve(result.length == 0 ? false: result);
                    }
                });
            });
        });
    }
    async getUserById(UserId){
        if(!UserId) return false;
        return new Promise((resolve, reject) => {
            connection.connect((err)=>{
                let sqlquery = `SELECT Users.id, Users.login, Users.password, Users.status, Role.type FROM Users LEFT JOIN Role ON Users.role_id = Role.role_id WHERE Users.id = ?`;
                connection.query(sqlquery, UserId,(err,result, fields)=>{
                    if(err){
                        console.log(err);
                        reject(err);
                    }
                    else{
                        console.log('getUserjson: '+ JSON.stringify(result));
                        resolve(result.length == 0 ? false: result);
                    }
                });
            });
        });
    }
}

module.exports = User;