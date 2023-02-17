import Story from "../models/story.models.js";

export const getStories = async (req, res, next) => {
  try {
    let stories = await Story.find();

    res.status(200).json({
      status: "success",
      stories,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
      error,
    });
  }
};

export const uploadStory = async (req, res, next) => {
  const { story, title, genre, keyword, image } = req.body;

  try {
    const storyRes = new Story({
      story: story,
      title: title,
      genre: genre,
      keyword: keyword,
      image: image,
      user: req.user,
    });

    const result = await storyRes.save();
    // save story to database

    res.status(201).json({
      message: "Story upload successfully!",
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
