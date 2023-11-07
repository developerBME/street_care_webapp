import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userImg from "../../images/user.jpeg";
import verifiedImg from "../../images/verified_purple.png";
import wavingHand from "../../images/waving_hand.png";
import CustomButton from "../Buttons/CustomButton";
import { fetchEventById } from "../EventCardService";
import { Co2Sharp } from "@mui/icons-material";

const OutreachSignup = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const eventDetails = [
    {
      time: "12/12/2023 SAT 12:00pm",
      location: "200 Eastern Pkwy, Brooklyn, NY 11238",
    },
  ];

  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchEventById(id);
        setData(result);
        console.log(result);
        console.log(result.eventDate);
      } catch (error) {
        console.error(error.message);
      }
    };

    getData(); // Invoke the async function
  }, []);

  return (
    <div className="bg-gradient-to-tr from-[#D3E0D8] to-[#FDFD5B] bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className="lg:w-[887px] md:w-[90%] mx-2 lg:mx-40 mt-32 mb-32 md:mb-[55px] rounded-3xl bg-white text-black ">
          <div className="items-center justify-center px-12 py-8 lg:px-32 lg:py-24 h-full w-full rounded-3xl bg-[#F8F9F0] grid grid-cols-1">
            <div className="w-fit h-fit flex-col justify-start items-start gap-16 inline-flex">
              <div className="w-fit text-[#212121] text-[45px] font-medium font-inter leading-[52px]">
                Sign Up For Community Outreach
              </div>
              <div className="self-stretch h-fit bg-[#F5EDFA] rounded-[30px] flex-col justify-start items-start flex">
                <div className="self-stretch h-fit px-6 pt-9 pb-3 flex-col justify-start items-start gap-2.5 flex">
                  <div className="justify-start items-center gap-2 inline-flex">
                    <img className="w-9 h-9 rounded-full" src={userImg} />
                    <div className="justify-start items-center gap-1 flex">
                      {/* {data && (
                        <div className="text-[#000] text-sm font-normal font-inter leading-snug">
                          {data.userName}
                        </div>
                      )} */}
                      {data ? (
                        <div className="text-[#000] text-sm font-normal font-inter leading-snug">
                          {data.userName}
                        </div>
                      ) : (
                        <div className="text-[#000] text-sm font-normal font-inter leading-snug">
                          Loading...
                        </div>
                      )}
                      <img src={verifiedImg} className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-fit px-6 py-2 flex-col justify-start items-start gap-4 flex">
                  {/* {data && (
                    <div className="self-stretch text-[#212121] text-2xl font-medium font-inter leading-loose">
                      {console.log(id)}
                      {data.title}
                    </div>
                  )} */}

                  {data ? (
                    <div className="self-stretch text-[#212121] text-2xl font-medium font-inter leading-loose">
                      {data.title}
                    </div>
                  ) : (
                    <div className="self-stretch text-[#212121] text-2xl font-medium font-inter leading-loose">
                      Loading...
                    </div>
                  )}
                  {/* {data && (
                    <div className="self-stretch text-[#37168B] text-sm font-medium font-inter leading-tight">
                      {data.eventDate}
                    </div>
                  )} */}

                  {data ? (
                    <div className="self-stretch text-[#37168B] text-sm font-medium font-inter leading-tight">
                      {data.eventDate}
                    </div>
                  ) : (
                    <div className="self-stretch text-[#37168B] text-sm font-medium font-inter leading-tight">
                      Loading...
                    </div>
                  )}

                  <div className="self-stretch h-[22px] flex-col justify-start items-start gap-1 flex">
                    {/* {data && (
                      <div className="self-stretch text-[#444746] text-sm font-normal font-inter leading-snug">
                        {data.location.street}, {data.location.city},{" "}
                        {data.location.state} {data.location.zipcode}
                      </div>
                    )} */}
                    {data ? (
                      <div className="self-stretch text-[#444746] text-sm font-normal font-inter leading-snug">
                        {data.location.street}, {data.location.city},{" "}
                        {data.location.state} {data.location.zipcode}
                      </div>
                    ) : (
                      <div className="self-stretch text-[#444746] text-sm font-normal font-inter leading-snug">
                        Loading...
                      </div>
                    )}
                  </div>
                  <div className="self-stretch px-4 py-2 bg-white rounded-2xl justify-center items-center gap-2.5 inline-flex">
                    <img src={wavingHand} className="w-6 h-6" />
                    {/* {data && (
                      <div className="grow shrink basis-0 text-[#181818] text-sm font-normal font-inter leading-snug">
                        {data.helpType}
                      </div>
                    )} */}
                    {data ? (
                      <div className="grow shrink basis-0 text-[#181818] text-sm font-normal font-inter leading-snug">
                        {data.helpType}
                      </div>
                    ) : (
                      <div className="grow shrink basis-0 text-[#181818] text-sm font-normal font-inter leading-snug">
                        Loading...
                      </div>
                    )}
                  </div>
                </div>
                <div className="self-stretch px-6 pt-4 pb-6 justify-between items-center inline-flex">
                  {/* {data && (
                    <div className="text-[#444746] text-sm font-normal font-inter leading-snug">
                      Open Spots: {data.interests}/{data.totalSlots}
                    </div>
                  )} */}
                  {data ? (
                    <div className="text-[#444746] text-sm font-normal font-inter leading-snug">
                      Open Spots: {data.interests}/{data.totalSlots}
                    </div>
                  ) : (
                    <div className="text-[#444746] text-sm font-normal font-inter leading-snug">
                      Loading...
                    </div>
                  )}
                </div>
              </div>
              <div className="self-stretch h-fit flex-col justify-start items-start gap-8 flex">
                <div className="w-fit text-[#212121] text-[22px] font-bold font-['Bricolage Grotesque'] leading-7">
                  Anything you would like to add? The community lead will be
                  able to access this note.
                </div>
                <div className="self-stretch w-full h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex">
                  <div className="self-stretch text-[#444746] text-sm font-medium font-inter leading-tight">
                    Notes
                  </div>
                  {/* <div className="self-stretch h-12 px-4 py-1 bg-white rounded border border-stone-300 justify-start items-center gap-2 inline-flex">
                    <div className="grow shrink basis-0 h-10 flex-col justify-center items-start inline-flex">
                      <div className="justify-start items-center inline-flex">
                        <input
                          type="notes"
                          id="notes"
                          placeholder="Anything"
                          className="text-zinc-900 w-full h-full pl-4 rounded-[4px] border border-zinc-500 text-base font-normal font-roboto leading-normal tracking-wide"
                          // onChange={(e) => setEmail(e.target.value)}
                        ></input>
                      </div>
                    </div>
                  </div> */}
                  <div className="self-stretch h-fit border-collapse">
                    <div className="h-14 justify-center items-start">
                      <input
                        type="notes"
                        id="notes"
                        placeholder="Anything"
                        className="text-[#444746] w-full h-full pl-4 rounded-[4px] text-base  font-normal font-roboto leading-normal tracking-wide"
                        // onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="justify-start items-start gap-[15px] inline-flex">
                {/* <div className="h-10 bg-[#6840E0] rounded-[100px] flex-col justify-center items-center gap-2 inline-flex">
                  <div className="self-stretch grow shrink basis-0 px-6 py-2.5 justify-center items-center gap-2 inline-flex">
                    <button className="text-center text-[#F7F7F7] text-sm font-medium font-inter leading-tight">
                      Sign Up
                    </button>
                  </div>
                </div> */}
                <div className="h-10 bg-[#6840E0] rounded-[100px] flex-col justify-center items-center gap-2 inline-flex">
                  <CustomButton label="Sign Up" name="buttondefault" />
                </div>
                <div
                  className="h-10 bg-[#000]] rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 inline-flex"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <div className="self-stretch grow shrink basis-0 px-6 py-2.5 justify-center items-center gap-2 inline-flex">
                    <button className="text-center text-[#1F0A58] text-sm font-medium font-inter leading-tight">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutreachSignup;
