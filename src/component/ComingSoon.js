import React from "react";
import CustomButton from "./Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import streetcarelogo from "../images/streetcare-logo.png";

function ComingSoon() {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col items-center ">
      {/* <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black "> */}
      <div class=" w-full px-16 md:px-0 h-screen flex items-center justify-center">
        <div class="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
          <img
            src={streetcarelogo}
            alt="Logo"
            class="object-cover w-40 h-40 mb-8 rounded-full"
          />
          <h1 class="text-4xl font-bold mb-4">Coming Soon</h1>
          <p class="text-lg mb-8 px-4 md:px-0">
            We're working hard to bring you something awesome. Stay tuned!
          </p>

          <CustomButton
            name="buttondefault"
            class="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
            label="Return Home"
            onClick={() => {
              navigate("/");
            }}
          ></CustomButton>
        </div>
      </div>
      {/* </div> */}

      {/* 
      
      <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100">
    <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5" alt="Logo" class="object-cover w-40 h-40 mb-8 rounded-full">
    <h1 class="text-4xl font-bold mb-4">Coming Soon</h1>
    <p class="text-lg mb-8 px-4 md:px-0">We're working hard to bring you something awesome. Stay tuned!</p>
    <div class="flex justify-center items-center space-x-4">
        <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Learn More</a>
        <a href="#" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">Contact Us</a>
    </div>
</div>


      */}
    </div>
  );
}

export default ComingSoon;
