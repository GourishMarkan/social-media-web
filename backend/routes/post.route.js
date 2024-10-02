import express from "express";
import {
  addComment,
  bookmarkPost,
  createPost,
  deletePost,
  dislikePost,
  getCommentsOfPost,
} from "../controllers/post.controller.js";
import { verifyJwtToken } from "../middlewares/auth.js";
import {
  getAllPosts,
  getMyPosts,
  likePost,
} from "../controllers/post.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/addPost", verifyJwtToken, upload.single("image"), createPost);
router.get("/allPosts", verifyJwtToken, getAllPosts);
router.get("userPost/all", verifyJwtToken, getMyPosts);
router.post("/:id/like", verifyJwtToken, likePost);
router.post("/:id/dislike", verifyJwtToken, dislikePost);
router.post("/:id/addComment", verifyJwtToken, addComment);
router.get("/:id/getComments/", verifyJwtToken, getCommentsOfPost);
router.post("/:id/bookmark", verifyJwtToken, bookmarkPost);
router.post("/:id/delete", verifyJwtToken, deletePost);
export default router;
