import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";

const AllFollowingData = ({ open, setOpen }) => {
  const { followingData, setFollowingData } = useState([
    {
      username: "",
      profilePic: "",
      _id: "",
    },
  ]);
  useEffect(() => {
    const getFollowingData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/getMyFollowing`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setFollowingData(res.data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFollowingData();
  }, []);
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-5xl p-0 flex flex-col "
      >
        <div className="flex flex-1">
          <div className="w-full flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                {/* link to my profile */}
                <Link>
                  <Avatar>
                    <AvatarImage
                      // src={selectedPost?.author?.profilePicture?.url}
                      alt="post_image"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="">
                  <Link className="font-semibold text-xs">
                    {selectedPost?.author?.username}
                  </Link>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className="flex flex-col items-center text-sm text-ceneter">
                    <div className="cursor-pointer w-full font-bold text-[#ED4956]">
                      Unfollow
                    </div>
                  </div>
                  <div className="cursor-pointer w-full ">Add to favorites</div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            {/* <div className="flex-1 overflow-y-auto max-h-96 p-4">
            comments
            {comment.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
            comments
          </div> */}
            <div className="p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={changeEventHandler}
                  placeholder="Add a comment ... "
                  className="w-full rounded outline-none border text-sm p-2 border-gray-300  "
                />
                <Button
                  disabled={!text.trim()}
                  onClick={sendMessageHandler}
                  variant="outline"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllFollowingData;

// <div>
//   {followingData.map((user, index) => (
//     <div key={user._id || index}>
//       <img src={user.profilePic} alt="" />
//       <h4>{user.username}</h4>
//     </div>
//   ))}
// </div>
