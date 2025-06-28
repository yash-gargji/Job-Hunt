import React, { useState } from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const id = job?._id;
  const isJobSaved = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    return savedJobs.some((saved) => saved._id === job._id);
  };

  const [isAlreadySaved, setIsAlreadySaved] = useState(isJobSaved());

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const saveJobToLocalStorage = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    if (!savedJobs.some((saved) => saved._id === job._id)) {
      savedJobs.push(job);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      setIsAlreadySaved(true);
    }
  };

  const unsaveJobFromLocalStorage = () => {
    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    savedJobs = savedJobs.filter((saved) => saved._id !== job._id);
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    setIsAlreadySaved(false);
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={saveJobToLocalStorage}
          aria-label="Save job"
          disabled={isAlreadySaved}
        >
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo || "/altCompany.avif"} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center space-x-2 mt-4 mb-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-auto">
        <Button
          onClick={() => navigate(`/description/${id}`)}
          className="bg-green-100 text-green-700 hover:bg-green-200 border border-green-200"
        >
          Apply
        </Button>
        {isAlreadySaved ? (
          <Button className="bg-sky-700" onClick={unsaveJobFromLocalStorage}>
            Unsave
          </Button>
        ) : (
          <Button className="bg-sky-600" onClick={saveJobToLocalStorage}>
            Save For Later
          </Button>
        )}
      </div>
    </div>
  );
};

export default Job;
