const mysql = require('mysql')
const DBUtil = function (){
    this.db = null;

    this.getDB = function(){
        if (this.db){
            return this.db;
        }else {
            this.db = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'pass',
                database: 'minishop'
            })
            this.db.connect()
        }
    }
}
module.exports = new DBUtil();
