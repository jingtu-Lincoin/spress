const mysql = require('mysql')
export default function DBUtil{
    this.db = null;

    this.getDB = function(){
        if (db){
            return db;
        }else {
            this.db = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'pass',
                database: 'eshop'
            })
            db.connect()
        }
    }
}
