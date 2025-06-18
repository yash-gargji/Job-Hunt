import React from "react";
import Navbar from "../shared/Navbar.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup } from "../ui/radio-group.jsx";
import { Button } from "../ui/button.jsx";
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiLock, FiImage } from "react-icons/fi";

function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <form className="w-full max-w-md bg-white/90 shadow-2xl rounded-3xl p-8 space-y-5 border border-indigo-100 animate-fadeIn">
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
            />
          </div>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
            <Input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
            <Input
              type="text"
              placeholder="Phone Number"
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
            <Input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-300 transition"
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
                />
                <Label className="text-gray-600 text-sm">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="accent-indigo-600"
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
