// import React from "react";

import { setMessages } from "@/store/slices/chatSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGETRTM = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socketio);
  const { messages } = useSelector((state) => state.chat);
  useEffect(() => {
    socket?.on("new message", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });
    return () => {
      socket?.off("new message");
    };
  }, [socket, messages]);
};

export default useGETRTM;
