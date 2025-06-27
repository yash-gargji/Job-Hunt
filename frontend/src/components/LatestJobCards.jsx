import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fallbackLogo = "/altCompany.avif";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{
        scale: 1.035,
        boxShadow: "0 8px 24px 0 rgba(33, 150, 243, 0.18), 0 1.5px 6px 0 rgba(0,0,0,0.08)",
        y: -4,
      }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="relative w-full max-w-xs mx-auto rounded-3xl overflow-visible cursor-pointer group"
      style={{
        minHeight: 270,
        background: "linear-gradient(120deg, #2196f3 0%, #21cbf3 100%)",
      }}
      onClick={() => navigate(`/description/${job._id}`)}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === "Enter") navigate(`/description/${job._id}`);
      }}
    >
      <motion.div
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-200/40 blur-2xl pointer-events-none"
        animate={{ scale: [1, 1.09, 1], opacity: [0.18, 0.28, 0.18] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-10 left-4 right-4 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl p-5 z-10 border border-blue-100"
        whileHover={{
          boxShadow: "0 8px 32px 0 rgba(33, 150, 243, 0.18), 0 1.5px 6px 0 rgba(0,0,0,0.08)",
          borderColor: "#2196f3",
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="bg-white p-1 rounded-full shadow-xl border-4 border-blue-100 flex items-center justify-center w-16 h-16">
            <img
              src={job.company?.logo || fallbackLogo}
              alt={job.company?.name || "Company Logo"}
              className="object-contain w-12 h-12 rounded-full"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-7 text-center">
          <h1 className="font-bold text-lg text-blue-700">{job?.company?.name}</h1>
          <p className="text-xs text-gray-500 mt-1">India</p>
          <h2 className="font-extrabold text-xl my-2 text-gray-800">{job?.title}</h2>
          <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          <Badge className="text-blue-700 font-bold bg-blue-50 border border-blue-100 shadow-sm">
            {job?.position} Positions
          </Badge>
          <Badge className="text-[#F83002] font-bold bg-red-50 border border-red-100 shadow-sm">
            {job?.jobType}
          </Badge>
          <Badge className="text-[#7209b7] font-bold bg-purple-50 border border-purple-100 shadow-sm">
            {job?.salary} LPA
          </Badge>
        </div>
        <motion.button
          whileHover={{
            scale: 1.08,
            background: "linear-gradient(90deg,#2196f3 0%,#21cbf3 100%)",
            color: "#fff",
            boxShadow: "0 4px 20px 0 rgba(33,150,243,0.15)",
          }}
          transition={{ type: "spring", stiffness: 350 }}
          className="mt-6 px-6 py-2 rounded-lg bg-blue-50 text-blue-700 font-bold shadow-sm border border-blue-100 transition-all duration-200"
          onClick={e => {
            e.stopPropagation();
            navigate(`/description/${job._id}`);
          }}
        >
          View Details
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default LatestJobCards;
