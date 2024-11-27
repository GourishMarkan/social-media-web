// import React from "react";
import { setFollowing, setSuggestedUsers } from "@/store/slices/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFollowOrUnfollow = ({ id }) => {
  const dispatch = useDispatch();
  const { suggestedUsers, following } = useSelector((state) => state.auth);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  useEffect(() => {
    const FollowOrUnFollow = async (id) => {
      try {
        const res = await axios.post(
          `${BASE_URL}/user/${id}/followOrUnfollow`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setFollowing(res.data.following));
          dispatch(setSuggestedUsers(res.data.suggestedUsers));
        }
      } catch (error) {
        console.log(error);
      }
    };
    FollowOrUnFollow(id);
  }, [following, suggestedUsers]);
};

export default useFollowOrUnfollow;
