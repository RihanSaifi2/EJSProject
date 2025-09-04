const express = require('express');
const connect = require('./connection');
const makeAdmin = require('./makeadmin');
const user = require('./routes/user');
const student = require('./routes/student');
const path = require('path');
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(user)
app.use(student);

connect();
makeAdmin();

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.listen(3000, (err)=>{
     if(err){
        console.log(err);
     }else{
        console.log("server is running on 3000...");
     }
})