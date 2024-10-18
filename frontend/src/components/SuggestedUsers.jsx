import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((state) => state.auth);
  return (
    <div className="my-10">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-meduim cursor-pointer">See All</span>
      </div>
      {suggestedUsers.map((user) => {
        return (
          <div
            key={user?._id}
            className="flex items-center justify-between my-5 gap-2"
          >
            <div className="flex items-center gap-2">
              <Link to={`/profile/${user?._id}`}>
                <Avatar>
                  <AvatarImage
                    src={user?.profilePicture?.url}
                    alt="profilePic"
                  />
                  <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h1 className="font-semibold text-sm mb-4">
                  <Link to={`/profile/${user._id}`}>{user?.username}</Link>
                </h1>
              </div>
            </div>
            <span className="font-bold text-[#3BADF8] text-xs cursor-pointer hover:text-[#3495d6] mb-3">
              Follow
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
