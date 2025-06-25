import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import CompaniesTable from "./CompaniesTable.jsx";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCompnayByText } from "@/redux/companySlice.js";

function Companies() {
  useGetAllCompanies();
  const navigate = useNavigate();
  const { loading } = useSelector(store => store.company);
  const [input,setInput] = useState("");
  const dispatch = useDispatch();

  const onInputChnage = (e) => {
       setInput(e.target.value);
  }

  useEffect(() => {
      dispatch(setSearchCompnayByText(input));
  } ,[input]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Input
            className="w-full sm:w-80"
            placeholder="Filter by name"
            value = {input}
            onChange = {onInputChnage}
          />
          <Button
            className="w-full sm:w-auto"
            onClick={() => navigate('/admin/companies/create')}
          >
            New Company
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow p-6 min-h-[200px]">
          {loading ? (
            <div className="flex items-center justify-center min-h-[150px]">
              <span className="text-lg text-gray-600 font-semibold">Loading companies...</span>
            </div>
          ) : (
            <CompaniesTable />
          )}
        </div>
      </div>
    </div>
  );
}

export default Companies;
