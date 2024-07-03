const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  last_connection: Date,
  documents: [
    {
      name: String,
      reference: String
    }
  ],
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
