import Comment from "../models/comment.models.js";

export const getComments = async (req, res, next) => {
  const storyId = req.body.storyId;
  try {
    let comments = await Comment.find({ story: storyId });

    res.status(200).json({
      status: "success",
      comments,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
      error,
    });
  }
};

export const submitComment = async (req, res, next) => {
  const { comment, story } = req.body;

  try {
    const commentRes = new Comment({
      comment,
      story,
      user: req.user,
    });

    const result = await commentRes.save();
    // save story to database

    res.status(201).json({
      message: "Comment submit successfully!",
      result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
      error,
    });
  }
};
