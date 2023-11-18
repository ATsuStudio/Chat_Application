const mysql = require("mysql2");
const { _DB } = require("../appConfig");

const connection = mysql.createConnection(_DB);

class Chat{
    getChat(Chat_id){
            let reply ={
                chat:{
                    id: Chat_id,
                }
            };
        return(new Promise((resolve, reject) =>{
            let sqlquery = `
            SELECT Messages.id, Users.login, Messages.content, Messages.created 
            FROM Messages 
            JOIN Users ON Messages.uid = Users.id 
            WHERE Messages.chat_id = ?;
            `;
            connection.connect((err)=>{
                //console.log("getChat query: " +  sqlquery);
                connection.query(sqlquery, Chat_id ,(err,result, fields)=>{
                    if(err){
                        console.log(err);
                        reject(err);
                    }
                    else{
                        reply.chat.content = result;
                        //console.log(JSON.stringify( reply));
                        resolve(reply);
                    }
                });
            });
        }))
    }

    getChatId(Sender, Receiver){
        return(new Promise((resolve, reject) =>{
            let sqlquery = `
            SELECT t1.chat_id
            FROM ChatParticipants AS t1
            JOIN ChatParticipants AS t2 ON t1.chat_id = t2.chat_id
            WHERE t1.uid = ? AND t2.uid = ?`;
            connection.connect((err)=>{
                //console.log("getChatId query: " +  sqlquery);
                connection.query(sqlquery, [Sender,Receiver],(err,result, fields)=>{
                    if(err){
                        console.log(err);
                        reject(err);
                    }
                    else{
                        resolve(result.length <1? false:result[0]);
                    }
                });
            });

        }))
    }
    createChat(){
        return(new Promise((resolve,reject)=>{
            let sqlquery = `INSERT INTO Chats (Users_Count) VALUES (2)`;
            connection.connect((err)=>{
                connection.query(sqlquery, (err,result, fields)=>{
                    if(err){
                        console.log(err);
                        resolve(false);
                    }
                    else{
                        console.log(JSON.stringify(result));
                        resolve(result.insertId);
                    }
                });
            });
        }))
    }

    addParticipants(chat_id, uid){
        return(new Promise((resolve,reject)=>{
            let sqlquery = `INSERT INTO ChatParticipants(chat_id, uid)  VALUES (?,?)`;
            connection.connect((err)=>{
                connection.query(sqlquery,[chat_id,uid], (err,result, fields)=>{
                    if(err){
                        console.log(err);
                        resolve(false);
                    }
                    else{
                        resolve(result.serverStatus ==2? true:false);
                    }
                });
            });
        }))
    }

    addMessage(chat_id, uid, content){
        return(new Promise((resolve,reject)=>{
            let sqlquery = `INSERT INTO Messages(chat_id, uid, content)  VALUES (?,?,?)`;
            connection.connect((err)=>{
                connection.query(sqlquery,[chat_id, uid, content], (err,result, fields)=>{
                    if(err){
                        console.log(err);
                        resolve(false);
                    }
                    else{
                        resolve(result.serverStatus ==2? true:false);
                    }
                });
            });
        }))
    }

}


module.exports = Chat;