import { useEffect } from "react";
import Navbar from "./shared/Navbar.jsx";
import FilterCard from "./FilterCard.jsx";
import Job from "./Job.jsx";
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";  

function Jobs() {
    useGetAllJobs();  
    const dispatch = useDispatch();
    const {loading,allJobs} = useSelector(store => store.job);

  
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <span className="text-lg text-gray-400">Loading jobs...</span>
                            </div>
                        ) : allJobs.length <= 0 ? (
                            <div className="flex justify-center items-center h-full">
                                <span className="text-lg text-gray-400">Job not found</span>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {allJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}>
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jobs;
