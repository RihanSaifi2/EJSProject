const User = require('../models/User');
const Student = require('../models/Student');
const bcrypt = require('bcrypt');

async function addUser(req, res){
    try{
      console.log(req.body, 'req.body');
      let user = new User(req.body);
      //user.userType = 'Admin';
      let encryptedpassword = bcrypt.hashSync(req.body.password, 10);
      console.log(encryptedpassword, 'encryptedpassword');
      user.password = encryptedpassword;
      await user.save();
      console.log("data save successfully...");
      res.redirect('/');
    }catch(err){
       console.log(err);
    }
}

async function doLogin(req, res){
  try{
    console.log(req.body, 'req.body');
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if(user){
      let validPassword = await bcrypt.compare(req.body.password, user.password);
      if(validPassword){
        let students = await Student.find({});
        res.render('welcomeadmin', {
          students: students
        });
      }else{
        res.end("<h1> Invalid email/password...");
      }
    }else{
      res.end("<h1> user does not exist...");
    }
  }catch(err){

  }
}

module.exports = {
    addUser,
    doLogin
}