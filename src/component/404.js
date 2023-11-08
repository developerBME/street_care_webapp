import React from "react";
import CustomButton from "./Buttons/CustomButton";

import { useNavigate } from "react-router-dom";

function Not404() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center ">
      {/* <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black "> */}
      <div class=" w-full px-16 md:px-0 h-screen flex items-center justify-center">
        <div class="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
          <p class="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">
            404
          </p>
          <p class="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
            Page Not Found
          </p>
          <p class="text-gray-500 my-4 pb-4 border-b-2 text-center">
            Uh oh, we can’t seem to find the page you’re looking for. Try going
            back to the previous page or to home page.
          </p>
          <div className="flex justify-center space-x-2">
            <CustomButton
              name="buttondefault"
              class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2  rounded transition duration-150"
              label="Go back"
              onClick={() => {
                navigate(-1);
              }}
            ></CustomButton>
            <CustomButton
              name="buttondefault"
              class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
              label="Home"
              onClick={() => {
                navigate("/");
              }}
            ></CustomButton>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default Not404;
