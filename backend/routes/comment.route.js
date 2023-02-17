import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getComments,
  submitComment,
} from "../mongodb/controllers/comment.controller.js";

const router = express.Router();

// router.get("/me", auth, getMe);
// router.put("/update", auth, updateInformation);
router.get("/comments", getComments);
router.post("/submit-comment", auth, submitComment);

export default router;
