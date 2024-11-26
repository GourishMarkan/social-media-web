import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import StepOne from "@/components/StepOne";
import Step2 from "@/components/Step2";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    email: "",
    bio: "",
    gender: "",
    profilePicture: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(process.env.BASE_URL);
    setUserDetails({ ...userDetails, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setUserDetails({ ...userDetails, profilePicture: file });
  };
  const selectChangeHandler = (value) => {
    setUserDetails({ ...userDetails, gender: value });
  };
  const navigate = useNavigate();
  const imageRef = useRef();
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
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  const nextStep = () => {
    if (currentStep == 1) {
      if (
        userDetails.username == "" ||
        userDetails.password == "" ||
        userDetails.email == ""
      ) {
        toast.error("Please fill all fields");
        return;
      }
      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            nextStep={nextStep}
            userDetails={userDetails}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <Step2
            nextStep={nextStep}
            prevStep={prevStep}
            userDetails={userDetails}
            handleInputChange={handleInputChange}
            selectChangeHandler={selectChangeHandler}
            loading={loading}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
          />
        );
    }
  };
  return (
    <div>{renderStep()}</div>
    
  );
};

export default Signup;
