import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  avatar: String,
});

const User = mongoose.model("User", userSchema);

export default User;
