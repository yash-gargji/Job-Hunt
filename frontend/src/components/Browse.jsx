import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const Browse = () => {
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs, loading, searchedQuery } = useSelector(store => store.job);

  const [input, setInput] = useState(searchedQuery || '');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (!input.trim()) {
      setFilteredJobs([]);
      return;
    }
    const searchLower = input.toLowerCase();
    const filtered = allJobs.filter(job =>
      job.title.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower) ||
      (job.requirements && job.requirements.some(req => req.toLowerCase().includes(searchLower)))
    );
    setFilteredJobs(filtered);
  }, [input, allJobs]);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <div className="flex flex-col items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold text-sky-800">Browse Jobs</h1>
          <div className="flex w-full max-w-xl gap-2">
            <input
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
              type="text"
              placeholder="Search jobs by title, location, or skill..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
          </div>
        </div>

        {!input.trim() && !loading && (
          <div className="flex flex-col items-center mt-20 animate-fadeIn">
            <p className="text-xl text-gray-500 italic font-medium animate-pulse">
              Start your journey! Type something above to discover your dream job...
            </p>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center mt-10">
            <svg className="animate-spin h-8 w-8 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
        )}

        {input.trim() && !loading && (
          <div className="w-full">
            <h2 className="font-semibold text-lg mb-6 text-left">
              Search results for "<span className="text-sky-600">{input}</span>" ({filteredJobs.length})
            </h2>
            {filteredJobs.length === 0 ? (
              <div className="flex flex-col items-center mt-10">
                <p className="text-lg text-gray-400 font-semibold">No jobs found matching your search.</p>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-start"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    variants={cardVariants}
                    className="w-full"
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
