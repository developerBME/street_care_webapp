import React from "react";

import UserProfileCard from "./UserProfileCard";
import icon from "../images/icon.png";
import add from "../images/add.png";
import UserInfo from "./UserInfo";

function Profile() {
  const cardData = [
    {
      title: "BME Official Event",
      eventName: "Brooklyn Fort Green Outreach",
      eventDate: "Nov 9, 2023 FRI 5:00pm",
      buttonText: "Upcoming...",
      cardColor: "#F1EEFE",
    },
    {
      title: "Group",
      eventName: "Jersey City Hoboken Outreach",
      eventDate: "Oct 16, 2023 SAT 5:00pm",
      buttonText: "Add Visit Log",
      cardColor: "#F1EEFE",
    },
    {
      title: "Group",
      eventName: "Brooklyn Williamsburg Outreach",
      eventDate: "Oct 4, 2023 SAT 5:00pm",
      buttonText: "Add Visit Log",
      cardColor: "#F1EEFE",
    },
    {
      title: "Personal",
      eventName: "Manhatten Harlem Outreach",
      eventDate: "Apr 12, 2023 SAT 5:00pm",
      buttonText: "Edit Details",
      cardColor: "#F1EEFE",
    },
    {
      title: "BME Official Event",
      eventName: "BK Fort Green Outreach",
      eventDate: "Sept 12, 2023 SAT 12:00pm",
      buttonText: "Edit Details",
      cardColor: "#F1EEFE",
    },
    {
      title: "Personal",
      eventName: "Manhatten Harlem Outreach",
      eventDate: "Apr 12, 2023 SAT 5:00pm",
      buttonText: "Edit Details",
      cardColor: "#F1EEFE",
    },
    {
      title: "Group",
      eventName: "Brookolyn Museum Outreach",
      eventDate: "12/12/2023 SAT 5:00pm",
      buttonText: "Add Visit Log",
      cardColor: "#F1EEFE",
    },
    {
      title: "Personal",
      eventName: "Manhatten Harlem Outreach",
      eventDate: "Apr 12, 2023 SAT 5:00pm",
      buttonText: "Add Visit Log",
      cardColor: "#F1EEFE",
    },
  ];

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        {/* Aniket */}
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          <UserInfo />
          {/* Remove this component and create a new one for your code  */}
        </div>
        
        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-4 lg:gap-14 lg:p-28 p-4">
            <div className="inline-flex flex-col sm:flex-row lg:space-x-16">
              <div class="text-neutral-800 text-4xl lg:text-5xl font-medium font-bricolage leading-[52px]">My Outreaches</div>
              <div className="inline-flex bg-violet-600 rounded-full gap-2 items-center p-2 lg:p-4 mr-44 mt-2 lg:mt-0">
                <img src={icon} className="w-4 h-4 mt-1"/>
                <button className="w-fit rounded-full text-neutral-100 text-[10px] lg:text-[14px] ">Document my Outreach</button>
              </div>
            </div>
            <div className=" hidden sm:block">
              <div className="w-full inline-flex bg-[#F2F6D8] p-4 rounded-xl space-x-4">
                <div className="text-neutral-800 text-[16px] font-medium font-['Bricolage Grotesque'] leading-loose">Congratulations! You have attended more than 1 outreach event. Now you can host your own.</div>
                <div className="px-3 py-2 inline-flex bg-violet-600 rounded-full gap-2">
                  <img src={add} className="w-4 h-4"/>
                  <button className="rounded-full text-neutral-100 text-[10px]">Create Outreach</button>
                </div>
              </div>
            </div>
            <div className="sm:hidden overflow-x-auto">
              <div className="flex space-x-4 lg:p-4">
                {cardData.map((cardData, index) => (
                  <div key={index}>
                    <UserProfileCard cardData={cardData} />
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden sm:block sm:overflow-x-auto">
              <div className="grid grid-cols-4 gap-2 gap-y-16">
                {cardData.map((cardData, index) => (
                  <UserProfileCard key={index} cardData={cardData} />
                ))}
              </div>
            </div>
          </div>
          
          {" "}
        </div>
            
        {/* Vishnu*/}
        {/*
        <div className="  w-[95%] md:w-[90%] lg:w-[80%] p-28 mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black mb-10">
          <div className="flex flex-col gap-14">
            <div className="inline-flex space-x-16">
              <div class="text-neutral-800 text-5xl font-medium font-bricolage leading-[52px]">
                My Outreaches
              </div>
              <div className="inline-flex px-8 py-4  bg-violet-600 rounded-full gap-2">
                <img src={icon} className="w-4 h-4 mt-1" />
                <button className="rounded-full text-neutral-100 text-[14px]">
                  Document my Outreach
                </button>
              </div>
            </div>
            <div className="inline-flex bg-[#F2F6D8] p-4 rounded-xl space-x-4">
              <div className="text-neutral-800 text-[16px] font-medium font-bricolage leading-loose">
                Congratulations! You have attended more than 1 outreach event.
                Now you can host your own.
              </div>
              <div className="px-3 py-2 inline-flex bg-violet-600 rounded-full gap-2">
                <img src={add} className="w-4 h-4" />
                <button className="rounded-full text-neutral-100 text-[10px]">
                  Create Outreach
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 gap-y-16">
              {cardData.map((cardData, index) => (
                <UserProfileCard key={index} cardData={cardData} />
              ))}
            </div>
          </div>{" "}
        </div>
              */ }
      </div>
    </div>
  );
}

export default Profile;
