import React from "react";

const InteractionLogCardSkeleton = () => {
  return (
    <div className="bg-[#F5EEFE] w-[90%] max-w-[20rem] md:w-full min-w-0 rounded-[30px] mb-4 flex flex-col p-6 h-auto border-b-[1px] border-gray-200 animate-pulse">
      {/* Flag Icon Placeholder */}
      <div className="relative">
        <div className="absolute right-4 w-8 h-8 rounded-full bg-gray-300" />
      </div>

      {/* User Row */}
      <div className="inline-flex items-center space-x-2 mt-2">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        <div className="w-24 h-4 bg-gray-300 rounded" />
        <div className="w-5 h-5 bg-gray-300 rounded-full" />
      </div>

      {/* Date + Location */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded" />
          <div className="w-20 h-4 bg-gray-300 rounded" />
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-3 h-4 bg-gray-300 rounded" />
          <div className="w-24 h-4 bg-gray-300 rounded" />
        </div>
      </div>

      {/* People Helped */}
      <div className="flex justify-between items-center mt-4">
        <div className="w-24 h-4 bg-gray-300 rounded" />
        <div className="w-10 h-6 bg-gray-300 rounded" />
      </div>

      {/* Items Donated */}
      <div className="flex justify-between items-center mt-3">
        <div className="w-24 h-4 bg-gray-300 rounded" />
        <div className="w-10 h-6 bg-gray-300 rounded" />
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="w-20 h-6 bg-gray-300 rounded-full" />
        <div className="w-16 h-6 bg-gray-300 rounded-full" />
        <div className="w-24 h-6 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default InteractionLogCardSkeleton;
