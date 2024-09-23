import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
