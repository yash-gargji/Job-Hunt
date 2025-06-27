import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar.jsx";
import FilterCard from "./FilterCard.jsx";
import Job from "./Job.jsx";
import { motion } from 'framer-motion';
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs.jsx";

function Jobs() {
    useGetAllJobs();
    const { loading, allJobs } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [search, setSearch] = useState("");

   useEffect(() => {
    if (search) {
        const filteredJobs = allJobs.filter((job) => {
            return (
                job.title.toLowerCase().includes(search.toLowerCase()) ||
                job.description.toLowerCase().includes(search.toLowerCase()) ||
                job.location.toLowerCase().includes(search.toLowerCase()) || 
                (job?.requirements && job.requirements.some(req => 
                    req.toLowerCase().includes(search.toLowerCase())
                ))
            );
        });
        setFilterJobs(filteredJobs);
    } else {
        setFilterJobs(allJobs);
    }
}, [allJobs, search]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-[20%]'>
                        <FilterCard search={search} setSearch={setSearch} />
                    </div>
                    <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <span className="text-lg text-gray-400">Loading jobs...</span>
                            </div>
                        ) : filterJobs.length <= 0 ? (
                            <div className="flex justify-center items-center h-full">
                                <span className="text-lg text-gray-400">No Jobs</span>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}
                                        className="h-full"
                                    >
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
