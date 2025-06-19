import React, { useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup } from "../ui/radio-group.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiLock, FiImage } from "react-icons/fi";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants.js";
import { toast } from "sonner";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
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
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

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
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 transition"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label className="block mb-1 text-sm text-gray-700 font-semibold">
              Role
            </Label>
            <RadioGroup className="flex gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="accent-indigo-600"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />
                <Label className="text-gray-600 text-sm">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="accent-indigo-600"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label className="text-gray-600 text-sm">Recruiter</Label>
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
          <Button
            type="submit"
            className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 hover:from-indigo-600 hover:to-blue-600 transition-all duration-200"
          >
            Sign Up
          </Button>
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
