import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { Button } from "../components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/slices/userSlice";
const Login = () => {
  const [userDetails, setUserDetails] = React.useState({
    password: "",
    email: "",
  });
  const [loading, setLoading] = React.useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(process.env.BASE_URL);
    setUserDetails({ ...userDetails, [name]: value });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const BASE_URL = {process.env.REACT_APP_BASE_URL};
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails);
    const formData = new FormData();

    formData.append("email", userDetails.email);
    formData.append("password", userDetails.password);

    console.log(formData);
    // setLoading(true);
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/user/login`, formData, {
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        console.log(res.data.message);
        toast.success(res.data.message);
        setLoading(false);
        navigate("/");
        setUserDetails({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.res.data.message || "An error occured");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen ">
      <form
        onSubmit={handleSubmit}
        action=""
        className="shadow-lg flex flex-col gap-5 p-8"
      >
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">LOGO</h1>
          <p className="text-sm text-center">
            Login to see photos & videos from your friends
          </p>
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
        {loading ? (
          <Button>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Loading...
          </Button>
        ) : (
          <Button type="submit">Login</Button>
        )}
        {/* <Link to={"/signup"} className="underline bg-slate-400">
          Don't have account, create One
        </Link> */}
        <span className="text-center">
          Do not have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            SignUp
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
