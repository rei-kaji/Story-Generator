import express from "express";

import { generateStory } from "../mongodb/controllers/openAI.controller.js";

const router = express.Router();

router.post("/", generateStory);

export default router;
