import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setPosts } from "@/store/slices/postSlice";
import { setUserProfile } from "@/store/slices/userSlice";
const useGetAllPost = () => {
  const dispatch = useDispatch();

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/post/allPosts`, {
          withCredentials: true,
        });

        if (res.data.success) {
          console.log(res.data.posts);
          dispatch(setPosts(res.data.posts));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPost();
  }, [setUserProfile]);
};

export default useGetAllPost;
