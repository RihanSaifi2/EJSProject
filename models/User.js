const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps/lib/timestamps');
const Schema = mongoose.Schema;

const userSchema = new Schema({
     firstName: { type: String, required: true },
     lastName: { type: String, required: true },
     email: { type: String, required: true },
     password: { type: String, required: true },
     userType: { type: String, default: 'student'},
     createAt: Date,
     updateAt: Date
})
userSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model( 'User', userSchema);