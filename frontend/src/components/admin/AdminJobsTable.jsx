import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoading } from '@/redux/jobSlice'
import { toast } from 'sonner'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constants'
import { Button } from '../ui/button'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeHandler = async (jobId) => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/delete/${jobId}`,{withCredentials:true});
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setShowModal(false);
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText])

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => {
                        setSelectedJobId(job._id);
                        setShowModal(true);
                      }}
                      className='flex items-center gap-2 w-fit cursor-pointer text-red-600 hover:bg-red-50 rounded px-2 py-1'
                    >
                      <Trash2 className='w-4' />
                      <span>Remove</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className='flex items-center w-fit gap-2 cursor-pointer mt-2 hover:bg-sky-50 rounded px-2 py-1'
                    >
                      <Eye className='w-4' />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-sky-600">
              <Trash2 className="w-6 h-6 text-sky-600" /> Delete Job?
            </h2>
            <p className="mb-6 text-gray-700">
              Are you sure?
              <br />
              <span className="text-sky-600 font-semibold">
                This job and all its applicants data will be deleted.
              </span>
            </p>
            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
                className="min-w-[80px] border-gray-300"
              >
                Back
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700 min-w-[80px]"
                onClick={() => removeHandler(selectedJobId)}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminJobsTable
