import { useState } from "react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
// import { DialogTrigger } from "@radix-ui/react-dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import CommentDialog from "./CommentDialog";
const Post = () => {
  const [liked, setLiked] = useState(false);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [postLike, setPostLike] = useState("");
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/post/delete/${post?.id}`, {
        withCredentials: true,
      });
    } catch (error) {
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
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3">
            <h1></h1>
            {}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            {}
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>

            <Button variant="ghost" className="cursor-pointer w-fit">
              Add to favorites
            </Button>
            <Button
              onClick={deletePostHandler}
              variant="ghost"
              className="cursor-pointer w-fit"
            >
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src=""
        alt="post_image"
      />
      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          {liked ? (
            <FaHeart size={"24"} className="cursor-pointer text-red-600" />
          ) : (
            <FaRegHeart
              className="cursor-pointer hover:text-gray-600"
              size={"24"}
            />
          )}
          <MessageCircle
            className="cursor-pointer hover:text-gray-600"
            onClick={() => {
              setOpen(true);
            }}
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="font-medium mb-2"> likes</span>
      <p>
        <span className="font-medium mr-2">username</span>
        caption
      </p>
      {comment.length > 0 && (
        <span
          className="cursor-pointer text-sm text-gray-400"
          onClick={() => {
            setOpen(true);
          }}
        >
          View all {comment.length} comments
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
            // onClick={commentHandler}
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
