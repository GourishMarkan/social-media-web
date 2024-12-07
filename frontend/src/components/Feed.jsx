// import React from "react";
// import Post from "./Post";
import AllStories from "./AllStories";
import Posts from "./Posts";

const Feed = () => {
  return (
    <div className="flex-1 my-8 flex flex-col items-center pl-[20%]">
      {/* <div className="flex"> */}
      <AllStories />
      {/* </div> */}
      <Posts />
    </div>
  );
};

export default Feed;
