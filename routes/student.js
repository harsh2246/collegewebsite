var express=require('express');
var router=express.Router();
var pool=require('./pool');
var upload=require('./multer');
var LocalStorage = require("node-localstorage"); 
var localstorage=LocalStorage.LocalStorage('./scratch');
router.get('/studentlogin',function(req, res,next){
   
    res.render("studentlogin",{result:''})
  });
  router.post('/chkstudentlogin',function(req, res,next){
    console.log(req.body.emailid);
    console.log(req.body.passwords);
    pool.query('select * from faculty.student where (email=? and password=?)',[req.body.emailid,req.body.passwords],function(error,result){
      if(error)
      {res.render("studentlogin",{result:'Server Error'});}
      else{
        if(result.length==1)
        {localstorage.setItem('STUDENT',JSON.stringify(result))
          res.render("studentdashboard",{result:result[0]})}
        else
        {res.render("studentlogin",{result:'INVALID STUDENTID/PASSWORD'})}
      }
    })
    
  });
 
  
module.exports =router;