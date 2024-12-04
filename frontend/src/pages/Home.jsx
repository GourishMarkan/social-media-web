import { Outlet } from "react-router-dom";
import Feed from "../components/Feed";

import RightSidebar from "@/components/RightSidebar";
import useGetAllPost from "@/hooks/useGetAllPost";

import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import { useEffect } from "react";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { useSelector } from "react-redux";
import useGetAllStories from "@/hooks/useGetAllStories";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const id = user._id;
  useGetAllPost();
  useGetSuggestedUsers();
  useGetUserProfile({ id });
  useGetAllStories();
  return (
    <div className="flex">
      <div className="flex-grow">
        <Feed />
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Home;
