import React from "react";
//  Pagination component
const Pagination = ({ onNext, onPrev, hasNext, hasPrev }) => (
  <div className="flex justify-center mt-6 gap-4">
    <button
      onClick={onPrev}
      disabled={!hasPrev}
      className="bg-gray-700 px-4 py-2 rounded disabled:opacity-50"
    >
      Prev
    </button>
    <button
      onClick={onNext}
      disabled={!hasNext}
      className="bg-yellow-600 px-4 py-2 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
);

export default Pagination;
