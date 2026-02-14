import React from "react";
import { getPageNumbersFormat } from "../../utils/helperFns";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const RenderPaginationBtns = (
  handleNext,
  handlePrev,
  cursorFields,
  windowSize = 5,
  onClick
) => {
  const lastPage = cursorFields?.pageStartDocs.length;
  const currPage = cursorFields?.currentPage + 1;
  const layout = getPageNumbersFormat(windowSize, currPage, lastPage);
  const disabledBtnCss =
    "mx-1 w-8 h-8 rounded-full bg-[#565656] opacity-50 text-gray-600 flex items-center justify-center";
  const activeBtnCss =
    "mx-1 w-8 h-8 rounded-full border border-[#C8C8C8] bg-white opacity-100 flex items-center justify-center";

  return (
    <div className="flex justify-between items-center w-full md:w-3/4 lg:w-3/4 mx-auto mt-4">
      //prev Btn
      <button
        key="prev"
        disabled={cursorFields.currentPage == 0}
        onClick={handlePrev}
        className={
          cursorFields.currentPage == 0 ? disabledBtnCss : activeBtnCss
        }
      >
        <IoIosArrowBack
          className={`w-6 h-6 ${
            cursorFields.currentPage == 0 ? "text-white" : "text-black"
          }`}
        />
      </button>
      {layout.forEach((page, index) => (
        <>
          <button
            key={page}
            className={
              cursorFields.currentPage == page - 1
                ? "mx-1 w-8 h-8 rounded-full border border-[#1F0A58] bg-[#E8DFFD] opacity-100 text-gray-600 font-medium hover:bg-[#D9CCF9] hover:border-[#150544] hover:text-gray-800 transition-colors duration-200 ease-in-out"
                : "mx-1 w-8 h-8 rounded-full border border-[#C8C8C8] bg-white opacity-100 text-gray-600 font-medium hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800 transition-colors duration-200 ease-in-out"
            }
            onClick={() => {
              onClick(page);
            }}
          >
            {page}
          </button>
          {index < layout.length - 1 && layout[index + 1] !== page + 1 && (
            <button
              key={`disabledBtnAfter-${page}`}
              className="mx-1 w-8 h-8 rounded-full border border-[#C8C8C8] bg-white opacity-100 text-gray-600 font-medium"
              disabled
            >
              ...
            </button>
          )}
        </>
      ))}
      //next
      <button
        key="next"
        disabled={
          cursorFields.currentPage == cursorFields.pageStartDocs.length - 1
        }
        onClick={handleNext}
        className={
          cursorFields.currentPage == cursorFields.pageStartDocs.length - 1
            ? disabledBtnCss
            : activeBtnCss
        } // disabled
      >
        <IoIosArrowForward
          className={`w-6 h-6 ${
            cursorFields.currentPage == cursorFields.pageStartDocs.length - 1
              ? "text-white"
              : "text-black"
          }`}
        />
      </button>
    </div>
  );
};

export default RenderPaginationBtns;
