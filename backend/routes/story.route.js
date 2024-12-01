import express from "express";
import { verifyJwtToken } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import { createStory, getAllStories } from "../controllers/story.controller.js";
const router = express.Router();

router.post("/addStory", verifyJwtToken, upload.single("image"), createStory);
router.get("/allStories", verifyJwtToken, getAllStories);
export default router;
