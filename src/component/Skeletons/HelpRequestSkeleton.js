import React from "react";

function HelpRequestSkeleton() {
  return (
    <div role="status" className=" animate-pulse p-12 border-b border-gray-200">
      <div className="flex justify-between mb-6">
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
      </div>
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[30%] mb-4"></div>
      <div className="flex gap-2 mb-2">
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
      </div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-fit mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[90%] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[80%] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[90%] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[70%]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default HelpRequestSkeleton;
