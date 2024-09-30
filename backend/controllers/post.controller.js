import sharp from "sharp";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import cloudinary from "../utils/cloudinary.js";
import { Comment } from "../models/comment.model.js";

export const createPost = async (req, res) => {
  const { caption } = req.body;
  const image = req.file;
  const authorId = req.user_id;
  if (!image) {
    return res.status(401).json({
      success: false,
      message: "Please upload an image",
    });
  }
  const user = await User.findById(authorId);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }
  // image upload first optimizing the image
  const optimizedImage = await sharp(image.buffer)
    .resize({
      width: 800,
      height: 800,
      fit: `inside`,
    })
    .toFormat("jpeg", { quality: 90 })
    .toBuffer();
  console.log("optimized image is ", optimizedImage);
  const fileUri = `data:image/jpeg;base64,${optimizedImage.toString("base64")}`;

  console.log("file uri is ", fileUri);

  const cloudinaryResponse = await cloudinary.uploader.upload(fileUri, {
    folder: "posts",
  });

  const postData = {
    caption,
    image: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    author: authorId,
  };
  const post = await Post.create(postData);
  user.posts.push(post._id);

  await user.save();

  await post.populate({ path: "author", select: "-password" });
  return res.status(201).json({
    message: "New post added",
    post,
    success: true,
  });
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "username profilePicture",
      })
      .populate({
        path: "comments",
        sorted: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      });
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const authorId = req.user_id;
    const myPost = await Post.find({
      author: authorId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "auhtor",
        select: "username profilePicture",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      });
    if (!myPost) {
      return res.status(404).json({
        success: false,
        message: "No post found",
      });
    }
    return res.status(200).json({
      success: true,
      myPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const likePost = async (req, res) => {
  const likedUser_id = req.user_id;
  const postId = req.params.id;
  // finding the post
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }
  await post.updateOne({ $addToSet: { likes: likedUser_id } });

  //TODO: implementing the notification through socket.io
  return res.status(200).json({
    success: true,
    message: "Post liked",
  });
};

export const dislikePost = async (req, res) => {
  const dislikedUser_id = req.user_id;
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }
  await post.updateOne({ $pull: { likes: dislikedUser_id } });
  // TODO: implementing the notification through socket.io
  return res.status(200).json({
    success: true,
    message: "Post disliked",
  });
};

export const addComment = async (req, res) => {
  const commentUser_id = req.user_id;
  const postId = req.params.id;
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({
      success: false,
      message: "Please add a comment",
    });
  }
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }
  const comment = await Comment.create({
    author: commentUser_id,
    text,
    post: postId,
  });

  await comment.populate({
    path: "author",
    select: "username profilePicture",
  });

  post.comments.push(comment._id);
  await post.save();

  return res.status(201).json({
    message: "Comment Added",
    comment,
    success: true,
  });
};

export const getCommentsOfPost = async (req, res) => {
  const postId = req.params.id;
  // finding the comments
  const comments = await Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .populate({
      path: "author",
      select: "username profilePicture",
    });
  if (!comments)
    return res
      .status(404)
      .json({ message: "No comments found for this post", success: false });

  return res.status(200).json({ success: true, comments });
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const user_id = req.user_id;

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    // check if the logged-in user is the owner of the post
    if (post.author.toString() != user_id)
      return res.status(401).json({
        message: "You are not authorized to delete this post",
        success: false,
      });
    // deleting the post from cloudinary
    await cloudinary.uploader.destroy(post.image.public_id);
    // deleting the post from the database
    await post.remove();

    // removing the post from the user's posts array
    const user = await User.findById(user_id);
    user.posts = user.posts.filter((id) => id.toString() != postId);
    await user.save();

    // deleting the comments of the post
    await Comment.deleteMany({ post: postId });

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const author_id = req.user_id;
    // finding the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    const user = await User.findById(author_id);
    if (user.bookMarks.includes(postId)) {
      // removing the post from the user's bookmark
      // user.bookMarks.pull(postId);
      await user.updateOne({ $pull: { bookMarks: postId } });
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Post removed from bookmark",
      });
    } else {
      // adding the post to the user's bookmark
      // user.bookMarks.push(postId);
      await user.updateOne({ $push: { bookMarks: postId } });
      await user.save();
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
