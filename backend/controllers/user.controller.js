import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import { sendJwtToken } from "../utils/jwtToken.js";
export const register = async (req, res) => {
  const { email, username, password, bio, gender } = req.body;
  const { profilePicture } = req.file;
  if ((!email, !username, !password, !bio, !gender)) {
    return res.status(401).json({
      success: false,
      message: "All fields are required",
    });
  }
  const existingUser = User.findOne({ email });
  if (existingUser) {
    return res.status(401).json({
      success: false,
      message: "User already exists",
    });
  }
  let cloudinaryResponse;
  if (profilePicture) {
    const fileUri = getDataUri(profilePicture);
    cloudinaryResponse = await cloudinary.uploader.upload(fileUri);
  }
  const userData = {
    username,
    email,
    password,
    bio,
    gender,
    profilePicture: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  };
  const user = User.create(userData);
  if (user) {
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        succes: false,
        message: "Please enter email and password",
      });
    }
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    sendJwtToken(user, 200, res, "Login successful");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  const options = {
    sameSite: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };
  res.status.clearCookie("token", options).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getMyProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    success: true,
    user,
  });
};

export const editProfile = async (req, res) => {
  try {
    const id = req.user_id;
    const { bio, gender } = req.body;
    const profilePicture = req.file;
    let cloudinaryResponse;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        succes: false,
        message: "User not found",
      });
    }
    if (profilePicture) {
      const fileUri = getDataUri(profilePic);
      cloudinaryResponse = await cloudinary.uploader.upload(fileUri);
      if (!cloudinaryResponse) {
        return res.status(500).json({
          success: false,
          message: "failed to update profile picture",
        });
      }
      await cloudinary.uploader.destroy(user.profilePicture.public_id);
    }
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePicture) {
      user.profilePicture = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const getSuggestUsers = async (req, res) => {
  try {
    const suggestedUsers = await User.find({
      _id: { $ne: req.user_id },
    }).select("-password");
    if (!suggestedUsers) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    return res.status(200).json({
      success: true,
      suggestedUsers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
