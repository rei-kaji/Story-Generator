import express from "express";

import {
  generateImage,
  generateStory,
} from "../mongodb/controllers/openAI.controller.js";

const router = express.Router();

router.post("/", generateStory);
router.post("/generate-image", generateImage);

export default router;
