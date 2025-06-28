import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    if (name === "salary" || name === "position") {
      let numericValue = value === "" ? "" : Number(value);
      if (numericValue !== "" && numericValue < 0) {
        numericValue = 0;
      }
      setInput({ ...input, [name]: numericValue });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.companyId) {
      toast.error("Please register a company first");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f9fafb", minHeight: "100vh" }}>
      <Navbar />
      <div className="flex items-center justify-center w-full my-10">
        <form
          onSubmit={submitHandler}
          className="p-10 max-w-4xl w-full bg-white rounded-2xl shadow-lg border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-700 mb-8 text-center">Create a New Job</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-600">Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-100 my-1 transition"
              />
            </div>
            <div>
              <Label className="text-gray-600">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-100 my-1 transition"
              />
            </div>
            <div>
              <Label className="text-gray-600">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-100 my-1 transition"
              />
            </div>
            <div>
              <Label className="text-gray-600">Salary (In LPA)</Label>
              <Input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                min="0"
                className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-100 my-1 transition"
              />
            </div>
            <div>
              <Label className="text-gray-600">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-100 my-1 transition"
              />
            </div>
            <div>
              <Label className="text-gray-600">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-100 my-1 transition"
              />
            </div>
            <div>
              <Label className="text-gray-600">Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-100 my-1 transition"
              />
            </div>
            <div>
              <Label className="text-gray-600">No of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                min="0"
                className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-100 my-1 transition"
              />
            </div>
            {companies.length > 0 && (
              <div className="col-span-2">
                <Label className="text-gray-600">Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-100 my-1 transition">
                    <SelectValue placeholder="Select a Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          value={company?.name?.toLowerCase()}
                          key={company._id}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          {loading ? (
            <Button className="w-full my-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition"
              style={{ padding: "0.75rem 0", fontSize: "1.1rem" }}
            >
              Post New Job
            </Button>
          )}
          {companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register a company first, before posting a job
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
