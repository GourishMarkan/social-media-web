import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
// import { setSelectedUser } from "@/store/slices/userSlice";
import { MessageCircleCode } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setSelectedUser } from "@/store/slices/userSlice";
import Message from "@/components/Message";
import { toast } from "react-toastify";
import axios from "axios";
import { setMessages } from "@/store/slices/chatSlice";
const ChatPage = () => {
  const [message, setMessage] = useState("");
  const { user, suggestedUsers, selectedUser } = useSelector(
    (state) => state.auth
  );
  const { onlineUsers, messages } = useSelector((state) => state.chat);
  // console.log(
  //   "selected user is and online users are ",
  //   selectedUser,
  //   onlineUsers
  // );
  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/message/send/${receiverId}`,
        { message },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setMessage("");
      }
    } catch (error) {
      console.log("error in sending message", error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    // unmounting
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);
  return (
    <div className="flex ml-[16.7%] h-screen">
      <section className="w-full md:w-1/4 my-8">
        <h1 className="font-bold mb-4 px-3 text-xl">{user?.username}</h1>
        <hr className="mb-4 border-gray-300" />
        <div className="overflow-y-auto h-[80vh]">
          {suggestedUsers.map((suggestedUser) => {
            const isOnline = onlineUsers.includes(suggestedUser._id);
            return (
              <div
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                className="flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer"
                key={suggestedUser._id}
              >
                <Avatar className="w-14 h-14">
                  <AvatarImage src={suggestedUser?.profilePicture?.url} />
                  <AvatarFallback>
                    {suggestedUser?.username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-black">
                    {suggestedUser?.username}
                  </span>
                  <span
                    className={` text-xs font-bold ${
                      isOnline ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isOnline ? "online" : "offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {selectedUser ? (
        <section className="flex-1 border-l border-l-gray-300 my-5 flex flex-col h-full">
          <div className="flex gap-3 items-center px-3 py-2 border-b border-b-gray-300 sticky top-0 bg-white z-10">
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture?.url} />
              <AvatarFallback>
                {selectedUser?.username?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>{selectedUser?.username}</span>
            </div>
          </div>
          {/* message  */}
          <Message selectedUser={selectedUser} />
          <div className="flex items-center p-4 border-t border-t-gray-300 ">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type a message..."
              className="flex-1 mr-2 focus-visible:ring-transparent"
            />
            <Button onClick={() => sendMessageHandler(selectedUser?._id)}>
              Send
            </Button>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto">
          <MessageCircleCode className="w-32 h-32 my-4" />
          <h1 className="font-medium">Your Message</h1>
          <span>Send a message to start a chat.</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
