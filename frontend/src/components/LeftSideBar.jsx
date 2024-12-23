import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/store/slices/userSlice";
import CreatePost from "./CreatePost";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { clearLikeNotifications } from "../store/slices/rtnSlice";
import { FaRegPlusSquare } from "react-icons/fa";
import AddStory from "./AddStory";
const LeftSideBar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { likeNotifications, messageNotifications } = useSelector(
    (state) => state.realTimeNotifications
  );
  // console.log("likeNotifications", likeNotifications);
  // console.log("clearLIkeNotifications", clearLikeNotifications);
  console.log("messageNotifications", messageNotifications);
  const [open, setOpen] = useState(false);
  const [addStoryOpen, setAddStoryOpen] = useState(false);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const [isPopOverOpen, setPopOverOpen] = useState(false);
  console.log("isPopOverOpen", isPopOverOpen);
  const handlePopOverOpenChange = (open) => {
    console.log(open);
    setPopOverOpen(open);
    if (open) {
      console.log("popover is open");
      clearNotifications();
    }
  };
  const clearNotifications = () => {
    console.log("clearing notifications");
    dispatch(clearLikeNotifications());
  };
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/logout`, {
        withCredentials: true,
      });
      // console.log(res);
      if (res.data.success) {
        dispatch(setAuthUser(null));
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res?.data?.message || "An error occured");
    }
  };

  const sidebarHandler = (textType) => {
    console.log(textType);
    if (textType === "Logout") {
      logoutHandler();
    }
    // if (textType === "Home") navigate("/");
    // if (textType === "Search") navigate("/search");
    // if (textType === "Explore") navigate("/explore");
    else if (textType === "Create") {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Messages") {
      navigate("/chat");
    } else if (textType === "Story") {
      setAddStoryOpen(true);
    }
  };
  const sidebarItems = [
    {
      icons: <Home />,
      text: "Home",
    },
    {
      icons: <Search />,
      text: "Search",
    },
    {
      // icons: <GoPlusCircle className="" />,
      icons: <FaRegPlusSquare className="h-6 w-6" />,
      text: "Story",
    },
    {
      icons: <TrendingUp />,
      text: "Explore",
    },
    {
      icons: <MessageCircle />,
      text: "Messages",
    },
    {
      icons: <Heart />,
      text: "Notifications",
    },
    {
      icons: <PlusSquare />,
      text: "Create",
    },
    {
      icons: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="@shadcn" />
          <AvatarFallback>{user?.username.slice(0, 1) || "CN"}</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },

    { icons: <LogOut />, text: "Logout" },
  ];
  return (
    <div className="fixed top-0 left-0 z-10 px-4 border-r border-gray-300 w-1/6 h-screen md:1/4">
      <div className="flex flex-col ">
        <h1 className="my-8 pl-3 font-bold text-xl ">LOGO</h1>
        <div>
          {sidebarItems.map((item, index) => {
            return (
              <div
                className="flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3"
                key={index}
                onClick={() => sidebarHandler(item.text)}
              >
                {item.icons}
                <span className="hidden md:block">{item.text}</span>
                {item.text === "Notifications" &&
                  likeNotifications?.length > 0 && (
                    <Popover onOpenChange={handlePopOverOpenChange}>
                      <PopoverTrigger>
                        <Button
                          size="icon"
                          className="rounded-full h-5 w-5 bg-red-600 hover:bg--red-700 absolute bottom-6 left-6"
                        >
                          {likeNotifications.length}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div>
                          {likeNotifications?.length === 0 ? (
                            <p>No new notification </p>
                          ) : (
                            likeNotifications.map((notification, index) => {
                              return (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 my-2"
                                >
                                  <Avatar>
                                    <AvatarImage
                                      src={
                                        notification?.userDetails
                                          ?.profilePicture?.url
                                      }
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                  <p className="text-sm">
                                    <span className="text-bold">
                                      {notification?.userDetails?.username}
                                    </span>
                                    liked your post
                                  </p>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                {item.text === "Messages" &&
                  messageNotifications?.length > 0 && (
                    <Button type="icon">{messageNotifications?.length}</Button>
                  )}
              </div>
            );
          })}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
      <AddStory open={addStoryOpen} setOpen={setAddStoryOpen} />
    </div>
  );
};

export default LeftSideBar;
