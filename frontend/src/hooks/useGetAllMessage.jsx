import { setMessages } from "@/store/slices/chatSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.auth);
  // console.log("selected user from useGetAllMessage", selectedUser);
  // console.log("selected user from useGetAllMessage", selectedUser);
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  useEffect(() => {
    const receiverId = selectedUser?._id;
    const fetchAllMessage = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/message/all/${receiverId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setMessages(res.data.messages));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllMessage();
  }, [selectedUser]);
};

export default useGetAllMessage;
