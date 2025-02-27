import AllFollowingData from "@/components/AllFollowingData";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useGetUserProfile from "@/hooks/useGetUserProfile";
// import { AvatarFallback } from "@radix-ui/react-avatar";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import AllFollowersData from "@/components/AllFollowersData";

const Profile = () => {
  const { id } = useParams();
  useGetUserProfile({ id });
  const [activeTab, setActiveTab] = useState("posts");
  const [open, setOpen] = useState(false);
  const [openFollower, setOpenFollower] = useState(false);
  const { userProfile, user } = useSelector((store) => store.auth);
  console.log(userProfile);
  const isLoggedInUserProfile = user?._id === userProfile?._id;
  console.log(isLoggedInUserProfile);
  const isFollowing = userProfile?.followers?.includes(user?._id) || false; //
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  // const navigate = useNavigate();
  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookMarks;
  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            <Avatar className="h-32 w-32 bg-blue-500">
              <AvatarImage
                src={userProfile?.profilePicture?.url}
                alt="profilePicture"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span>{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-8"
                      >
                        Edit profile
                      </Button>
                    </Link>
                    <Button variant="secondary" className="h-8">
                      View archive
                    </Button>
                    <Button variant="secondary" className="h-8">
                      Ad tools
                    </Button>
                  </>
                ) : isFollowing ? (
                  <>
                    <Button variant="secondary" className="h-8">
                      Unfollow
                    </Button>
                    <Button variant="secondary" className="h-8">
                      Message
                    </Button>
                  </>
                ) : (
                  <Button variant="secondary" className="h-8">
                    Follow
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p>
                  <span className="font-semibold">
                    {userProfile?.posts.length}
                  </span>
                  posts
                </p>
                <p onClick={() => setOpenFollower(true)}>
                  <span className="font-semibold mr-1">
                    {userProfile?.followers.length}
                  </span>
                  followers
                </p>
                <AllFollowersData
                  open={openFollower}
                  setOpen={setOpenFollower}
                  id={id}
                />
                <p onClick={() => setOpen(true)}>
                  {/* <Link to="/profile/Following"> */}
                  <span className="font-semibold mr-1">
                    {userProfile?.following.length}
                  </span>
                  following
                  {/* </Link> */}
                </p>
                <AllFollowingData open={open} setOpen={setOpen} id={id} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">
                  {userProfile?.bio || "bio here ...."}
                </span>
                {/* <Badge variant="secondary" className="w-fit">
                  <AtSign />
                  <span className="pl-1">{userProfile?.username}</span>
                </Badge> */}
              </div>
            </div>
          </section>
        </div>
        <div className="border-t border-t-gray-200">
          <div className="flex items-center justify-center gap-10 text-sm">
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "posts" ? "font-bold" : " "
              }`}
              onClick={() => handleTabChange("posts")}
            >
              POSTS
            </span>
            <span
              className={`py-3 cursor-pointer ${
                activeTab === "saved" ? "font-bold" : " "
              }`}
              onClick={() => handleTabChange("saved")}
            >
              SAVED
            </span>
            <span className="py-3 cursor-pointer">REELS</span>
            <span className="py-3 cursor-pointer">TAGS</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {displayedPost?.map((post) => {
              return (
                <div
                  className="relative shadow-lg mx-4 group cursor-pointer"
                  key={post?._id}
                >
                  <img
                    src={post?.image?.url}
                    alt="postImage"
                    className="rounded-sm my-5 w-full aspect-square object-cover bg-blue-500 left-1 right-1"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-white space-x-4">
                      <button className="flex items gap-2 hover:text-gray-300">
                        <Heart />
                        <span>{post?.likes.length}</span>
                      </button>
                      <button className="flex items gap-2 hover:text-gray-300">
                        <MessageCircle />
                        <span>{post?.comments.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <AllFollowingData open={open} setOpen={setOpen} /> */}
    </div>
  );
};

export default Profile;
