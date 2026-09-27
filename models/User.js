// DEPENDENCIES
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// Schema Definition
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
});

// 1. Pre-save hook: Automatically hashes password before saving
userSchema.pre('save', async function () {
  if (this.isNew || this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

userSchema.methods.isCorrectPassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// 2. Schema Static: To ensure the hashing is correctly established
userSchema.statics.findOrCreate = async function (userData) {
  let user = await this.findOne({ email: userData.email });

  if (!user) {
    user = new this(userData);
    await user.save();
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);