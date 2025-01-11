import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { Button } from "./ui/button";

import { Link } from "react-router-dom";

const StepOne = ({ nextStep, userDetails, handleInputChange }) => {
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
          <Label className="font-meduim" name="username">
            Username
          </Label>
          <Input
            type="text"
            name="username"
            value={userDetails?.username}
            onChange={handleInputChange}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div className="">
          <Label className="font-meduim" name="password">
            password
          </Label>
          <Input
            type="password"
            name="password"
            value={userDetails.password}
            onChange={handleInputChange}
            className="focus-visible:ring-transparent my-2"
          />
        </div>
        <div className="">
          <Label className="font-meduim" name="email">
            email
          </Label>
          <Input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            className="focus-visible:ring-transparent my-2"
          />
        </div>

        <Button onClick={nextStep}>Next</Button>
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

export default StepOne;
