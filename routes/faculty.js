var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload = require('./multer');
var LocalStorage = require("node-localstorage");
var localstorage = LocalStorage.LocalStorage('./scratch');//agar .scratch nahin likhoge toh web browser ka buffer banayega
//encryptype=multipart/form-data multipart meaning file and form-data meaning data
router.get('/facultyinterface', function (req, res, next) {
  var result = JSON.parse(localstorage.getItem('ADMIN'))
  if (result) { res.render('facultyinterface', { msg: '', result: result[0] }); }
  else {
    res.redirect('/faculty/adminlogin')
  }
});
router.get('/studentinterface', function (req, res, next) {
  var result = JSON.parse(localstorage.getItem('ADMIN'))
  if (result) { res.render('studentinterface', { msg: '', result: result[0] }); }
  else {
    res.redirect('/faculty/adminlogin')
  }
});
//single or any usme name field image ka
router.post('/submitfaculty', upload.single("image"), function (req, res, next) {
  // when we write post toh data ke liye req.body
  // file ke liye req.file
  console.log(req.body)
  console.log(req.file)
  //date divied into two body mein form data ke liye
  //and file mein image
  pool.query("insert into faculty(firstname,lastname,birthdate,gender,mobileno,email,address,state,city,zipcode,qualification,department,image) values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.firstname, req.body.lastname, req.body.birthdate, req.body.gender, req.body.mobileno, req.body.email, req.body.address, req.body.state, req.body.city, req.body.zipcode, req.body.qualification, req.body.department, req.file.filename], function (error, result) {
    var result = JSON.parse(localstorage.getItem('ADMIN'))
    if (error) {
      res.render("facultyinterface", { msg: 'Server Error', result: result[0] });
    }
    else {
      res.render("facultyinterface", { msg: 'Record Submittted', result: result[0] });
    }
  })
});
router.post('/submitstudent', upload.single("image"), function (req, res, next) {
  // when we write post toh data ke liye req.body
  // file ke liye req.file

  console.log(req.body)
  console.log(req.file)
  //date divied into two body mein form data ke liye
  //and file mein image
  pool.query("insert into student(firstname,lastname,birthdate,gender,mobileno,email,address,state,city,zipcode,currentyear,department,image) values(?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.firstname, req.body.lastname, req.body.birthdate, req.body.gender, req.body.mobileno, req.body.email, req.body.address, req.body.state, req.body.city, req.body.zipcode, req.body.currentyear, req.body.department, req.file.filename], function (error, result) {
    var result = JSON.parse(localstorage.getItem('ADMIN'))
    if (error) {
      res.render("studentinterface", { msg: 'Server Error', result: result[0] });
    }
    else {
      res.render("studentinterface", { msg: 'Record Submittted', result: result[0] });
    }
  })
});
router.post('/updatefacultypicture', upload.single("image"), function (req, res, next) {
  // when we write post toh data ke liye req.body
  // file ke liye req.file
  console.log(req.body)
  console.log(req.file)
  //date divied into two body mein form data ke liye
  //and file mein image
  console.log(req.body.fid)
  pool.query("update faculty set image=? where facultyid=?", [req.file.filename, req.body.fid], function (error, result) {
    if (error) {
      res.redirect("/faculty/showallfaculties")
    }
    else {
      res.redirect("/faculty/showallfaculties")
    }
  })
});
router.post('/updatestudentpicture', upload.single("image"), function (req, res, next) {
  // when we write post toh data ke liye req.body
  // file ke liye req.file
  console.log(req.body)
  console.log(req.file)
  //date divied into two body mein form data ke liye
  //and file mein image
  console.log(req.body.fid)
  pool.query("update student set image=? where studentid=?", [req.file.filename, req.body.fid], function (error, result) {
    if (error) {
      res.redirect("/faculty/showallstudents")
    }
    else {
      res.redirect("/faculty/showallstudents")
    }
  })
});
router.get('/displaybyfacultyid', function (req, res, next) {
  var results = JSON.parse(localstorage.getItem('ADMIN'))
  if (results) {
    pool.query('select * from faculty,states,cities where facultyid=? and states.stateid=faculty.state and cities.zipcode=faculty.city', [req.query.fid], function (error, result) {
      //console.log(result[0].birthdate)
      if (error) {
        res.render("displaybyid", { data: false });
      }
      else {
        res.render("displaybyid", { data: result[0], result: results[0] });
      }
    })
  }
  else { res.redirect('/faculty/adminlogin') }
});
router.get('/displaybystudentid', function (req, res, next) {
  var results = JSON.parse(localstorage.getItem('ADMIN'))
  if (results) {
    pool.query('select * from student,states,cities where studentid=? and states.stateid=student.state and cities.zipcode=student.city', [req.query.fid], function (error, result) {
      //console.log(result[0].birthdate)
      if (error) {
        res.render("displaybystudentid", { data: false });
      }
      else {
        res.render("displaybystudentid", { data: result[0], result: results[0] });
      }
    })
  }
  else { res.redirect('/faculty/adminlogin') }
});
router.get('/logout', function (req, res, next) {
  localstorage.clear();
  res.redirect('/faculty/adminlogin')

});
router.get('/myinfo', function (req, res, next) {
  var results = JSON.parse(localstorage.getItem('FACULTY'));
  res.render("facmyinfo", { result: results[0] });
});
router.get('/faclogout', function (req, res, next) {
  localstorage.clear();
  res.redirect('/faculty/facultylogin')

});
router.get('/adminlogin', function (req, res, next) {

  res.render("login", { result: '' })
});

router.get('/facultylogin', function (req, res, next) {

  res.render("facultylogin", { result: '' })
});
router.get('/searchfaculty', function (req, res, next) {
  var result = JSON.parse(localstorage.getItem('ADMIN'))
  if (result) { res.render("searchfaculty", { result: result[0], msg: '' }) }
  else {
    res.redirect('/faculty/adminlogin')
  }

});
router.get('/searchfacultybyid', function (req, res, next) {
  var results = JSON.parse(localstorage.getItem('ADMIN'))
  if (results) {
    pool.query('select * from faculty,states,cities where facultyid=? and states.stateid=faculty.state and cities.zipcode=faculty.city', [req.query.fid], function (error, result) {
      //console.log(result[0].birthdate)
      if (error) {
        res.render("displaybyid", { data: false });
      }
      else {
        if (result.length == 1) { res.render("foundid", { data: result[0], result: results[0] }); }
        else { res.render("searchfaculty", { data: result[0], result: results[0], msg: 'This Id does not exist' }); }
      }
    })
  }
  else { res.redirect('/faculty/adminlogin') }


});
router.post('/chklogin', function (req, res, next) {
  console.log(req.body.emailid);
  console.log(req.body.passwords);
  pool.query('select * from faculty.admin where (emailid=? and password=?)', [req.body.emailid, req.body.passwords], function (error, result) {
    if (error) { res.render("login", { result: 'Server Error' }); }
    else {
      if (result.length == 1) {
        localstorage.setItem('ADMIN', JSON.stringify(result))
        res.render("dashboard", { result: result[0] })
      }
      else { res.render("login", { result: 'INVALID ADMINID/PASSWORD' }) }
    }
  })

});
router.post('/chkfacultylogin', function (req, res, next) {
  console.log(req.body.emailid);
  console.log(req.body.passwords);
  pool.query('select * from faculty.faculty where (email=? and password=?)', [req.body.emailid, req.body.passwords], function (error, result) {
    if (error) { res.render("facultylogin", { result: 'Server Error' }); }
    else {
      if (result.length == 1) {
        localstorage.setItem('FACULTY', JSON.stringify(result))
        res.render("facultydashboard", { result: result[0] })
      }
      else { res.render("facultylogin", { result: 'INVALID FACULTYID/PASSWORD' }) }
    }
  })

});
router.get('/dashboards', function (req, res, next) {
  res.render('dashboards', {})
});
router.get('/showfacultyimage', function (req, res, next) {
  result = { fid: req.query.fid, fn: req.query.fn, ln: req.query.ln, image: req.query.image }
  res.render("showimage", result)
})
router.get('/showstudentimage', function (req, res, next) {
  result = { fid: req.query.fid, fn: req.query.fn, ln: req.query.ln, image: req.query.image }
  res.render("showstudentimage", result)
})
router.get('/dashboard', function (req, res, next) {
  res.render('dashboard', {});
});
router.get('/updatefaculty', function (req, res, next) {
  pool.query('update faculty set firstname=?,lastname=?,birthdate=?,gender=?,mobileno=?,email=?,address=?,state=?,city=?,zipcode=?,qualification=?,department=? where facultyid=?', [req.query.firstname, req.query.lastname, req.query.birthdate, req.query.gender, req.query.mobileno, req.query.email, req.query.address, req.query.state, req.query.city, req.query.zipcode, req.query.qualification, req.query.department, req.query.fid], function (error, result) {
    var aresult = JSON.parse(localstorage.getItem('ADMIN'))
    if (error) { res.render("displaybyid", { data: false, result: aresult[0] }); }
    else {
      res.render("displaybyid", { data: result, result: aresult[0] });
    }
  })
});
router.get('/updatestudent', function (req, res, next) {
  pool.query('update student set firstname=?,lastname=?,birthdate=?,gender=?,mobileno=?,email=?,address=?,state=?,city=?,zipcode=?,currentyear=?,department=? where studentid=?', [req.query.firstname, req.query.lastname, req.query.birthdate, req.query.gender, req.query.mobileno, req.query.email, req.query.address, req.query.state, req.query.city, req.query.zipcode, req.query.currentyear, req.query.department, req.query.fid], function (error, result) {
    var aresult = JSON.parse(localstorage.getItem('ADMIN'))
    if (error) { res.render("displaybystudentid", { data: false, result: aresult[0] }); }
    else {
      res.render("displaybystudentid", { data: result, result: aresult[0] });
    }
  })
});

router.get('/deletefaculty', function (req, res, next) {
  pool.query('delete from faculty where facultyid=?', [req.query.fid], function (error, result) {
    if (error) {
      res.redirect('/faculty/showallfaculties');
    }
    else {
      res.redirect('/faculty/showallfaculties');
    }
  })
});
router.get('/deletestudent', function (req, res, next) {
  pool.query('delete from student where studentid=?', [req.query.fid], function (error, result) {
    if (error) {
      res.redirect('/faculty/showallstudents');
    }
    else {
      res.redirect('/faculty/showallstudents');
    }
  })
});
router.get('/showallfaculties', function (req, res, next) {
  var data = JSON.parse(localstorage.getItem('ADMIN'))
  if (data) {
    pool.query("select * from faculty,states,cities where faculty.state=states.stateid and faculty.city=cities.zipcode", function (error, result) {

      if (error) {
        res.render("displayallfaculty", { result: false });
      }

      else {
        res.render("displayallfaculty", { result: result, data: data[0] });
      }

    })
  }
  else {
    res.redirect('/faculty/adminlogin')
  }
});
router.get('/showallstudents', function (req, res, next) {
  var data = JSON.parse(localstorage.getItem('ADMIN'))
  if (data) {
    pool.query("select * from student,states,cities where student.state=states.stateid and student.city=cities.zipcode", function (error, result) {

      if (error) {
        res.render("displayallstudent", { result: false });
      }

      else {
        res.render("displayallstudent", { result: result, data: data[0] });
      }

    })
  }
  else {
    res.redirect('/faculty/adminlogin')
  }
});

router.get('/fetchallcities', function (req, res, next) {
  pool.query("select * from cities where stateid=?", [req.query.stateid], function (error, result) {
    if (error) {
      res.status(500).json([])
    }
    else {
      res.status(200).json(result)
    }

  })
});
router.get('/fetchallstates', function (req, res, next) {
  pool.query("select * from states", function (error, result) {
    if (error) {
      res.status(500).json([])
    }
    else {
      res.status(200).json(result)
    }

  })

});
router.get('/fetchallsem', function (req, res, next) {
  pool.query("select * from semester", function (err, result) {
    if (err) {
      res.status(500).json([])
    }
    else {
      res.status(200).json(result)
    }


  })

});
router.get('/fetchallmarks', function (req, res, next) {
  pool.query("select * from marks", function (err, result) {
    if (err) {
      res.status(500).json([])
    }
    else {
      res.status(200).json(result)
    }


  })

});
router.get('/fetchallclass', function (req, res, next) {
  const data = JSON.parse(localstorage.getItem('FACULTY'))
  pool.query("select * from class where facultyid=?", [data[0].facultyid], function (err, result) {
    if (err) {
      res.status(500).json([])
    }
    else {
      res.status(200).json(result)
    }


  })

});
router.get('/entermark', function (req, res, next) {
  var aresult = JSON.parse(localstorage.getItem('FACULTY'))
  if (aresult) {

    res.render('selectsem', { result: aresult[0] });



  }

})
// router.get('/fetchallst', function (req, res, next) {
//   console.log(req.query)
//   var aresult = JSON.parse(localstorage.getItem('FACULTY'))
//   if (aresult) {
//     pool.query("select * from student_class,student where student_class.classid=? and student_class.studentid=student.studentid", [req.query.cls], function (error, pes) {
//       if (error) {
//         console.log(error)
//         res.status(500).json([])
//       }
//       else {
//         res.status(200).json(result)
//       }
//     })
//   }
// })
router.post('/submitmark', function (req, res, next) {
  console.log(req.body);
  var aresult = JSON.parse(localstorage.getItem('FACULTY'))
  var arr = [req.body.sid, req.body.mid, req.body.coursecode, req.body.classid, req.body.classid, req.body.smarks]
  // var sid=req.body.sid;
  // var smarks=req.body.smarks;
  // var mid=req.body.mid;
  // var classid=req.body.classid;
  // var coursecode=req.body.coursecode;
  console.log(arr)
    pool.query(
      "insert into student_marks(studentid,marksid,coursecode,facultyid,classid,score) values ?"
      , [req.body.sid.map((item,index)=>([item,req.body.mid,req.body.coursecode,1,req.body.classid,req.body.smarks[index]]))], function (error, result) {
        if (error) { console.log(error); }
        else { 
          console.log(true)
         }
      }
    )
})
module.exports = router;