import jwt from "jsonwebtoken";
export const sendToken = (user, statusCode, res, message) => {
  // console.log("user in jwt token", user);
  // console.log("getToekn func", user.getJwtToken());
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  console.log("token in jwt token", token);
  const options = {
    sameSite: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
