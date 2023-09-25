var express = require('express');
var router = express.Router();
var Oracle = require('../app/util/Oracle');

/* GET users listing. */
router.get('/org/getOrgName', async function(req, res, next) {
    const db =  await Oracle.getDB();
    const orgBm = req.query.orgBm;
    const sql = `select MC from t_org where DM='${orgBm}'`;
    const result = await  db.execute(sql);
    res.json({
        code: 200,
        data: result.rows
    });
});

module.exports = router;
