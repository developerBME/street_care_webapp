import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sample_form = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef();

  return (
    <div className="relative flex flex-col items-center ">
      <div className="lg:w-[887px] md:w-[90%] mx-2 lg:mx-40 mt-32 mb-32 md:mb-[55px] rounded-3xl bg-white text-black ">
        <div className="items-center justify-center px-12 py-8 lg:px-32 lg:py-24 h-full w-full rounded-3xl bg-[#F8F9F0] grid grid-cols-1">
          <div className="w-fit h-fit flex-col justify-start items-start gap-16 inline-flex">
            <div className="w-fit text-[#212121] text-[45px] font-medium font-inter leading-[52px]">
              Sample Form
            </div>
            <div>
              <div className="flex flex-col">
                <label>Enter Address</label>
                <input
                  ref={autoCompleteRef}
                  className="my-5 w-full h-10"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search a place"
                  value={query}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sample_form;
