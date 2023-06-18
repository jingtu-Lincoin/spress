var express = require('express');
var router = express.Router();
var FileUploader = require('../app/util/FileUploader');
var upload = FileUploader.getUpload()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,content:'<h1>hello world</h1>'});
});

router.get('/userOrders', function(req, res, next) {
  res.render('userOrders');
});

router.post("/file/upload", upload.single('file'), (req, res) => {
  const { body, file } = req
  res.json({code: 200, data: file.path});
})



module.exports = router;
