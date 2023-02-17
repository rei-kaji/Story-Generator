import mongoose from "mongoose";

const storySchema = mongoose.Schema({
  story: String,
  title: String,
  genre: String,
  keyword: String,
  image: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Story = mongoose.model("Story", storySchema);

export default Story;
