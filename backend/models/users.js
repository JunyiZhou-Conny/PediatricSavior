const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  affliation: String,
  // other attribtues to be added
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
