var multer=require('multer')
//null means local server here we give servername
    //like aws dena toh aws ka ip daal denge
var serverpath=multer.diskStorage({
    destination:(req,file,path)=>{
    path(null,"public/images")},

    filename:(req,file,path)=>{
        path(null,file.originalname)
    }});
var upload=multer({storage:serverpath})
module.exports=upload