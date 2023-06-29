const mysql = require('mysql')
const DBUtil = function (){
    this.getDB = function(){
       return  mysql.createConnection({
            host: '47.117.114.43',
            user: 'minishop',
            password: 'minishop',
            database: 'minishop'
        })
    }
}
module.exports = new DBUtil();
