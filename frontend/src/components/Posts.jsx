import { useSelector } from "react-redux";
import Post from "./Post";

const Posts = () => {
  const { posts } = useSelector((state) => state.post);
  console.log("posts are", posts);
  return (
    <div>
      {Array.isArray(posts) &&
        posts?.map((post, index) => (
          <Post key={post?._id || index} post={post} />
        ))}
    </div>
  );
};

export default Posts;
