import { useSelector } from "react-redux";
import Post from "./Post";

const Posts = () => {
  const { posts } = useSelector((state) => state.post);
  return (
    <div>
      {posts.map((post, index) => (
        <Post key={post?._id || index} post={post} />
      ))}
    </div>
  );
};

export default Posts;
