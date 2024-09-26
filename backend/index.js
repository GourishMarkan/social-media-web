import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";

dotenv.config({});

const app = express();
const port = process.env.PORT || 5000;
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  creditionals: true,
};
app.use(cors(corsOptions));

app.listen(port, () => {
  connectDB();
  console.log("Server is running on port ", port);
});

// FpaY7XKiBvxqKoKn db password
