import useGetAllStories from "@/hooks/useGetAllStories";
import useGetMyStories from "@/hooks/useGetMyStories";
import { useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import StoryView from "./StoryView";
// import { AvatarImage } from "@radix-ui/react-avatar";
const AllStories = () => {
  // const
  // const [AllStory, setStories] = React.useState([]);
  // const [myStory, setMyStory] = React.useState([]);
  const { stories } = useSelector((state) => state.story);
  const [selectedStory, setSelectedStory] = useState(null);
  const [open, setOpen] = useState(false);
  const nextStory = () => {
    if (selectedStory !== null) {
      console.log("selected story", selectedStory);
      setSelectedStory((prev) => {
        console.log("prev", prev);
        // prev === stories.length - 1 ? prev : prev + 1;
        if (prev === stories.length - 1) {
          return prev;
        } else {
          return prev + 1;
        }
      });
    }
  };
  const prevStory = () => {
    if (selectedStory !== null) {
      setSelectedStory((prev) => {
        // prev === 0 ?  stories.length - 1 : prev - 1;
        if (prev === 0) {
          return stories.length - 1;
        } else {
          return prev - 1;
        }
      });
    }
  };
  // const { myStory } = useSelector((state) => state.user);
  // const
  // React.useEffect(() => {
  //   setStories(stories);
  //   setMyStory(myStory);
  // }, [AllStory, stories]);
  // useGetMyStories();

  // useGetAllStories();
  // console.log(stories, count);
  // const setting = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: count,
  //   autoplay: true,
  //   autoplaySpeed: 5000,
  // };
  return (
    // <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-md ">
    <div className="flex space-x-4 items-center justify-evenly overflow-x-auto p-4 ">
      {/* <Slider {...setting}> */}
      {stories.map((story, index) => (
        <div key={index} className="flex flex-col items-center">
          <Avatar
            onClick={() => {
              console.log("selected story", index);
              setSelectedStory(index);
              setOpen(true);
            }}
          >
            <AvatarImage
              src={story.image?.url}
              alt="profilePicture"
              // className="rounded-full w-14 h-14"
            />
            <AvatarFallback>{story.author.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="text-sm mt-2">{story.author.username}</span>
        </div>
      ))}
      {/* story viewer */}
      <StoryView
        open={open}
        setOpen={setOpen}
        selectedStory={selectedStory}
        prevStory={prevStory}
        nextStory={nextStory}
        stories={stories}
      />
    </div>
  );
};

export default AllStories;
