import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Avatar, AvatarImage } from "./ui/avatar";
// import { Avatar } from "@radix-ui/react-avatar";

const StoryView = ({
  open,
  setOpen,
  selectedStory,
  prevStory,
  nextStory,
  stories,
}) => {
  // const {stories} = useSelector((state) => state.story);
  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="max-w-xl p-0 flex flex-col overflow-y-auto overflow-x-scroll"
      >
        {selectedStory !== null && (
          <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-4 relative mt-4">
            <div className="flex p-4">
              <Avatar>
                <AvatarImage
                  src={stories[selectedStory]?.author?.profilePicture?.url}
                />
              </Avatar>
              <span className=" ml-1 mt-2 text-gray-600">
                {stories[selectedStory]?.author?.username}
              </span>
            </div>
            <div className=" flex justify-between items-center">
              <Button className="-inset-5" onClick={prevStory}>
                <FaArrowLeft />
              </Button>
              <div className="flex">
                <img
                  src={stories[selectedStory]?.image?.url}
                  className="object-cover w-full h-96"
                />
              </div>
              <button
                onClick={nextStory}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StoryView;
