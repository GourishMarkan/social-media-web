import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { useSelector } from "react-redux";
import { readFileAsDataURL } from "@/lib/utils";
import axios from "axios";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { setMyStories } from "@/store/slices/userSlice";

const AddStory = ({ open, setOpen }) => {
  const stroyRef = React.useRef();
  const [file, setFile] = useState("");
  const [storyPreview, setStoryPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const fileHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setStoryPreview(dataUrl);
    }
  };
  const createStoryHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      if (storyPreview) {
        formData.append("image", file);
      }
      const res = await axios.post(
        `${BASE_URL}/user/story/addStory`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setMyStories(res.data.stories);
        setLoading(false);

        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message || "An error occured");
    }
  };
  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogTitle className="text-center font-bold">Add Story</DialogTitle>
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={user?.profilePicture?.url} />
            <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-xs mb-3">{user?.username}</h1>
            <hr />
          </div>
        </div>
        {storyPreview && (
          <div className="flex items-center justify-center w-full h-64 ">
            <img
              src={storyPreview}
              alt="story_preview"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        )}
        <input
          ref={stroyRef}
          type="file"
          onChange={fileHandler}
          className="hidden"
        />
        <Button
          className=" w-fit mx-auto bg-[#0095F6] hover:bg-[#258bcf] "
          onClick={() => stroyRef.current.click()}
        >
          select from computer
        </Button>
        {storyPreview &&
          (loading ? (
            <Button>
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            </Button>
          ) : (
            <Button type="submit" onClick={createStoryHandler}>
              Post
            </Button>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default AddStory;
