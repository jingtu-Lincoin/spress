const path = require('path')
const mkdirp = require('mkdirp')
const sd = require("silly-datetime")
const multer = require('multer')
const FileUploader = function () {

    this.getUpload = function (file) {
        const storage = multer.diskStorage({
            destination: async function (req, file, cb) {
                // 1. 获取当前日期
                let day = sd.format(new Date(), "YYYYMMDD")

                // 2. 拼接目录
                let dir = path.join("./public/uploads", day)

                // 3. 按照日期生成图片存储目录 mkdirp是异步方法
                await mkdirp.mkdirp(dir)

                cb(null, dir)
            },
            filename: function (req, file, cb) {
                // 1. 获取文件后缀名
                let extName = path.extname(file.originalname)
                // 2. 根据时间戳生成文件名
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                cb(null, file.fieldname + '-' + uniqueSuffix + extName)
            },
            path: function (req, file, cb) {
                let day = sd.format(new Date(), "YYYYMMDD")
                // 2. 拼接目录
                let dir = path.join("./public/uploads", day)
                let filePath = path.join(dir, file.filename)

                cb(null, filePath)
            }
        })
      return  multer({ storage: storage })
    }
}
module.exports = new FileUploader();