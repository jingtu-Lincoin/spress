var express = require('express');
var router = express.Router();
var FileUploader = require('../app/util/FileUploader');
var upload = FileUploader.getUpload()
var BaseUtil = require('../app/util/BaseUtil');
var DBUtil = require('../app/util/DBUtil');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,content:'<h1>hello world</h1>'});
});

router.get('/userOrders', function(req, res, next) {
  res.render('userOrders',{title:'用户订单'});
});

module.exports = router;
