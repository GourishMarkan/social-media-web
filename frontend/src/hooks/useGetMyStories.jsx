import { setMyStories } from "@/store/slices/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetMyStories = () => {
  const { user } = useSelector((state) => state.auth);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyStories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/story/myStories`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setMyStories(res.data.stories));
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, [setMyStories]);
};

export default useGetMyStories;
