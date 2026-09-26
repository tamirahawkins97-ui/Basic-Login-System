// DEPENDENCIES 
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

// Schema Definition
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 }
});

// 1. Pre-save hook: Automatically hashes password before saving
userSchema.pre("save", async function () {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  // No next() needed when using async/await
});

// 2. Schema Static: To ensure the hashing is correctly established
userSchema.statics.findOrCreate = async function (userData) {
  // Check if user already exists
  let user = await this.findOne({ email: userData.email });

  // If user does not exist, create and save (triggers pre-save hook)
  if (!user) {
    user = new this(userData);
    await user.save();
  }

  return user;
};

const User = model("User", userSchema);

export default User;