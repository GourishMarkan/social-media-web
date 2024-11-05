import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import useGetAllMessage from "@/hooks/useGetAllMessage";
import useGETRTM from "@/hooks/useGETRTM";

const Message = ({ selectedUser }) => {
  useGETRTM();
  useGetAllMessage();
  const { messages } = useSelector((store) => store.chat);
  // console.log(messages.length);
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="overflow-y-auto flex-1 p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center jusitify-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={selectedUser?.profilePicture?.url} />
            <AvatarFallback>
              {selectedUser?.username.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span>{selectedUser?.username}</span>
          <Link to={`/profile/${selectedUser?._id}`}>
            <Button className="h-8 my-2" variant="secondary">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {messages &&
          messages.map((message) => {
            return (
              <div
                key={message._id}
                className={`flex ${
                  message.senderId === user?._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg max-w-xs break-words ${
                    message.senderId === user?._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  } `}
                >
                  {message.message}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Message;
