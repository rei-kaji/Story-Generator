import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getStories,
  uploadStory,
} from "../mongodb/controllers/story.controller.js";

const router = express.Router();

// router.get("/me", auth, getMe);
// router.put("/update", auth, updateInformation);
router.get("/stories", auth, getStories);
router.post("/upload", auth, uploadStory);

export default router;
