import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
// import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MoreHorizontal, Search } from "lucide-react";
import { Button } from "./ui/button";
// import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const AllFollowingData = ({ open, setOpen, id }) => {
  const [followingUser, setFollowingData] = useState([]);
  //   {
  //     username: "",
  //     profilePic: {
  //       public_id: "",
  //       url: "",
  //     },
  //     _id: "",
  //   },
  // ]);
  const handleFollowingData = (data) => {
    setFollowingData(data);
  };
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  // const { user } = useSelector((state) => state.auth);
  const fetchAllFollowingData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/myFollowing/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        handleFollowingData(res.data.user);
        toast.success("Following data fetched successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch following data");
    }
  };

  const [input, setInput] = useState("");
  useEffect(() => {
    if (open) fetchAllFollowingData();
  }, [open]);
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-xl p-0 flex flex-col overflow-y-auto overflow-x-scroll"
      >
        <div className="flex flex-1">
          <div className="w-full flex flex-col justify-between">
            <div className="p-4">
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="search a user ... "
                  className="w-full rounded outline-none border text-sm p-2 border-gray-300  "
                />
                <Button
                  // disabled={!text.trim()}
                  // onClick={sendMessageHandler}
                  variant="outline"
                >
                  <Search />
                </Button>
              </div>
            </div>
            <hr />
            <div className="">
              {followingUser.map((user, index) => (
                <div
                  className="flex  items-center justify-between gap-2 p-4"
                  key={user._id || index}
                >
                  {/* <img src={user.profilePicture.url} alt="" /> */}
                  <div className="flex gap-1 items-center">
                    <Avatar>
                      <AvatarImage
                        src={user.profilePicture.url}
                        alt="post_image"
                      />
                      <AvatarFallback>
                        {user.username.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <h4>{user.username}</h4>
                  </div>
                  {/* <Dialog open={open} onOpenChange={handleChildDialogClose}> */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        // onClick={() => setChildDialogOpen(true)}
                      >
                        Following
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      // onInteractOutside={() => setChildDialogOpen(false)}
                      className="flex flex-col items-center text-sm text-center"
                    >
                      <div className="cursor-pointer flex justify-center">
                        <Button variant="outline">Unfollow</Button>
                      </div>
                      <div className="cursor-pointer flex justify-center">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllFollowingData;
