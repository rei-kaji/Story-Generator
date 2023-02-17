import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
