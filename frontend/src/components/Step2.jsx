// import React from "react";
import { useRef } from "react";

import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";

import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Step2 = ({
  prevStep,
  userDetails,
  handleInputChange,
  handleFileChange,
  selectChangeHandler,
  handleSubmit,
  loading,
}) => {
  const imageRef = useRef();
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-l from-slate-500 to-gray-100">
      <div
        // onSubmit={handleSubmit}
        // action=""
        className="shadow-2xl flex flex-col gap-5 p-8 bg-slate-100"
      >
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className="text-sm text-center">
            Signup to see photos & videos from your friends
          </p>
        </div>

        <div className="">
          <Label className="font-meduim" name="bio">
            bio
          </Label>
          <Textarea
            name="bio"
            value={userDetails.bio}
            onChange={handleInputChange}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div className=" flex flex-col mb-1">
          <Label htmlFor="profilePicture" className="font-meduim ">
            ProfilePic
          </Label>
          <input
            ref={imageRef}
            className="hidden"
            type="file"
            onChange={handleFileChange}
          />
          <Button
            onClick={() => imageRef?.current.click()}
            variant="secondary"
            className="bg-black text-white"
          >
            Upload Picture
          </Button>
        </div>
        {/* gender optional */}
        <div className="">
          <Label className="font-meduim" name="gender">
            gender
          </Label>
          <Select
            defaultValue={userDetails.gender}
            onValueChange={selectChangeHandler}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between ">
          <Button onClick={prevStep}>Previous Step</Button>
          {loading ? (
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" onClick={handleSubmit}>
              Signup
            </Button>
          )}
        </div>
        <span className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Step2;
