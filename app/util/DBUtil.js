const mysql = require('mysql')
const DBUtil = function (){
    this.getDB = function(){
       return  mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'pass',
            database: 'minishop'
        })
    }
}
module.exports = new DBUtil();
