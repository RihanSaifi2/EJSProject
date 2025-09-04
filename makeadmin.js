const User = require('./models/User');
const bcrypt = require('bcrypt');
async function makeAdmin() {
    try{
        let user = await User.findOne({ email: 'rihansaifi121s@gmail.com'});
        if(user){
            console.log('user saved Successfully');
        }else{
            user = new User();
            user.firstName = 'Rihan';
            user.lastName = 'Saifi';
            user.email = 'rihansaifi121s@gmail.com';
            let encryptedpassword = bcrypt.hashSync('Saifi121', 10);  
            user.password = encryptedpassword
            user.userType = 'Admin';
            await user.save();
            console.log('User Saved Successfully');
        }

    }catch(err){
        console.log(err);
    }
}
module.exports=makeAdmin;