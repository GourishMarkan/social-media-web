// import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { useEffect, useState } from "react";
import { setUserProfile } from "@/store/slices/userSlice";
import { toast } from "react-toastify";

const SuggestedUser = ({ suggestedUser }) => {
  const { user } = useSelector((state) => state.auth);
  const [followed, setFollowed] = useState(
    user?.following?.includes(suggestedUser?._id)
  );
  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  // const followOrUnfollowsuggestedUser = async (id) => {
  //   try {
  //     const res = await axios.post(
  //       `${BASE_URL}/user/followOrUnfollow/${id}`,
  //       {},
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     if (res.data.success) {
  //       setFollowed(!followed);
  //       if (res.data.action == "follow_User") {
  //         const followingData = [...user.following, id];
  //         const updatedUserData = { ...user, following: followingData };
  //         dispatch(setUserProfile(updatedUserData));
  //       }
  //       if (res.data.action == "unfollow_User") {
  //         const followingData = user.following.filter((item) => item != id);
  //         console.log("following data in unfollow req is ", followingData);
  //         const updatedUserData = { ...user, following: followingData };
  //         dispatch(setUserProfile(updatedUserData));
  //       }
  //       // dispatch(setFollowing(res.data.following));
  //       // dispatch(setSuggestedsuggestedUSers(res.data.suggestedsuggestedUSers));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const FollowOrUnFollowSuggestedUser = async (id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/user/followOrUnfollow/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setFollowed(!followed);
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
    if (user) setFollowed(user?.following?.includes(suggestedUser?._id));
  }, [followed]);
  return (
    <div
      key={suggestedUser?._id}
      className="flex items-center justify-between my-5 gap-2"
    >
      <div className="flex items-center gap-2">
        <Link to={`/profile/${suggestedUser?._id}`}>
          <Avatar>
            <AvatarImage
              src={suggestedUser?.profilePicture?.url}
              alt="profilePic"
            />
            <AvatarFallback>
              {suggestedUser?.username.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className="font-semibold text-sm mb-4">
            <Link to={`/profile/${suggestedUser?._id}`}>
              {suggestedUser?.suggestedUsername}
            </Link>
          </h1>
        </div>
      </div>
      <button
        className="font-bold text-[#3BADF8] text-xs cursor-pointer hover:text-[#3495d6] mb-3"
        onClick={() => FollowOrUnFollowSuggestedUser(suggestedUser?._id)}
      >
        {followed ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default SuggestedUser;
