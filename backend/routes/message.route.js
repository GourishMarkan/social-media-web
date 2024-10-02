import express from "express";
import { verifyJwtToken } from "../middlewares/auth.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:id", verifyJwtToken, sendMessage);
router.get("/all/:id", verifyJwtToken, getMessages);

export default router;
