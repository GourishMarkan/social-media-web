import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useGetUserProfile from "@/hooks/useGetUserProfile";
// import { AvatarFallback } from "@radix-ui/react-avatar";
import { AtSign } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  useGetUserProfile({ id });
  const [activeTab, setActiveTab] = useState("Posts");
  const { userProfile, user } = useSelector((store) => store.auth);
  const isLoggedInUserProfile = user?.id === userProfile?._id;
  const isFollowing = userProfile?.followers?.includes(user?._id) || false; //
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;
  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            <Avatar className="h-32 w-32 bg-blue-500">
              <AvatarImage
                src={userProfile?.profilePicture.url}
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
                <p>
                  <span className="font-semibold">
                    {userProfile?.followers.length}
                  </span>
                  followers
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.following.length}
                  </span>
                  following
                </p>
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
                activeTab === "posts" ? "font-bold" : " "
              }`}
              onClick={() => handleTabChange("posts")}
            >
              SAVED
            </span>
            <span className="py-3 cursor-pointer">REELS</span>
            <span className="py-3 cursor-pointer">TAGS</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {/* {
              displayedPost?map()
            } */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
