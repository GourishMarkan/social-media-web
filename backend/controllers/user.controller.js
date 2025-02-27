import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import { sendToken } from "../utils/jwtToken.js";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
  const { username, password, email, bio, gender } = req.body;
  console.log("", username, password, email, bio, gender);
  const profilePicture = req.file;
  if (!email || !username || !password) {
    return res.status(401).json({
      success: false,
      message: "All fields are required",
    });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(401).json({
      success: false,
      message: "User already exists",
    });
  }
  let cloudinaryResponse;
  if (req.file) {
    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudinaryResponse = await cloudinary.uploader.upload(fileUri);
      console.log("cloudinary response is ", cloudinaryResponse);
    }
  }

  const userData = {
    username,
    email,
    password,
    bio,
    gender,
    profilePicture: {
      public_id: cloudinaryResponse?.public_id,
      url: cloudinaryResponse?.secure_url,
    },
  };
  console.log("user data us ", userData);
  const user = await User.create(userData);
  console.log("user is ", user);
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
    console.log("email and password are in login", email, password);
    console.log("req.nbidy is ", req.body.email, req.body.password);
    if (!email || !password) {
      return res.status(401).json({
        succes: false,
        message: "Please enter email and password",
      });
    }
    let user = await User.findOne({ email })
      .populate({ path: "posts", createdAt: -1 })
      .populate("stories")
      .select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    // const isPasswordMatch = await user.comparePassword(password);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    // populating the posts-
    // const populatedPosts = await Promise.all(
    //   user.posts.map(async (post_id) => {
    //     const post = await Post.findById(post_id);
    //     return post.author.equals(user._id) ? post : null;
    //   })
    // );
    const populatedPosts = user.posts;
    // console.log("populated posts are ", populatedPosts);
    // populating the stories-
    // const populatedStories=await Promise.all({
    //   user.stories.map
    // })
    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts: populatedPosts,
      stories: user.stories,
    };
    console.log("user is ", user);
    sendToken(user, 200, res, "Login successful");
    // const token=
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
  res.status(200).clearCookie("token", "", options).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const getProfile = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }
  const user = await User.findById(id)
    .select("-password")
    .populate({ path: "posts", createdAt: -1 })
    .populate("bookMarks");
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
    // console.log(username);
    console.log("update profile details coming is ", bio, gender, req.file);
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
      const fileUri = getDataUri(profilePicture);
      cloudinaryResponse = await cloudinary.uploader.upload(fileUri);
      console.log("cloudinary response is ", cloudinaryResponse);
      if (!cloudinaryResponse) {
        return res.status(500).json({
          success: false,
          message: "failed to update profile picture",
        });
      }
      // await cloudinary.uploader.destroy(user.profilePicture.public_id);
    }
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    // if (username) user.username = username;
    // if (email) user.email = email;
    if (profilePicture) {
      user.profilePicture = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    }
    console.log("user is ", user.profilePicture);
    await user.save();
    console.log("user is ", user);
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

export const followorUnfollowUser = async (req, res) => {
  try {
    const user_id = req.user_id; // id of the user who is following or unfollowing
    const target_id = req.params.id; // id of the user whom  to follow or unfollow
    // checking if user is trying to follow himself
    // console.log("user id and target id is ", user_id, target_id);
    if (user_id === target_id) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }
    const user = await User.findById(user_id);
    const targetUser = await User.findById(target_id);

    if (!user || !targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // check if the user is already following the target user
    const isFollowing = user.following.includes(target_id);
    if (isFollowing) {
      // to unFollow the user
      await Promise.all([
        User.updateOne({ _id: user_id }, { $pull: { following: target_id } }),
        User.updateOne({ _id: target_id }, { $pull: { followers: user_id } }),
      ]);
      res.status(200).json({
        success: true,
        message: "User unfollowed successfully",
        action: "unfollow_User",
      });
    } else {
      // to follow the user
      await Promise.all([
        User.updateOne({ _id: user_id }, { $push: { following: target_id } }),
        User.updateOne({ _id: target_id }, { $push: { followers: user_id } }),
      ]);
      res.status(200).json({
        success: true,
        message: "User followed successfully",
        // followingUser: target_id,
        action: "follow_User",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMyFollowers = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate(
      "followers",
      "username profilePicture id"
    );
    // .populate("username");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No followers found",
      });
    }
    const userData = user.followers;
    res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMyFollowing = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate(
      "following",
      "username profilePicture id"
    );
    // .select("username profilePicture id");
    // .populate("username")
    // .select("username profilePicture");
    console.log("users are ", user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No following found",
      });
    }
    const user1 = user.following;
    res.status(200).json({
      success: true,
      user: user1,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Internal server error ${error}`,
    });
  }
};
