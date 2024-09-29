import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";

dotenv.config({ path: "./config/.env" });

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: process.env.URL,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

connectDB();
// routes--
import userRoutes from "./routes/user.route.js";
app.use("/api/v1/user", userRoutes);
app.listen(port, () => {
  console.log("Server is running on port ", port);
});
