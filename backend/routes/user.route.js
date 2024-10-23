import express from "express";
import {
  editProfile,
  followorUnfollowUser,
  getMyFollowers,
  getMyFollowing,
  getProfile,
  getSuggestUsers,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import { verifyJwtToken } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.post("/register", upload.single("profilePicture"), register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/suggestedUser", verifyJwtToken, getSuggestUsers);
router.get("/:id/profile", verifyJwtToken, getProfile);
router.put(
  "/edit-profile",
  verifyJwtToken,
  upload.single("profilePicture"),
  editProfile
);
router.post("/followOrUnfollow/:id", verifyJwtToken, followorUnfollowUser);
router.get("/myFollowers", verifyJwtToken, getMyFollowers);
router.get("/myFollowing", verifyJwtToken, getMyFollowing);
export default router;
