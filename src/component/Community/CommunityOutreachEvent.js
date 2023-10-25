import React, { useState } from "react";
import OutreachEventCard from "./OutreachEventCard";
import arrowDown from "../../images/arrowDown.png";
import arrowRight from "../../images/arrowRight.png";
import CustomButton from "../Buttons/CustomButton";

const CommunityOutreachEvent = () => {
  const [visibleItems, setVisibleItems] = useState(3);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 3);
  };
  const cardData = [
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238",
      },
      helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5,
    },
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238",
      },
      helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5,
    },
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238",
      },
      helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5,
    },
  ];

  return (
    <div>
      <div className="w-full flex flex-col justify-center md:justify-between items-center rounded-t-xl bg-gradient-to-br from-purple-300 to-zinc-200 p-4 lg:px-28 lg:py-12 lg:flex-row lg:space-y-0">
        <div className="md:inline-flex items-center text-center space-y-2 md:space-y-0">
          <p className="font-medium text-sm lg:text-3xl text-[#212121] font-bricolage">
            Upcoming events in
          </p>
          <div className="relative md:inline-block">
            <select className="appearance-none py-1 px-3 pr-8 text-[#181818] text-2xl lg:text-3xl font-bricolage border-b border-[#181818] bg-transparent ">
              <option value="location1">New York, USA</option>
              <option value="location2">Location 2</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#181818] gap-4">
              <img src={arrowDown} />
            </div>
          </div>
          <button className="text-sm font-medium font-['DM Sans'] leading-tight lg:text-[12px] text-white bg-[#6840E0] px-6 py-2.5 lg:px-6 lg:py-2.5 rounded-full sm:hidden">
            Create an Outreach
          </button>
        </div>

        <div className="hidden lg:flex md:inline-flex cursor-pointer gap-3 items-center text-center">
          <div className="font-medium text-[8px] lg:text-[13px] font-bricolage">
            View all
          </div>
          <img src={arrowRight} className="w-2 h-2 lg:w-4 lg:h-4 " />
        </div>
      </div>

      <div className="p-4 lg:px-28 lg:py-12 space-y-9">
        <div className="flex items-center justify-between">
          <div className="md:inline-flex items-center text-center space-y-2 md:space-y-0">
            <p className="font-medium text-sm lg:text-3xl text-[#212121] font-bricolage">
              Upcoming events in
            </p>
            <div className="relative md:inline-block">
              <select className="appearance-none py-1 px-3 pr-8 text-[#181818] text-2xl lg:text-3xl font-bricolage border-b border-[#181818] bg-transparent ">
                <option value="location1">New York, USA</option>
                <option value="location2">Location 2</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#181818] gap-4">
                <img src={arrowDown} />
              </div>
            </div>
            <button className="text-sm font-medium font-['DM Sans'] leading-tight lg:text-[12px] text-white bg-[#6840E0] px-6 py-2.5 lg:px-6 lg:py-2.5 rounded-full sm:hidden">
              Create an Outreach
            </button>
          </div>
          <div className="hidden lg:flex md:inline-flex cursor-pointer gap-3 items-center text-center">
            <div className="font-medium text-[8px] lg:text-[13px] font-bricolage">
              View all
            </div>
            <img src={arrowRight} className="w-2 h-2 lg:w-4 lg:h-4 " />
          </div>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {cardData.slice(0, visibleItems).map((item, index) => (
            <div key={index}>
              <OutreachEventCard cardData={item} />
            </div>
          ))}
        </div>
        {visibleItems < cardData.length && (
          <button
            className="w-full px-6 py-2.5 rounded-full text-sm font-medium text-violet-950 font-['DM Sans'] border border-stone-300"
            onClick={loadMore}
          >
            Load More
          </button>
        )}
        <div className="flex items-center justify-between">
          <div className="md:inline-flex items-center text-center space-y-2 md:space-y-0">
            <p className="font-medium text-sm lg:text-3xl text-[#212121] font-bricolage">
              Outreach Visit Log
            </p>
            <button className="text-sm font-medium font-['DM Sans'] leading-tight lg:text-[12px] text-white bg-[#6840E0] px-6 py-2.5 lg:px-6 lg:py-2.5 rounded-full sm:hidden">
              Create an Outreach
            </button>
          </div>
          <div className="hidden lg:flex md:inline-flex cursor-pointer gap-3 items-center text-center">
            <div className="font-medium text-[8px] lg:text-[13px] font-bricolage">
              View all
            </div>
            <img src={arrowRight} className="w-2 h-2 lg:w-4 lg:h-4 " />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {cardData.slice(0, visibleItems).map((item, index) => (
            <div key={index}>
              <OutreachEventCard cardData={item} />
            </div>
          ))}
        </div>
        {visibleItems < cardData.length && (
          <button
            className="w-full px-6 py-2.5 rounded-full text-sm font-medium text-violet-950 font-['DM Sans'] border border-stone-300"
            onClick={loadMore}
          >
            Load More
          </button>
        )}
        {/*<div className="w-full inline-flex flex-col items-center sm:inline-flex sm:flex-row sm:space-x-4 hidden sm:block">
          {cardData.map((item, index) => (
            <OutreachEventCard key={index} cardData={item} />
          ))}
        </div>
        <div className="overflow-x-scroll sm:overflow-x-hidden block sm:hidden">
          <div className="w-fit lg:w-full flex space-x-4 pl-4">
            {cardData.map((item, index) => (
              <OutreachEventCard key={index} cardData={item} />
            ))}
          </div>
            </div>*/}
        {/*<div className="overflow-x-scroll">
          <div className="w-fit lg:w-full flex space-x-4 pl-4">
            {cardData.map((item, index) => (
              <OutreachEventCard key={index} cardData={item} />
            ))}
          </div>
            </div>*/}
      </div>
    </div>
  );
};

export default CommunityOutreachEvent;
