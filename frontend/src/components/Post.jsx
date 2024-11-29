import { useEffect, useState } from "react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

import {
  Bookmark,
  BookmarkCheck,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import CommentDialog from "./CommentDialog";
import { setPosts, setSelectedPost } from "@/store/slices/postSlice";
import { Badge } from "./ui/badge";
// import useFollowOrUnfollow from "@/hooks/useFollowOrUnfollow";
import { setUserProfile } from "@/store/slices/userSlice";
const Post = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const [liked, setLiked] = useState(post?.likes?.includes(user?._id) || false);
  const [bookmarked, setBookmarked] = useState(
    post?.bookMarks?.includes(user?._id) || false
  );
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [postLike, setPostLike] = useState(post?.likes?.length || 0);
  const [comment, setComment] = useState(post?.comments || []);

  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [following, setFollowed] = useState(
    user.following?.includes(post?.author?._id)
  );

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/post/delete/${post?._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedPosts = posts.filter(
          (postItem) => postItem._id !== post?._id
        );
        dispatch(setPosts(updatedPosts));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message || "An error occured");
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(`${BASE_URL}/post/${post?._id}/${action}`, {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);
        // updating post like /dislike
        const updatedePostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedePostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message || "An error occured");
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/post/${post._id}/addComment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);
        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );
        // updating the post with the new comment
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message || "An error occured");
    }
  };
  const handleTextChange = (e) => {
    const { value } = e.target;
    if (value.trim()) {
      setText(value);
    } else {
      setText("");
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/post/${post?._id}/bookmark`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setBookmarked(!bookmarked);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message || "An error occured");
    }
  };
  const FollowOrUnFollow = async (id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/user/followOrUnfollow/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setFollowed(!following);
        // const updatedPosts = posts.map((p) => {
        //   if (p.author._id === id) {
        //     const followersData = [...p.author.followers, res.data.following];
        //     return {
        //       ...p,
        //       followers: followed
        //         ? p.author.followers.filter((id) => id !== user._id)
        //         : [...p.author.followers, user._id],
        //     };
        //   }
        // });
        if (res.data.action == "follow_User") {
          const updatedUserFollowing = [...user.following, id];
          // to Update User Profile to add followers in it
          const updatedUser = {
            ...user,
            following: updatedUserFollowing,
          };
          dispatch(setUserProfile(updatedUser));
          toast.success("Followed User");
        }
        // dispatch(setPosts(updatedPosts));..
        if (res.data.action == "unFollow_User") {
          // to remove the following
          const updatedUserFollowing = user.following.filter((p) => p !== id);
          console.log("updatedUserFollowing to unfollow", updatedUserFollowing);
          const updatedUser = {
            ...user,
            following: updatedUserFollowing,
          };
          dispatch(setUserProfile(updatedUser));
          toast.success("UnFollowed USer");
        }

        // dispatch(setSuggestedUsers(res.data.suggestedUsers));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user && post?.author) {
      setFollowed(user.following?.includes(post?.author?._id));
    }
    // console.log("user following", followed);
  }, [user, post]);
  return (
    <div className="my-8 w-full max-w-sm mx-auto shadow-lg ">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center justify-between gap-3">
          <Avatar className="mx-1">
            <AvatarImage
              src={post?.author?.profilePicture?.url}
              alt="post_image"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center  mb-3">
            <h1>{post?.author?.username}</h1>
            {user?._id === post?.author?._id ? (
              <Badge variant="secondary">Author</Badge>
            ) : (
              <span
                onClick={() => {
                  FollowOrUnFollow(post?.author?._id);
                }}
                className="cursor-pointer text-[#3BADF8] font-bold ml-2"
              >
                {following ? "following" : "follow"}
              </span>
            )}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            {/* {post?.author?._id != user?._id && (
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-bold"
              >
                Unfollow
              </Button>
            )} */}

            <Button variant="ghost" className="cursor-pointer w-fit">
              Add to favorites
            </Button>
            {user && user?._id === post?.author?._id && (
              <Button
                onClick={deletePostHandler}
                variant="ghost"
                className="cursor-pointer w-fit"
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <hr />
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src={post?.image?.url}
        alt="post_image"
      />
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          {liked ? (
            <FaHeart
              size={"24"}
              className="cursor-pointer text-red-600"
              onClick={likeOrDislikeHandler}
            />
          ) : (
            <FaRegHeart
              className="cursor-pointer hover:text-gray-600"
              size={"24"}
              onClick={likeOrDislikeHandler}
            />
          )}
          <MessageCircle
            className="cursor-pointer hover:text-gray-600"
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        {bookmarked ? (
          <BookmarkCheck
            onClick={bookmarkHandler}
            size={"24"}
            className="cursor-pointer hover:text-gray-600"
          />
        ) : (
          <Bookmark
            onClick={bookmarkHandler}
            className="cursor-pointer hover:text-gray-600"
          />
        )}
      </div>
      <span className="font-medium mb-2">{postLike} likes</span>
      <p>
        <span className="font-medium mr-2">{post?.author?.username}</span>
        {post?.caption}
      </p>
      {comment.length > 0 && (
        <span
          className="cursor-pointer text-sm text-gray-400"
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
        >
          View all {comment.length}
        </span>
      )}
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={handleTextChange}
          className="outline-none text-sm w-full"
        />
        {text && (
          <span
            onClick={commentHandler}
            className="text-[#3BADF8] cursor-pointer"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
