import sharp from "sharp";
import { Story } from "../models/story.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";

export const createStory = async (req, res) => {
  const image = req.file;
  const authorId = req.user_id;
  try {
    const user = await User.findById(authorId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    if (!image) {
      return res.status(401).json({
        success: false,
        message: "Please upload an image",
      });
    }
    const optimizedImage = await sharp(image.buffer)
      .resize({
        width: 800,
        height: 800,
        fit: "inside",
      })
      .toFormat("jpeg", { quality: 90 })
      .toBuffer();

    // const fileUri = `data:image/jpeg;base64,${optimizedImage.toString(
    //   "base64"
    // )} `;
    const fileUri = `data:image/jpeg;base64,${optimizedImage.toString(
      "base64"
    )}`;
    const cloudinaryRes = await cloudinary.uploader.upload(fileUri, {
      folder: "stories",
    });
    if (!cloudinaryRes)
      return res.status(411).json({
        success: true,
        message: "failed to upload image",
      });
    const storyData = {
      author: authorId,
      image: {
        public_id: cloudinaryRes.public_id,
        url: cloudinaryRes.secure_url,
      },
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
    const story = await Story.create(storyData);
    user.stories.push(story._id);
    await user.save();
    // populate the author field
    await story.populate({ path: "author", select: "-password" });

    return res.status(201).json({
      success: true,
      message: "Story created",
      story,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: `Internal server error, ${err.message}`,
    });
  }
};

export const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find({
      expiresAt: { $gt: new Date() },
    })
      .populate({
        path: "author",
        select: "-password",
      })
      .sort({ createdAt: -1 });
    if (!stories) {
      return res.status(404).json({
        success: false,
        message: "No stories found",
      });
    }
    return res.status(200).json({
      success: true,
      stories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyStories = async (req, res) => {
  try {
    const authorId = req.user_id;
    const stories = await Story.find({
      author: authorId,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });
    if (!stories) {
      return res.status(404).json({
        success: false,
        message: "No stories found",
      });
    }
    return res.status(200).json({
      success: true,
      stories,
    });
  } catch (error) {
    console.log(error);
  }
};
