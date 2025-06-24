import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{
        scale: 1.045,
        boxShadow: "0 16px 48px 0 rgba(33, 150, 243, 0.22), 0 2px 8px 0 rgba(0,0,0,0.12)",
        y: -8,
      }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="relative w-full max-w-sm mx-auto rounded-3xl overflow-visible cursor-pointer group"
      style={{
        minHeight: 320,
        background:
          "linear-gradient(120deg, #2196f3 0%, #21cbf3 100%)",
      }}
      onClick={() => navigate(`/description/${job._id}`)}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === "Enter") navigate(`/description/${job._id}`);
      }}
    >
      <motion.div
        className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-blue-200/50 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.09, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-14 left-6 right-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl p-7 z-10 border border-blue-100"
        whileHover={{
          boxShadow: "0 8px 32px 0 rgba(33, 150, 243, 0.18), 0 1.5px 6px 0 rgba(0,0,0,0.08)",
          borderColor: "#2196f3",
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-5 rounded-full shadow-2xl border-4 border-white/80 flex items-center justify-center">
            <Briefcase className="text-white w-10 h-10" />
          </div>
        </div>

        <div className="mt-8 text-center">
          <h1 className="font-bold text-xl text-blue-700">{job?.company?.name}</h1>
          <p className="text-xs text-gray-500 mt-1">India</p>
          <h2 className="font-extrabold text-2xl my-3 text-gray-800">{job?.title}</h2>
          <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
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
          className="mt-7 px-6 py-2 rounded-lg bg-blue-50 text-blue-700 font-bold shadow-sm border border-blue-100 transition-all duration-200"
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
