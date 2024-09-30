import express from "express";
import {
  addComment,
  bookmarkPost,
  createPost,
  dislikePost,
  getCommentsOfPost,
} from "../controllers/post.controller.js";
import { verifyJwtToken } from "../middlewares/auth.js";
import {
  getAllPosts,
  getMyPosts,
  likePost,
} from "../controllers/post.controller";

const router = express.Router();

router.post("/createPost", verifyJwtToken, createPost);
router.get("/getAllPosts", verifyJwtToken, getAllPosts);
router.get("getMyPosts", verifyJwtToken, getMyPosts);
router.post("/likePost/:id", verifyJwtToken, likePost);
router.post("/dislikePost/:id", verifyJwtToken, dislikePost);
router.post("/addComment/:id", verifyJwtToken, addComment);
router.get("/getComments/:id", verifyJwtToken, getCommentsOfPost);
router.post("/bookmarkPost/:id", verifyJwtToken, bookmarkPost);
export default router;
