const oracledb = require('oracledb');
const Oracle = function (){
    this.db = null;

    this.getDB = async function(){
        if (this.db){
            return this.db;
        }else {
            this.db = await oracledb.getConnection ({
                user          : "hr",
                password      : "mypw",
                connectString : "localhost/FREEPDB1"
            });
            return this.db;
        }
    }
}
module.exports = new DBUtil();
