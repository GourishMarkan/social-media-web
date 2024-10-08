import LeftSideBar from "@/components/LeftSideBar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <LeftSideBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
