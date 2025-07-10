"use client";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-2 py-2 bg-gray-700 rounded-full disabled:opacity-50 hover:bg-red-500 transition-colors duration-300"
      >
        <FaAngleLeft />
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-2 py-2 bg-gray-700 rounded-full disabled:opacity-50 hover:bg-red-500 transition-colors duration-300"
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;
