import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import userImg from "../../images/user.jpeg";
import verifiedImg from "../../images/verified_purple.png";
import wavingHand from "../../images/waving_hand.png";
import CustomButton from "../Buttons/CustomButton";

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
                      <div className="text-[#000] text-sm font-normal font-inter leading-snug">
                        William Lee
                      </div>
                      <img src={verifiedImg} className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-fit px-6 py-2 flex-col justify-start items-start gap-4 flex">
                  <div className="self-stretch text-[#212121] text-2xl font-medium font-inter leading-loose">
                    {console.log(id)}
                    BK Fort Green Outreach
                  </div>
                  <div className="self-stretch text-[#37168B] text-sm font-medium font-inter leading-tight">
                    Sept 9, 2023 SAT 12:00pm
                  </div>
                  <div className="self-stretch h-[22px] flex-col justify-start items-start gap-1 flex">
                    <div className="self-stretch text-[#444746] text-sm font-normal font-inter leading-snug">
                      200 Eastern Pkwy, Brooklyn, NY 11238
                    </div>
                  </div>
                  <div className="self-stretch px-4 py-2 bg-white rounded-2xl justify-center items-center gap-2.5 inline-flex">
                    <img src={wavingHand} className="w-6 h-6" />
                    <div className="grow shrink basis-0 text-[#181818] text-sm font-normal font-inter leading-snug">
                      Childcare specialist needed
                    </div>
                  </div>
                </div>
                <div className="self-stretch px-6 pt-4 pb-6 justify-between items-center inline-flex">
                  <div className="text-[#444746] text-sm font-normal font-inter leading-snug">
                    Open Spots: 8/20
                  </div>
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
                <div className="h-10 bg-[#000]] rounded-[100px] border border-[#C8C8C8] flex-col justify-center items-center gap-2 inline-flex">
                  <div className="self-stretch grow shrink basis-0 px-6 py-2.5 justify-center items-center gap-2 inline-flex">
                    <button
                      className="text-center text-[#1F0A58] text-sm font-medium font-inter leading-tight"
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
      </div>
    </div>
  );
};

export default OutreachSignup;
