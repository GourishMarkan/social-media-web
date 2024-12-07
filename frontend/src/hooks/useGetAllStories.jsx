import { setCount, setStories } from "@/store/slices/storySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllStories = () => {
  const dispatch = useDispatch();
  // const BASE_URL = import.meta.env.VITE_REACT_BASE_URL;

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  useEffect(() => {
    const fetchAllStories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/story/allStories`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setStories(res.data.stories));
          dispatch(setCount(res.data.count));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllStories();
  }, [setStories, setCount]);
};

export default useGetAllStories;
