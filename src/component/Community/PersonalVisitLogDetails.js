import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { fetchPersonalVisitLogById } from "../VisitLogCardService";
import date from "../../images/date.png";
import locate from "../../images/location.png";

const PersonalVisitLogDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchPersonalVisitLogById(id);
        setData(result);
      } catch (error) {
        console.error(error.message);
      }
    };

    getData(); // Invoke the async function
  }, []);

  return (
    <div className="relative flex flex-col items-center ">
      <div className=" mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black ">
        <div
          className=" absolute flex mt-[-50px] items-center cursor-pointer "
          onClick={() => {
            navigate("/profile");
          }}
        >
          <IoIosArrowBack className=" w-6 h-6" />{" "}
          <p className=" font-bricolage text-xl font-bold leading-7">
            Return to Profile
          </p>
        </div>
        <div className="px-[150px] py-[100px]">
          <div className="space-y-[64px]">
            <div className="font-medium font-dmsans text-[45px] text-neutral-800 leading-[52px]">
              Visit Log Details
            </div>
            <div className="bg-[#F5EEFE] rounded-2xl ">
              {/* <div className="inline-flex gap-2 items-center px-4 pt-6 py-2">
                <img src={profilePic} className="w-6 h-6 rounded-full" />
                <div>{data?.userName}</div>
                <img src={verifiedImg} className="w-5 h-5" />
              </div> */}
              <div className="px-6 py-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-row justify-normal space-x-2">
                    <img className="w-[13px] h-[15px] my-[3px]" src={date} />
                    <div class="text-violet-900 text-sm font-medium font-['DM Sans'] leading-tight pt-0.5">
                      {data?.dateTime.toDate().toLocaleString().toString()}
                    </div>
                  </div>
                  <div className="flex flex-row justify-normal space-x-2">
                    <img className="w-[12px] h-[15px] my-[3px]" src={locate} />
                    <div class="text-violet-900 text-sm font-medium font-['DM Sans'] leading-tight pt-0.5">
                      {data?.city || ""}, {data?.stateAbbv || data?.state || ""}
                    </div>
                  </div>
                  <div class="text-zinc-700 text-[16px] font-normal font-['DM Sans'] leading-snug max-w-3xl">
                    {data?.description || ""}
                  </div>
                  <div className="inline-flex items-center gap-2">
                    {data?.whatGiven.map((item, index) => (
                      <div
                        key={index}
                        className="py-1 px-3 border border-[#C8C8C8] w-fit rounded-xl text-[10px] text-[#444746]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row space-x-5">
                    <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
                      People Helped
                    </div>
                    <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
                      {data?.numberPeopleHelped}
                    </div>
                  </div>

                  <div className="flex flex-row space-x-5">
                    <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
                      Participants  
                      {/* //Changed from Items Donated on frontend */}
                    </div>
                    <div className="font-bold text-[14px] font-dmsans text-[#444746] line-clamp-1">
                      {data?.itemQty}
                    </div>
                  </div>

                  {/* <div className="flex flex-row space-x-2">
                    <img
                      className="w-[20px] h-[14px] my-1"
                      src={userSlots}
                    ></img>
                    <div className="font-normal font-dmsans text-[14px]">
                      {data?.filledSlots}
                    </div>
                  </div> */}
                  {/* <div className="inline-flex items-center bg-white px-4 py-1 space-x-2.5 rounded-2xl">
                    <img src={wavingHand} />
                    <div className="font-normal font-['Inter'] text-[10px] text-[#181818]">
                      {data?.need || ""}
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            {/* <div className="space-y-[32px]">
              <div className="text-neutral-800 text-[22px] font-bold font-['Bricolage Grotesque'] leading-7">
                Would you like to type a note you would like to share ?
              </div>
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
                    ></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-x-[15px]">
              <button className="px-8 py-4 border rounded-full bg-violet-700 text-[#F8F9F0]">
                Share
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalVisitLogDetails;
