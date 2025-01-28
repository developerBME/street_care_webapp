// import React, { useEffect } from "react";
// import CustomButton from "./Buttons/CustomButton";
// import { useNavigate } from "react-router-dom";

// function AdminOnlyError() {
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   document.title = "Access Restricted - Street Care";
//   // }, []);

//   return (
//     <div className="relative flex flex-col items-center ">
//       <div className="w-full px-16 md:px-0 h-screen flex items-center justify-center">
//         <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
//           <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">
//             403
//           </p>
//           <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
//             Restricted Access
//           </p>
//           <p className="text-gray-500 my-4 pb-4 border-b-2 text-center">
//             This page is only accessible to admin users. Please contact the team
//             if you believe this is an error.
//           </p>
//           <div className="flex justify-center space-x-2">
//             <CustomButton
//               name="buttondefault"
//               className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded transition duration-150"
//               label="Go back"
//               onClick={() => {
//                 navigate(-1);
//               }}
//             ></CustomButton>
//             <CustomButton
//               name="buttondefault"
//               className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
//               label="Home"
//               onClick={() => {
//                 navigate("/");
//               }}
//             ></CustomButton>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminOnlyError;



import React, { useEffect } from "react";
import CustomButton from "./Buttons/CustomButton";
import { useNavigate } from "react-router-dom";


function AdminOnlyError() {
 const navigate = useNavigate();

 return (
   <div className="relative flex flex-col items-center ">
     <div className="w-full px-16 md:px-0 h-screen flex items-center justify-center">
       <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
         <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">
           403
         </p>
         <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
           Restricted Access
         </p>
         <p className="text-gray-500 my-4 pb-4 border-b-2 text-center">
           This page is only accessible to admin users. Please contact the team
           if you believe this is an error.
         </p>
         <div className="flex justify-center space-x-2">
           <CustomButton
             name="buttondefault"
             className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded transition duration-150"
             label="Go back"
             onClick={() => {
               navigate(-1);
             }}
           ></CustomButton>
           <CustomButton
             name="buttondefault"
             className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
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


export default AdminOnlyError;