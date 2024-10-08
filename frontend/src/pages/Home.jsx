import { Outlet } from "react-router-dom";
import Feed from "../components/Feed";
import React from "react";
import RightSidebar from "@/components/RightSidebar";

const Home = () => {
  return (
    <div className="flex">
      <div className="flex-grow">
        <Feed />
        <Outlet />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
