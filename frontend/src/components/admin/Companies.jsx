import React from "react";
import Navbar from "../shared/Navbar.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import CompaniesTable from "./CompaniesTable.jsx";
import { useNavigate } from "react-router-dom";

function Companies() {
    const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto -my-10">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" placeholder="Filter by name" />
          <Button onClick= {() => navigate('/admin/companies/create')}>New Company</Button>
        </div>
        <CompaniesTable/>
      </div>
    </div>
  );
}

export default Companies;
