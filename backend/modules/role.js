const mysql = require("mysql2");
const { _DB } = require("../appConfig");
const connection = mysql.createConnection(_DB);
class Role {
    constructor(name) {
        this.name = name;
    }
    getRoleID() {
        return new Promise((resolve, reject) => {
            connection.connect((err) => {
                let sqlquery =
                    'SELECT role_id FROM Role WHERE Role.type = ?'
                connection.query(sqlquery, this.name ,(err, result, fields) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log(result);
                        let role_id = result[0].role_id;
                        console.log("Role id before return: " + role_id);
                        resolve(role_id);
                    }
                });
            });
        });
    }
}

module.exports = Role;
