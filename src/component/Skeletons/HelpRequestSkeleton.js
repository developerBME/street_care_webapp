import React from "react";

function HelpRequestSkeleton() {
  return (
    <div role="status" class=" animate-pulse p-12">
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-[30%] mb-4"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-fit mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[90%] mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[80%] mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[90%] mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-[70%]"></div>
      <span class="sr-only">Loading...</span>
    </div>
  );
}

export default HelpRequestSkeleton;
