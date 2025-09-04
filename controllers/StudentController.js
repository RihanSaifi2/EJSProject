const Student = require('../models/Student');
const cloudinary = require('cloudinary').v2;

//function to add student

async function addStudent(req, res){
    try{
      console.log(req.body, 'req.body');
      console.log(req.file, 'req.file');
      let result;
      if(req.file) {
        cloudinary.config({
          cloud_name:'dhrgwlhbz',
          api_key: '483725776138198',
          api_secret: 'KXEi0zD43DiZAy6SEt5yAsPohNI'
        })
        result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);
      }
       let student = new Student(req.body);
       if(req.file){
        student.studentImage = result.secure_url;
       }
       
      await student.save();
      console.log("data base updated...");
      let students = await Student.find({});
      res.render('studentlist', {
        students: students
      });
    }catch(err){
        console.log(err);
    }
}

//function to delete student

async function deleteStudent(req, res){
  try{
    let studentId = req.params._id;
    console.log(studentId, 'deletedStudent');
    await Student.deleteOne({_id: studentId});
    let students = await Student.find({});
    res.render('welcomeadmin', {
      students: students
    })
  }catch(err){
    console.log(err);
  }
}

//function to edit student

async function openEditPage(req, res){
  try{
   let studentId = req.params._id;
   let student = await Student.findOne({ _id: studentId});
   if(student){
    res.render('studenteditpage', {
      student: student
    })
   }else{
     res.render('/');
   }
  }catch(err){
    console.log(err);
  }
}

///edit/student/:_id
async function editStudent(req, res){
  try{
    const studentId = req.params._id;
    console.log(studentId, "studentId");
    let student = await Student.findOne({ _id: studentId });
    if(student){
      console.log(req.body, "req.body");
      // student.rollNo = req.body.rollNo;
      // student.studentName = req.body.studentName;
      // student.fatherName = req.body.fatherName;
      // student.course = req.body.course;
      // student.branch = req.body.branch;
      // student.yearOfAdmission = req.body.yearOfAdmission;
      Object.assign(student, req.body);
      await student.save();
      console.log("Data saved...")
      let students = await Student.find({});
      res.render('welcomeadmin', {
        students: students
      });

    }else{
      res.end("Student not found...");
    }
  }catch(err){
    console.log(err);
  }
}

async function listStudent(req, res){
  try{
  
  // console.log(req.body, 'req.body');
  // let student = new Student(req.body);
  // await student.save();
  // }catch(err){
  //   console.log(err);  let students = Student.find({});
  let students = await Student.find({});
  res.render('liststudent', {
    students: students
  });
   }catch(err){
    console.log(err);
   }
}
module.exports = {
    addStudent,
    deleteStudent,
    openEditPage,
    editStudent,
    listStudent
}