var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');
var LocalStorage = require("node-localstorage");
var localstorage = LocalStorage.LocalStorage('./scratch');
router.get('/studentlogin', function (req, res, next) {

  res.render("studentlogin", { result: '' })
});
router.get('/logout', function (req, res, next) {
  localstorage.clear();
  res.redirect('/student/studentlogin')

});
/*router.get('/seemarks', function (req, res, next) {
  var result = JSON.parse(localstorage.getItem('STUDENT'))
  if(result.success) {
    pool.query('',[], function (error, result){

    })
  }
  res.render("records",{result:results[0]});
});*/
router.post('/chkstudentlogin', function (req, res, next) {
  console.log(req.body.emailid);
  console.log(req.body.passwords);
  pool.query('select * from faculty.student where (email=? and password=?)', [req.body.emailid, req.body.passwords], function (error, result) {
    if (error) { res.render("studentlogin", { result: 'Server Error' }); }
    else {
      if (result.length == 1) {
        localstorage.setItem('STUDENT', JSON.stringify(result))
        res.render("studentdashboard", { result: result[0] })
      }
      else { res.render("studentlogin", { result: 'INVALID STUDENTID/PASSWORD' }) }
    }
  })

});
router.get('/myinfo', function (req, res, next) {
  var results = JSON.parse(localstorage.getItem('STUDENT'));
  res.render("stmyinfo", { result: results[0] });
});
router.get('/fetchallst', function (req, res, next) {
  console.log(req.query)
  var aresult = JSON.parse(localstorage.getItem('FACULTY'))
  if (aresult) {
    pool.query("select * from student_class,student where student_class.classid=? and student_class.studentid=student.studentid", [req.query.cls], function (error, result) {
      if (error) {
        console.log(error)
        res.status(500).json([])
      }
      else {
        res.status(200).json(result)
      }
    })
  }
})
router.post('/submitmark', function (req, res, next) {
  
  })
module.exports = router;