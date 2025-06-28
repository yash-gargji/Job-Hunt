import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyByid from "@/hooks/useGetCompanyByid";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyByid(params.id);
  const [fileName, setFileName] = useState("No file chosen");
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("No file chosen");
    }
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
    });
  }, [singleCompany]);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#f9fafb", minHeight: "100vh" }}>
      <Navbar />
      <div className="max-w-xl mx-auto my-10 bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 mb-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold hover:bg-gray-100 transition"
              style={{ borderRadius: "9999px", padding: "0.5rem 1.25rem" }}
              type="button"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl text-gray-700">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="my-2 text-gray-600">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-100 transition"
                style={{ marginTop: "4px" }}
              />
            </div>
            <div>
              <Label className="my-2 text-gray-600">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-100 transition"
                style={{ marginTop: "4px" }}
              />
            </div>
            <div>
              <Label className="my-2 text-gray-600">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-100 transition"
                style={{ marginTop: "4px" }}
              />
            </div>
            <div>
              <Label className="my-2 text-gray-600">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="rounded-lg border-gray-200 focus:border-blue-300 focus:ring-blue-100 transition"
                style={{ marginTop: "4px" }}
              />
            </div>
            <div className="my-2 col-span-2">
              <Label className="block mb-2 text-gray-600">Logo</Label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="file"
                  accept="image/*"
                  id="file-upload"
                  style={{ display: "none" }}
                  onChange={changeFileHandler}
                />
                <label
                  htmlFor="file-upload"
                  style={{
                    background: "#f3f4f6",
                    color: "#6b7280",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    marginRight: "16px",
                    border: "1px solid #e5e7eb",
                    fontWeight: "500",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseOver={e => e.currentTarget.style.background = "#e5e7eb"}
                  onMouseOut={e => e.currentTarget.style.background = "#f3f4f6"}
                >
                  Choose File
                </label>
                <span style={{ color: "#6b7280", fontWeight: 500 }}>{fileName}</span>
              </div>
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-6" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition"
              style={{ padding: "0.75rem 0", fontSize: "1.1rem" }}
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
