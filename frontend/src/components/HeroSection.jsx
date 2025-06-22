import React from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

function HeroSection() {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
      <span className="block mx-auto px-6 py-2 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-blue-600 text-white font-semibold shadow text-center tracking-wide">
  No. 1 Job Hunt Website
</span>

        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-sky-500">Dream Jobs</span>
        </h1>
        <p class="highlighted-message">
          Start your journey with us—search for jobs and apply in just a few
          clicks!
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream jobs"
            // onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button className="rounded-r-full bg-sky-500 hover:bg-sky-600 text-white">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
