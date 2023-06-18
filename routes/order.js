var express = require('express');
var router = express.Router();
var DBUtil = require('../app/util/DBUtil');
var TimeUtil = require('../app/util/TimeUtil');
var BaseUtil = require('../app/util/BaseUtil');

/* GET users listing. */
router.get('/getList', function(req, res, next) {
    const page = req.query.page;
    const pageSize = req.query.pageSize;
    const start = (page - 1) * pageSize;
    const sql = `select * from order_list limit ${start},${pageSize}`;
    const sql2 = `select count(*) as total from order_list`;
    const db = DBUtil.getDB();
    db.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        db.query(sql2, function (err, rows2) {
            if (err) {
                console.log(err);
                return;
            }
            res.json({
                code: 200,
                data: rows,
                total: rows2[0].total
            });
        });
    });
});
router.post('/add', function(req, res, next) {
  const tel = req.body.tel;
  const name = req.body.name;
  const imagePath = req.body.imagePath;
  const ctime = TimeUtil.getNowTime();
  const sn = BaseUtil.getRandomString(32);
  const sql = `insert into order_list (tel,name,imagePath,ctime,sn) values ('${tel}','${name}','${imagePath}','${ctime}','${sn}')`;
  const db = DBUtil.getDB();
    db.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            code: 200,
            data: rows
        });
    });
});

router.post('/getUserOrders', function(req, res, next) {
    const tel = req.body.tel;
    const sql = `select * from t_order where tel='${tel}'`;
    const db = DBUtil.getDB();
    db.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            code: 200,
            data: rows
        });
    });
});

module.exports = router;
