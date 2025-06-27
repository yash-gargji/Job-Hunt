import React from 'react'
import LatestJobCards from './LatestJobCards.jsx';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const { allJobs, loading } = useSelector(store => store.job);
    return (
        <div className="max-w-7xl mx-auto my-20 px-4 mb-24"> 
            <h1 className="text-4xl font-bold">
                <span className="text-sky-500">Latest & Top </span> Job Openings
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-20 my-5 min-h-[180px]">
                {loading ? (
                    <span className="col-span-full text-center text-gray-400 text-lg">Loading jobs...</span>
                ) : allJobs.length <= 0 ? (
                    <span className="col-span-full text-center text-gray-500">No Jobs Available</span>
                ) : (
                    allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                )}
            </div>
        </div>
    )
}

export default LatestJobs;
