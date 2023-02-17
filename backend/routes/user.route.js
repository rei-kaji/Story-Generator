import express from "express";
// import auth from "../middleware/auth.middleware.js";
import {
  getMe,
  updateInformation,
} from "../mongodb/controllers/user.controller.js";

const router = express.Router();

// router.get("/me", auth, getMe);
// router.put("/update", auth, updateInformation);
router.get("/me", getMe);
router.put("/update", updateInformation);

export default router;
