import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob, setLoading } from "@/redux/jobSlice";
import { toast } from "sonner";

const fallbackLogo = "/altCompany.avif";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { singleJob, loading } = useSelector((store) => store.job);
    
  const [isApplied, setIsApplied] = useState(false);

  const applyJobHandler = async () => {
    if (!user) {
      toast.error("Login to apply");
      return;
    }
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          
          setIsApplied(
            user
              ? res.data.job.applications.some(
                  (application) => application.applicant === user._id
                )
              : false
          );
          console.log(res.data.job);
          console.log(user);
          
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <div className="bg-gradient-to-r from-[#eaf2fb] to-[#f4e9fa] rounded-2xl shadow-lg p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={singleJob?.company?.logo || fallbackLogo}
                alt={singleJob?.company?.name || "Company Logo"}
                className="object-contain"
              />
              <AvatarFallback>
                {singleJob?.company?.name
                  ? singleJob.company.name[0]?.toUpperCase()
                  : "C"}
              </AvatarFallback>
            </Avatar>
            <span className="text-lg font-semibold text-gray-800">
              {singleJob?.company?.name}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            {singleJob?.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className="bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full" variant="ghost">
              Position
            </Badge>
            <Badge className="bg-red-100 text-[#F83002] font-semibold px-3 py-1 rounded-full" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-purple-100 text-[#7209b7] font-semibold px-3 py-1 rounded-full" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
            <Badge className="bg-gray-100 text-gray-700 font-semibold px-3 py-1 rounded-full" variant="ghost">
              {singleJob?.location}
            </Badge>
          </div>
        </div>
        <div className="flex justify-end items-center w-full md:w-auto">
          <Button
            onClick={isApplied || loading ? null : applyJobHandler}
            disabled={isApplied || loading}
            className={`w-48 h-12 text-lg rounded-full shadow-md transition-all duration-200 ${
              isApplied
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-[#3b82f6] to-[#6366f1] hover:from-[#2563eb] hover:to-[#7c3aed] text-white"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : null}
            {isApplied
              ? "Already Applied"
              : loading
              ? "Applying..."
              : "Apply Now"}
          </Button>
        </div>
      </div>

      <section className="bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold mb-6 border-b pb-3 text-sky-700">
          Job Details
        </h2>
        <div className="grid gap-5 md:grid-cols-2 text-gray-800">
          <div>
            <span className="block text-sm font-semibold text-gray-500">
              Role
            </span>
            <span className="text-lg">{singleJob?.title}</span>
          </div>
          <div>
            <span className="block text-sm font-semibold text-gray-500">
              Location
            </span>
            <span className="text-lg">{singleJob?.location}</span>
          </div>
          <div className="md:col-span-2">
            <span className="block text-sm font-semibold text-gray-500">
              Description
            </span>
            <span className="text-lg">{singleJob?.description}</span>
          </div>
          <div>
            <span className="block text-sm font-semibold text-gray-500">
              Experience
            </span>
            <span className="text-lg">
              {singleJob?.experience == null ? 0 : singleJob?.experience} yrs
            </span>
          </div>
          <div>
            <span className="block text-sm font-semibold text-gray-500">
              Salary
            </span>
            <span className="text-lg">{singleJob?.salary} LPA</span>
          </div>
          <div>
            <span className="block text-sm font-semibold text-gray-500">
              Total Applicants
            </span>
            <span className="text-lg">{singleJob?.applications?.length}</span>
          </div>
          <div>
            <span className="block text-sm font-semibold text-gray-500">
              Posted Date
            </span>
            <span className="text-lg">
              {singleJob?.createdAt ? singleJob?.createdAt.split("T")[0] : ""}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDescription;
