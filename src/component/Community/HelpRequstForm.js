import React from "react";

import Chip from "../Community/Chip";
import arrowBack from "../../images/arrowBack.png";
import arrowDown from "../../images/arrowDown.png";

function HelpRequestForm() {
  const chipList = [
    "Childcare",
    "Counseling and Support",
    "Clothing",
    "Education",
    "Personal Care",
    "Employment and Training",
    "Food and Water",
    "Healthcare",
    "Chinese",
    "Spanish",
    "Language(please specify)",
    "Legal",
    "Shelter",
    "Transportation",
    "LGBTQ Support",
    "Technology Access",
    "Social Integration",
    "Pet Care",
  ];

  return (

    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
    <form>
      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl text-black ">
          <div className="inline-flex pl-3 lg:pl-40 cursor-pointer pb-[19px]">
            <img src={arrowBack} />
            <p className="font-semibold font-bricolage text-[22px]">
              Return to Profile
            </p>
          </div>
          <div className="rounded-2xl mx-2 mb-32 lg:mx-40 bg-[#F8F9F0] p-4 lg:pt-[100px] lg:pb-[100px] lg:pr-[150px] lg:pl-[150px]">
            <div>
              <form >
                <div>
                  <div className="lg:text-5xl text-3xl font-medium font-bricolage pb-4 lg:pb-16">
                    🙌 Need extra help?<br/> Let us spread the word!
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-black text-2xl font-bricolage font-medium">Publish a request to Community Hub</div>
                    <div className="text-zinc-700 text-sm font-normal font-['Open Sans'] ">
                      If this homeless person requires further assistance,
                      please provide additional details so we can share with the
                      community and rally support to help them.
                    </div>
                  </div>
                  <div className="text-black font-bold font-bricolage text-sm">What kind of help they need?*</div>
                  <div className="lg:w-[580px] space-y-2">
                    {chipList.map((value, index) => (
                      <Chip key={index} val={value} />
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    <div className="text-zinc-700 font-semibold text-[15px] font-['Inter']">Additional Notes</div>
                    <input
                      type="text"
                      className="h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "
                      placeholder="Description"
                    />
                  </div>
                  <div className="space-y-2">
                        <div className="font-medium font-bricolage text-2xl text-black">Help other volunteers to find them</div>
                        <div className="text-zinc-700 text-sm font-normal font-['Open Sans'] ">Please provide as many details as you can to help us locate them</div>
                  </div>
                  <div className="inline-flex grid grid-cols-2 space-x-4">
                    <div className="space-y-1.5">
                        <p className="font-semibold font-['Inter'] text-[15px]">
                        Street*
                        </p>
                        <input
                        type="text"
                        className="h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "
                        placeholder="Street"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <p className="font-semibold font-['Inter'] text-[15px]">
                        Zipcode*
                        </p>
                        <input
                        type="text"
                        className="h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "
                        placeholder="11201"
                        />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="font-semibold font-['Inter'] text-[15px]">How can we identify this person?*</div>
                    <input
                      type="text"
                      className="h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "
                      placeholder="Blue Shirt"
                    />
                  </div>
                </div>
                <div className="inline-flex gap-2 items-center mt-6">
                    <input type="checkbox"></input><div><span className="text-black text-sm font-normal font-['Open Sans'] leading-tight">Post to </span><span className="text-black text-sm font-bold font-['Open Sans'] leading-tight">Community Hub</span><span className="text-black text-sm font-normal font-['Open Sans'] leading-tight"> anonymously</span></div>
                </div>
                <div className="space-y-16 space-x-[15px]">
                  <button className="px-8 py-4 border border-[#5F35D5] rounded-full text-violet-700">
                    Cancel
                  </button>
                  <button className="px-8 py-4 border rounded-full bg-violet-700 text-[#F8F9F0]">
                    Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}

export default HelpRequestForm;
