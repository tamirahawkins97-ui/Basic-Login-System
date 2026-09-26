//DEPENDANCIES 
import { Schema, model } from "mongoose"
import bycrpt from 'bycrpt'

//Automatically hashes our password before reaching the database. 
const userSchema = new Schema({
Username: {type: String, required: true},
Email: {type: String, required: true},
Password: {type: String, required: true, minlength: 8}
});

//Create pre-save middle ware for password creation! :D
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
 
  next();
});

const User = model("User",userSchema)

export default User;