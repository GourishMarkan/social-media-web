import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
// import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import { setPosts } from "@/store/slices/postSlice";
import { set } from "zod";
import Comment from "./Comment";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector((state) => state.post);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  useEffect(() => {
    if (selectedPost) setComment(selectedPost.comments);
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const { value } = e.target;
    if (value.trim()) {
      setText(value);
    } else {
      setText("");
    }
  };

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/post/${selectedPost?._id}/addComment`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);
        const updatedPostData = posts.map((p) => {
          p._id === selectedPost._id
            ? { ...p, comments: updatedCommentData }
            : p;
        });
        dispatch(setPosts(updatedPostData));
        setText("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message || "An error occured");
    }
  };
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-5xl p-0 flex flex-col "
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src={selectedPost?.image?.url}
              alt="post_img"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                {/* link to my profile */}
                <Link>
                  <Avatar>
                    <AvatarImage
                      src={selectedPost?.author?.profilePicture?.url}
                      alt="post_image"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="">
                  <Link className="font-semibold text-xs">
                    {selectedPost?.author?.username}
                  </Link>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className="flex flex-col items-center text-sm text-ceneter">
                    <div className="cursor-pointer w-full font-bold text-[#ED4956]">
                      Unfollow
                    </div>
                  </div>
                  <div className="cursor-pointer w-full ">Add to favorites</div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              {/* comments */}
              {comment.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
              comments
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={changeEventHandler}
                  placeholder="Add a comment ... "
                  className="w-full rounded outline-none border text-sm p-2 border-gray-300  "
                />
                <Button
                  disabled={!text.trim()}
                  onClick={sendMessageHandler}
                  variant="outline"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
