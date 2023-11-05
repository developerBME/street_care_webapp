import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import userImg from "../../images/user.jpeg";
import verifiedImg from "../../images/verified_purple.png";
import wavingHand from "../../images/waving_hand.png";

const OutreachSignup = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const eventDetails = [
    {
      time: "12/12/2023 SAT 12:00pm",
      location: "200 Eastern Pkwy, Brooklyn, NY 11238",
    },
  ];

  return (
    <div className="bg-gradient-to-tr from-[#D3E0D8] to-[#FDFD5B] bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" lg:w-[887px] md:w-[90%] mx-2 lg:mx-40 mt-32 mb-32 md:mb-[55px] rounded-3xl bg-white text-black ">
          <div className="items-center justify-center px-12 py-8 lg:px-32 lg:py-24 h-full w-full rounded-3xl bg-[#F8F9F0] grid grid-cols-1">
            <div className="flex-col justify-start items-start gap-16 md:gap-12 flex">
              <div className="w-fit text-neutral-800 lg:text-[57px] md:text-[40px] font-medium font-bricolage leading-[64px]">
                Sign Up For Community Outreach
              </div>
              <div className="self-stretch grow shrink basis-0 px-4 pt-[55px] pb-[55px] md:pt-[25px] md:pb-[25px] rounded-[30px] border bg-[#F5EDFA] flex-col justify-start items-center flex">
                {console.log(id)}

                {eventDetails.map((item) => (
                  // <>
                  //   <div className="self-stretch inline-flex ">
                  //     <p className="text-[14px] text-black-50 font-sans mb-4">
                  //       ⏰ {item.time}
                  //     </p>
                  //   </div>
                  //   <div className="self-stretch inline-flex ">
                  //     <p className="text-[14px] text-black-50 font-sans">
                  //       📍 {item.location}
                  //     </p>
                  //   </div>
                  // </>
                  <>
                    <div className="bg-[#F5EEFE] w-[350px] lg:w-full rounded-2xl mb-4">
                      <div className="inline-flex items-start px-5 pt-6 pb-3 space-x-2">
                        <img src={userImg} className="w-8 h-8 rounded-full" />
                        <div className="font-normal font-['Inter'] text-[13px] ">
                          Joshua
                        </div>
                        <img src={verifiedImg} className="w-5 h-5" />
                      </div>
                      <div className="px-5 py-2 space-y-4 pt-4 w-full">
                        <div className="font-medium text-[22px] font-bricolage">
                          Blah blah blah
                        </div>
                        <div className="font-semibold font-['Inter'] text-[13px] text-[#37168B]">
                          01/11/2023
                        </div>
                        <div className="font-normal font-['Inter'] text-[#444746] text-[13px]">
                          Blah , blah, blah, 12345
                        </div>
                        <div className="w-full inline-flex items-center bg-white px-4 py-2 space-x-2.5 rounded-2xl">
                          <img src={wavingHand} />
                          <div className="font-normal font-['Inter'] text-[13px] text-[#181818]">
                            Childcare
                          </div>
                        </div>
                      </div>
                      <div className="font-normal font-['Inter'] text-[12px] px-5 py-2">
                        Open Spots: 2/20
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                  Anything you would like to add? The community lead will be
                  able to access this note.
                </div>
                {/*  */}
                <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                  <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                    <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                      Notes
                    </div>
                  </div>
                  <div className="self-stretch h-fit  border-collapse     ">
                    <div className=" h-14  justify-center items-start ">
                      <input
                        type="notes"
                        id="notes"
                        placeholder="Anything"
                        className="text-zinc-900 w-full h-full pl-4 rounded-[4px] text-base  font-normal font-roboto leading-normal tracking-wide"
                        // onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-x-[15px]">
                <button className="px-8 py-4 border rounded-full bg-violet-700 text-[#F8F9F0]">
                  Sign Up
                </button>
                <button
                  className="px-8 py-4 border border-[#5F35D5] rounded-full text-violet-700"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutreachSignup;
