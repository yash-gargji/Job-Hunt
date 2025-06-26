import { useState } from "react";
import {
  FiCode,
  FiDatabase,
  FiBarChart2,
  FiImage,
  FiLayers,
} from "react-icons/fi";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  { name: "Frontend Developer", icon: <FiCode /> },
  { name: "Backend Developer", icon: <FiDatabase /> },
  { name: "Data Science", icon: <FiBarChart2 /> },
  { name: "Graphic Designer", icon: <FiImage /> },
  { name: "FullStack Developer", icon: <FiLayers /> },
];

const CategoryCarousel = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const prev = () =>
    setIndex((prev) => (prev === 0 ? category.length - 1 : prev - 1));
  const next = () =>
    setIndex((prev) => (prev === category.length - 1 ? 0 : prev + 1));

  return (
    <div className="w-full flex justify-center mt-8 relative">
      <div className="relative w-full max-w-md">
        <div
          className="rounded-[2rem] shadow-md px-2 py-6 flex flex-col items-center"
          style={{
            background: "linear-gradient(90deg, #F5FCFF 0%, #DBF3FA 100%)",
          }}
        >
          <h2 className="text-2xl font-extrabold text-[#1a097f] text-center mb-5 tracking-tight">
            Explore Job Categories
          </h2>
          <div className="flex justify-center w-full">
            <Button
              onClick={() => searchJobHandler(category[index].name)}
              className="
                flex items-center gap-2
                px-6 py-2
                rounded-full
                bg-gradient-to-r from-[#6a5af9] to-[#3ecbff]
                shadow
                text-white
                font-semibold
                text-base
                transition
                duration-150
                hover:scale-105
                active:scale-95
                outline-none
              "
            >
              <span className="text-xl">{category[index].icon}</span>
              {category[index].name}
            </Button>
          </div>
        </div>
        <button
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          aria-label="Previous"
          onClick={prev}
        >
          <svg
            className="w-5 h-5 text-[#3a23c4]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          aria-label="Next"
          onClick={next}
        >
          <svg
            className="w-5 h-5 text-[#3a23c4]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryCarousel;
