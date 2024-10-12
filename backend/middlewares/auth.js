import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

export const verifyJwtToken = async (req, res, next) => {
  console.log("cookies are ", req.cookies);
  const { token } = req.cookies;
  console.log("token is", token);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: " Login first to access this resource",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
  // const user = await User.findById(decoded.id).select("+password");
  req.user_id = decoded.id;
  next();
};
