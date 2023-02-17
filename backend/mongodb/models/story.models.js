import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    story: String,
    title: String,
    genre: String,
    keyword: String,
    image: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", storySchema);

export default Story;
