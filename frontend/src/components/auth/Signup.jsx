import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiLock, FiImage, FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants.js";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice.js";

const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const passwordRegex = /^.{6,}$/;
const roleRegex = /^(student|recruiter)$/;

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.fullname) {
      toast.error("Full name is required");
      return;
    }
    if (!nameRegex.test(input.fullname)) {
      toast.error("Name should only contain letters and spaces");
      return;
    }
    if (!input.email) {
      toast.error("Email is required");
      return;
    }
    if (!emailRegex.test(input.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!input.phoneNumber) {
      toast.error("Phone number is required");
      return;
    }
    if (!phoneRegex.test(input.phoneNumber)) {
      toast.error("Phone number must be 10 digits");
      return;
    }
    if (!input.password) {
      toast.error("Password is required");
      return;
    }
    if (!passwordRegex.test(input.password)) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (!input.role) {
      toast.error("Role is required");
      return;
    }
    if (!roleRegex.test(input.role)) {
      toast.error("Role must be either student or recruiter");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <form
          className="w-full max-w-md bg-white/90 shadow-2xl rounded-3xl p-8 space-y-5 border border-indigo-100 animate-fadeIn"
          onSubmit={submitHandler}
        >
          <h1 className="font-extrabold text-3xl text-indigo-700 text-center mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-indigo-500 to-blue-400 bg-clip-text text-transparent">
              Sign Up
            </span>
          </h1>
          <p className="text-center text-gray-500 mb-3">
            Join our community and unlock new opportunities!
          </p>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
            <Input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 transition"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
            />
          </div>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
            <Input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 transition"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
            <Input
              type="text"
              placeholder="Phone Number"
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 transition"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 transition"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div>
            <Label className="block mb-1 text-sm text-gray-700 font-semibold">
              Role
            </Label>
            <RadioGroup
              value={input.role}
              onValueChange={(value) =>
                setInput((prev) => ({ ...prev, role: value }))
              }
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="text-gray-600 text-sm">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recruiter" id="recruiter" />
                <Label htmlFor="recruiter" className="text-gray-600 text-sm">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="relative">
            <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
            <Input
              accept="image/*"
              type="file"
              className="block w-full pl-10 text-sm py-2 rounded-xl border border-gray-200 bg-gray-50 file:bg-indigo-50 file:text-indigo-700 file:rounded-lg file:py-2 file:px-4"
              onChange={changeFileHandler}
            />
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}
          <div className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
