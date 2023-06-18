var express = require('express');
var router = express.Router();
var fileUploader = require('../util/upload');
var upload = fileUploader.getUpload();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,content:'<h1>hello world</h1>'});
});

app.post("/file/upload", upload.single('file'), (req, res) => {
  const { body, file } = req
  res.json({code: 200, data: file.path});
})



module.exports = router;
