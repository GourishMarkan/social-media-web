import express from "express";
import {
  addComment,
  bookmarkPost,
  createPost,
  deletePost,
  dislikePost,
  getCommentsOfPost,
  getAllPosts,
  getMyPosts,
  likePost,
} from "../controllers/post.controller.js";
import { verifyJwtToken } from "../middlewares/auth.js";

import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/addPost", verifyJwtToken, upload.single("image"), createPost);
router.get("/allPosts", verifyJwtToken, getAllPosts);
router.get("/userPost/all", verifyJwtToken, getMyPosts);
router.get("/:id/like", verifyJwtToken, likePost);
router.get("/:id/dislike", verifyJwtToken, dislikePost);
router.post("/:id/addComment", verifyJwtToken, addComment);
router.get("/:id/getComments/", verifyJwtToken, getCommentsOfPost);
router.post("/:id/bookmark", verifyJwtToken, bookmarkPost);
router.delete("/delete/:id", verifyJwtToken, deletePost);
export default router;
