import express from "express";
import { verifyJwtToken } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import {
  createStory,
  getAllStories,
  getMyStories,
} from "../controllers/story.controller.js";
const router = express.Router();

router.post("/addStory", verifyJwtToken, upload.single("image"), createStory);
router.get("/allStories", verifyJwtToken, getAllStories);
router.get("/myStories", verifyJwtToken, getMyStories);
export default router;
