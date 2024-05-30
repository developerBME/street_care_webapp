import React, { useState, useEffect } from "react";
import wavingHand from "../../images/waving_hand2.png";
import HelpRequestCard from "./HelpRequestCard";
import CustomButton from "../Buttons/CustomButton";
import { formatDate, fetchHelpRequests } from "../HelpRequestService";
import { Link, useNavigate } from "react-router-dom";
import HelpRequestSkeleton from "../Skeletons/HelpRequestSkeleton";
import arrowRight from "../../images/arrowRight.png";

const HelpRequest = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(3);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 5);
  };
  const helpRequestData = [
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help on the way",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help Received",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help on the way",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help on the way",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help Received",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help on the way",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help on the way",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help Received",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Need Help",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
    {
      helpStatus: "Help on the way",
      helpTitle: "Childcare Support needed in Brooklyn Bridge.",
      helpTags: ["Childcare", "Counseling and Support"],
      helpLocation: "123 Plaza, New York",
      helpHowToFind:
        "She is around 5’3 tall, with blonde long hair and tattoos on her arm.",
      helpDescription:
        " Lucy is 26 years old with a 2 year old daughter seeking for childcare support and general counseling.",
      helpPostingUser: "K",
    },
  ];

  const fetchData = async () => {
    const helpRequestData = await fetchHelpRequests();

    // Sort helpRequests in place based on their date
    helpRequestData.sort((a, b) => a.createdAt - b.createdAt);
    setHelpRequests(helpRequestData);
    setIsLoading(false)
  };

  const [helpRequests, setHelpRequests] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   const helpRequestData = await fetchHelpRequests();

    //   // Sort helpRequests in place based on their date
    //   helpRequestData.sort((a, b) => a.createdAt - b.createdAt);

    //   setHelpRequests(helpRequestData);
    // };

    fetchData();
  }, []);

  // // Simulate an API call or data loading
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000); // Simulate a 3-second loading time (adjust as needed)

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div>
      <div className="sm:p-4 lg:px-10 lg:py-10 bg-gradient-to-br from-[#C0F4FF] to-[#DDD] rounded-t-2xl px-2 py-6 flex-col justify-start items-start gap-4 inline-flex w-full">
        {/* <div className="text-2xl font-medium font-dmsans"> */}
        {/* <div className="flex gap-x-4 items-center"> */}

        {/* <div>
            <img
              className="w-12 h-12 lg:w-16 lg:h-16"
              src={wavingHand}
              alt="..."
            ></img>
          </div> */}
        {/* <div className="text-[#212121] text-2xl lg:text-4xl font-medium font-dmsans lg:leading-[44px]">
            Help Requests
          </div>
        </div>
        <div className="text-md font-normal font-dmsans pt-2">
          What are help requests and how can they help you? If you are ready to
          help people now, kindly sign up to outreaches
        </div> */}

        {/* <div className="flex-col">
          <div className="my-2 flex-col justify-center items-center gap-2 inline-flex font-medium font-dmsans leading-tight self-stretch">
            <CustomButton
              label="Add New Request"
              name="buttondefault"
              onClick={() => {
                navigate("/helpRequestForm");
              }}
            />
          </div>
        </div> */}

        <div className="flex flex-col md:flex md:flex-row justify-between gap-4 md:gap-10">
          <div className="">
            <div className="flex flex-row gap-4">
              <div className="text-[45px] font-medium font-dmsans">
                {/* Outreach - extending help, resources, and compassion to those in
            need */}
                Help Requests ({helpRequests.length})
              </div>
              <div className="my-2 flex-col justify-center items-center gap-2 inline-flex font-medium font-dmsans leading-tight self-stretch">
                <CustomButton
                  label="Add New Request"
                  name="buttondefault"
                  onClick={() => {
                    navigate("/helpRequestForm");
                  }}
                />
              </div>

              {/* </div> */}
            </div>
            <div className="text-md font-medium font-dmsans text-[#181818] mt-2">
              {/* Homeless outreach involves both community-wide and personal efforts
            to support individuals experiencing homelessness. Community outreach
            brings together groups and organizations to create systemic change,
            while personal outreach involves one-on-one assistance. Homeless
            outreach is crucial because it provides immediate help and fosters
            empathy, building a more compassionate society. */}
              What are help requests and how can they help you? If you are ready
              to help people now, kindly sign up to outreaches
            </div>
          </div>

          <div
            className="flex flex-row cursor-pointer gap-2 items-center"
            onClick={() => {
              navigate("/community/allHelpRequests");
            }}
          >
            <div className="font-medium text-[16px] lg:text-[20px] font-dmsans text-[#37168B] whitespace-nowrap">
              View all
            </div>
            <img src={arrowRight} className="w-2 h-2 lg:w-4 lg:h-4 " />
          </div>
        </div>
      </div>

      {/* <div className="p-4 lg:px-10 lg:py-12 bg-gradient-to-br from-[#D3C3FF] to-[#DEDCE4] rounded-t-2xl flex-col justify-start items-start gap-4 inline-flex w-full"> */}

      {isLoading ? (
        <>
          <HelpRequestSkeleton />
          <HelpRequestSkeleton />
          <HelpRequestSkeleton />
        </>
      ) : (
        <div className="sm:p-4 lg:px-10 lg:py-10 flex flex-col bg-[#F7F7F7] gap-4 lg:gap-8 rounded-b-2xl">
          <div>
            {helpRequests.slice(0, visibleItems).map((item, index) => (
              <HelpRequestCard
                key={item.id}
                helpRequestCardData={item}
                refresh={fetchData}
              />
            ))}
          </div>
          {/* {visibleItems < helpRequests.length && (
            <button
              className="w-fit rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 flex text-center text-[#1F0A58] hover:bg-[#1F0A58] hover:text-white text-[13px] font-medium font-dmsans leading-tight self-stretch px-6 py-2.5"
              onClick={loadMore}
            >
              Load 5 More
            </button>
          )} */}
        </div>
      )}
    </div>
  );
};

export default HelpRequest;
