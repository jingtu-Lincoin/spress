const BaseUtil = function (){
    this.getRandomString = function(len){
        len = len || 32;
        let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        let maxPos = $chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    /**
     * 解决multer文件path路径问题
     * @param path
     * @return {*}
     */
    this.getFilePath = function (path) {
        if(path){
            path = path.replace("public","public\\");
            path = path.replace("uploads","uploads\\");
            path = path.replace("file","\\file");
        }
        return path;
    }

}
module.exports = new BaseUtil();