import React, { useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Label } from "../ui/label.jsx";
import { Input } from "../ui/input.jsx";
import { RadioGroup } from "../ui/radio-group.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading ,setUser} from "@/redux/authSlice.js";
import { Loader2 } from "lucide-react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading} = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);
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
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white/90 shadow-2xl rounded-3xl p-8 space-y-5 border border-indigo-100 animate-fadeIn"
        >
          <h1 className="font-extrabold text-3xl text-indigo-700 text-center mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-indigo-500 to-blue-400 bg-clip-text text-transparent">
              Login
            </span>
          </h1>
          <p className="text-center text-gray-500 mb-3">
            Welcome back! Please login to your account.
          </p>
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
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}
          <div className="text-center text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
