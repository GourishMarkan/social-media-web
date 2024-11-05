import { setUserProfile } from "@/store/slices/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetUserProfile = ({ id }) => {
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  // console.log("userId", id);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/${id}/profile`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUserProfile(res.data.user));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserProfile();
  }, [id]);
};

export default useGetUserProfile;
