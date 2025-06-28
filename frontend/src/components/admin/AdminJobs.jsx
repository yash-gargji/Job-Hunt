import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, loading]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <Input
            className="w-full sm:w-80"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="w-full sm:w-auto"
            onClick={() => navigate("/admin/jobs/create")}
          >
            New Job
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow p-6 min-h-[200px]">
          {loading ? (
            <div className="flex items-center justify-center min-h-[150px]">
              <span className="text-lg text-gray-600 font-semibold">Loading jobs...</span>
            </div>
          ) : (
            <AdminJobsTable />
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminJobs
