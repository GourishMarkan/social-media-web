import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import SuggestedUsers from "./SuggestedUsers";

const RightSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-10 md:w-fit my-10 pr-32">
      <div className="flex items-center gap-2">
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture?.url} alt="postImage" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className="font-semibold text-sm mb-4">
            <Link to={"profile/${user._id}"}>{user?.username}</Link>
            {/* <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span> */}
          </h1>
        </div>
      </div>
      <SuggestedUsers />
    </div>
  );
};

export default RightSidebar;
