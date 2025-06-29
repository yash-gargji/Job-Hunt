import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import AppliedJobTable from './AppliedJobTable'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { XCircle } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

function MyJobs() {
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  if(user){
      useGetAppliedJobs();
  }

  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(jobs);
  }, []);

  const removeSavedJob = (id) => {
    const updated = savedJobs.filter(job => job._id !== id);
    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };
  
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-2 sm:px-4">
        {user && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sky-600 text-2xl font-bold">📄</span>
              <h1 className='text-2xl font-bold text-sky-900'>Applied Jobs</h1>
            </div>
          
            <AppliedJobTable />
          </section>
        )}

        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sky-600 text-2xl font-bold">🔖</span>
            <h1 className="text-2xl font-bold text-sky-900">Saved Jobs</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedJobs.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-8">
                You have no saved jobs yet.
              </div>
            ) : (
              savedJobs.map(job => (
                <div
                  key={job._id}
                  className="relative bg-white rounded-2xl shadow-md p-6 flex flex-col gap-2 hover:shadow-lg transition-shadow"
                >
                  <button
                    className="absolute top-3 right-3 text-gray-300 hover:text-red-500"
                    onClick={() => removeSavedJob(job._id)}
                    title="Remove from saved"
                  >
                    <XCircle size={22} />
                  </button>
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={job.company?.logo || "/altCompany.avif"}
                      alt={job.company?.name || "Company"}
                      className="h-12 w-12 rounded-full object-contain border"
                    />
                    <div>
                      <h2 className="font-bold text-blue-700 text-lg">{job.company?.name}</h2>
                      <span className="text-xs text-gray-500">{job.location}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1 text-sky-900">{job.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {job.requirements?.slice(0, 3).map((req, idx) => (
                      <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{req}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">{job.salary} LPA</span>
                    <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">{job.jobType}</span>
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">{job.position} Positions</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {job.experienceLevel} yrs exp
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 mt-auto">
                    Posted on {job.createdAt ? job.createdAt.split("T")[0] : ""}
                  </span>
                  <Button
                    onClick={() => navigate(`/description/${job._id}`)}
                    className="mt-4 bg-green-100 text-green-700 hover:bg-green-200 border border-green-200 font-semibold"
                  >
                    Apply
                  </Button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyJobs;
