import { setStories } from "@/store/slices/storySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllStories = () => {
  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_REACT_BASE_URL;
  useEffect(() => {
    const fetchAllStories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/story/allStories`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setStories(res.data.stories));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllStories();
  }, []);
};

export default useGetAllStories;
