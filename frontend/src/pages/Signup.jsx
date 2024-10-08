import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select } from "../components/ui/select";
import { Button } from "../components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    email: "",
    bio: "",
    gender: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(process.env.BASE_URL);
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleFileChange = (e) => {
    const { file } = e.target;
    setUserDetails({ ...userDetails, profilePicture: file });
  };
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails);
    const formData = new FormData();
    for (const key in userDetails) {
      formData.append(key, userDetails[key]);
    }
    console.log(formData);
    setLoading(true);
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/user/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        console.log(res.data.message);
        toast.success(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.res.data.message || "An error occured");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-l from-slate-500 to-gray-100">
      <form
        onSubmit={handleSubmit}
        action=""
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
            value={userDetails.username}
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
        {/* gender optional */}
        {/* <div className="">
          <Label className="font-meduim" name="gender">
            gender
          </Label>
          <Select value={userDetails.gender}></Select>
        </div> */}
        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Signup</Button>
        )}

        <span className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
