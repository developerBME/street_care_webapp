import React from "react";
import CustomButton from "./Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import streetcarelogo from "../images/streetcare-logo.png";

function ComingSoon() {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col items-center ">
      <div className=" w-full px-16 md:px-0 h-screen flex items-center justify-center">
        <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
          <img
            src={streetcarelogo}
            alt="Logo"
            className="object-cover w-40 h-40 mb-8 rounded-full"
          />
          <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
          <p className="text-lg mb-8 px-4 md:px-0">
            We're working hard to bring you something awesome. Stay tuned!
          </p>
          <div className=" flex justify-center space-x-2">
            <CustomButton
              name="buttondefault"
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2  rounded transition duration-150"
              label="Go back"
              onClick={() => {
                navigate(-1);
              }}
            ></CustomButton>

            <CustomButton
              name="buttondefault"
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2  rounded transition duration-150"
              label="Home"
              onClick={() => {
                navigate("/");
              }}
            ></CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
