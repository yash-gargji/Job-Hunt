import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { User, LogOut } from "lucide-react";

function Navbar() {
  const user = true;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="w-80 bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-5 border border-gray-100">
                  <div className="relative">
                    <Avatar className="cursor-pointer ring-4 ring-blue-200 ring-offset-2 shadow-lg">
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full shadow"></span>
                  </div>
                  <div className="text-center">
                    <h4 className="font-bold text-xl text-gray-800">
                      Yash Garg
                    </h4>
                    <p className="text-sm text-gray-500 italic">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <Button
                      variant="link"
                      className="flex items-center gap-3 text-base font-medium text-blue-700 hover:bg-blue-100 rounded-lg px-3 py-2 transition-all duration-200"
                    >
                      <User size={20} className="text-blue-500" />
                      View Profile
                    </Button>
                    <Button
                      variant="link"
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
