import { Outlet } from "react-router-dom";
import Feed from "../components/Feed";

import RightSidebar from "@/components/RightSidebar";
import useGetAllPost from "@/hooks/useGetAllPost";

const Home = () => {
  useGetAllPost();
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
