import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')|| this.isNew) {
    this.password = bcryptjs.hashSync(this.password, 9);
  }
  next();
});

// Instance method to validate the password
userSchema.methods.validatePassword = async function (password) {
  return bcryptjs.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;