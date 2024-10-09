import React from "react";
import {
  IoChevronBackCircle,
  IoChevronBackCircleOutline,
  IoChevronForwardCircle,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";

const Pagination = ({
  totalData,
  pageNumber,
  pageSize,
  handlePageChange,
  itemName,
}) => {
  const totalPages = Math.ceil(totalData / pageSize);
  return (
    <div className={`flex justify-between p-4 items-center`}>
      <div>
        Showing {pageSize} of {totalData} {itemName}
      </div>
      <div className="flex justify-between md:justify-end mt-6 items-center">
        {pageNumber === 1 ? (
          <IoChevronBackCircle className="w-8 h-8 text-[#565656]" />
        ) : (
          <IoChevronBackCircleOutline
            className="w-8 h-8 text-[#565656]"
            onClick={() => handlePageChange(pageNumber - 1)}
          />
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={`mx-1 border rounded-full h-8 w-8 ${
              pageNumber === index + 1
                ? "border-[#1F0A58] bg-[#E8DFFD]"
                : "border-[#C8C8C8] bg-[#FFFFFF]"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        {pageNumber === totalPages ? (
          <IoChevronForwardCircle className="w-8 h-8 text-[#565656]" />
        ) : (
          <IoChevronForwardCircleOutline
            className="w-8 h-8 text-[#565656]"
            onClick={() => handlePageChange(pageNumber + 1)}
          />
        )}
      </div>
    </div>
  );
};

export default Pagination;
