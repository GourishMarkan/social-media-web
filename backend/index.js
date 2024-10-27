import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";
import { app, server } from "./socket/socket.js";
dotenv.config({ path: "./config/.env" });

// const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  // methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// routes--
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import messageRouter from "./routes/message.route.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/message", messageRouter);
// app.listen(port, () => {
//   console.log("Server is running on port ", port);
// });

server.listen(port, () => {
  connectDB();
  console.log(`Server listen at port ${PORT}`);
});
