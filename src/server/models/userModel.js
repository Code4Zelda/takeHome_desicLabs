const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;



const User = new Schema({
  // fullname: { type: String, required: true, unique: true },
  // email: { type: String, required:true, unique: true},
  // description: { type: String, required:true, unique: true},
  username: String,
  password: String,
 google: {
  id: String,
  name: String,
  email: String,
  image: String 
 }
}, { timestamps: true });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User); // <-- export your model