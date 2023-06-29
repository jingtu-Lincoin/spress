var express = require('express');
var router = express.Router();
var DBUtil = require('../app/util/DBUtil');
var TimeUtil = require('../app/util/TimeUtil');
var BaseUtil = require('../app/util/BaseUtil');
var FileUploader = require('../app/util/FileUploader');
var upload = FileUploader.getUpload()

/* GET users listing. */
router.post('/getList', function(req, res, next) {
    const page = req.body.page;
    const pageSize = req.body.pageSize;
    console.log("page", page+ "pageSize", pageSize);
    const start = (page - 1) * pageSize;
    const sql = `select * from t_order limit ${start},${pageSize}`;
    console.log("sql", sql);
    const sql2 = `select count(*) as total from t_order`;
    const db = DBUtil.getDB();
    console.log("db", db);
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
            const pageObj = {
                list: rows,
                pageCount: Math.ceil(rows2[0].total / pageSize),
                pageSize: pageSize,
                page: page
            }
            res.json({
                code: 200,
                data: pageObj,
            });
        });
    });
});
// router.post('/add', function(req, res, next) {
//   const tel = req.body.tel;
//   const name = req.body.name;
//   const imagePath = req.body.imagePath;
//   const ctime = TimeUtil.getNowTime();
//   const sn = BaseUtil.getRandomString(32);
//   const sql = `insert into t_order (tel,name,imagePath,ctime,sn) values ('${tel}','${name}','${imagePath}','${ctime}','${sn}')`;
//   const db = DBUtil.getDB();
//     db.query(sql, function (err, rows) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         res.json({
//             code: 200,
//             data: rows
//         });
//     });
// });

router.post('/getUserOrders', function(req, res, next) {
    const tel = req.body.tel;
    const name = req.body.name;
    const sql = `select * from t_order where tel='${tel}' and name='${name}'`;
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

router.post("/file/upload", upload.single('file'), (req, res) => {
    const { body, file } = req;
    const tel = body.tel;
    const name = body.name;
    const image = "http://"+ req.hostname + ":" + req.socket.localPort + "/" + BaseUtil.getFilePath(file.path);
    const ctime = TimeUtil.getNowTime();
    const sn = BaseUtil.getRandomString(32);
    const sql = `insert into t_order (tel,name,image,ctime,sn) values ('${tel}','${name}','${image}','${ctime}','${sn}')`;
    console.log("sql", sql);
    const db = DBUtil.getDB();
    db.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        const sql2 = `select * from t_order where tel='${tel}'`;
        db.query(sql2, function (err, rows2) {
            if (err) {
                console.log(err);
                return;
            }
            res.render('userOrders', { tel: tel ,name:name,orders:rows2});
        });

    });

})

module.exports = router;
