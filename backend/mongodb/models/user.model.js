import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    avatar: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
