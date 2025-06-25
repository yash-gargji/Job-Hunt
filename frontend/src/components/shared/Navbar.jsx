import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { User, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { setUser } from "@/redux/authSlice";

function Navbar() {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if ((await res).data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success("logged out successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-slate-800">Job</span>
            <span className="text-sky-500">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <NavLink
                    to="/admin/companies"
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "text-black font-bold transition-colors"
                        : "text-gray-700 hover:text-black transition-colors"
                    }
                  >
                    Companies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/jobs"
                    className={({ isActive }) =>
                      isActive
                        ? "text-black font-bold transition-colors"
                        : "text-gray-700 hover:text-black transition-colors"
                    }
                  >
                    Jobs
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "text-black font-bold transition-colors"
                        : "text-gray-700 hover:text-black transition-colors"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/jobs"
                    className={({ isActive }) =>
                      isActive
                        ? "text-black font-bold transition-colors"
                        : "text-gray-700 hover:text-black transition-colors"
                    }
                  >
                    Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/browse"
                    className={({ isActive }) =>
                      isActive
                        ? "text-black font-bold transition-colors"
                        : "text-gray-700 hover:text-black transition-colors"
                    }
                  >
                    Browse
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "/altProfile.jpg"}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="w-80 bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-5 border border-gray-100">
                  <div className="relative">
                    <Avatar className="cursor-pointer ring-4 ring-blue-200 ring-offset-2 shadow-lg">
                      <AvatarImage
                        src={user?.profile?.profilePhoto || "/altProfile.jpg"}
                      />
                    </Avatar>
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow"></span>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-xl text-gray-800">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-500 italic">{user?.bio}</p>
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                     {
                       user && user.role == "student" ?  <Button
                      variant="outline"
                      className="flex items-center gap-3 text-base font-medium text-blue-700 hover:bg-blue-100 rounded-lg px-3 py-2 transition-all duration-200"
                    >
                      <User size={20} className="text-blue-500" />
                      <Link to="/profile">View Profile</Link>
                    </Button> : 
                      <></>
                     }
                    <Button
                      onClick={logoutHandler}
                      variant="outline"
                      className="flex items-center gap-3 text-base font-medium text-red-600 hover:bg-red-100 rounded-lg px-3 py-2 transition-all duration-200"
                    >
                      <LogOut size={20} className="text-red-500" />
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
