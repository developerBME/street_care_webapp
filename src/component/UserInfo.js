import React from "react";
import userAvatar from "../images/userAvatar.png";
import communityLeader from "../images/communityLeader.png";
const UserInfo = () => {
  return (
    <div>
      <div className="flex px-32 pt-32 pb-16">
        <div className="pr-16">
          <img
            src={userAvatar}
            alt="..."
            className="rounded-full h-56 w-56 border-none"
          />
        </div>
        <div className="py-8">
          <h1 className="font-bricolage text-[52px] font-medium h-16">
            Mandy Klose
          </h1>
          <h3 className="py-4 text-gray-600 font-bricolage text-sm">
            Joined 12/20/23
          </h3>
          <div className="flex flex-wrap">
            <div className="px-4 py-2 mr-2 h-10 bg-green-100 rounded-full border border-gray-300">
              <h3 className="">Spanish Speaker</h3>
            </div>
            <div className="px-4 py-2 mr-2 h-10 bg-green-100 rounded-full border border-gray-300">
              <h3 className="">Healthcare</h3>
            </div>
            <div className="px-4 py-2 mr-2 h-10 bg-green-100 rounded-full border border-gray-300">
              <h3 className="">Childcare</h3>
            </div>
            <button className="px-2 py-2 mr-2 h-10 rounded-md border border-gray-300 hover:bg-green-100">
              Add my superpower
            </button>
          </div>
        </div>
      </div>
      <div className="px-32 pb-16 grid grid-cols-3 grid-rows-2 gap-4">
        <div className="p-4 h-24 bg-green-100 rounded-2xl flex">
          <img className="w-16 h-16 mr-4" src={communityLeader}></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold pb-2 font-bricolage">
              Community Leader
            </h1>
            <h3 className="text-xs font-semibold pb-2 text-[#616161]">
              Achieved June 3rd, 2023
            </h3>
            <h3 className="text-xs font-normal text-[#616161]">
              Led Community Outreach
            </h3>
          </div>
        </div>
        <div className="p-4 h-24 bg-green-100 rounded-2xl flex">
          <img className="w-16 h-16 mr-4" src={communityLeader}></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-2 pb-2 font-bricolage">
              Volunteer Trainers
            </h1>
            <h3 className="text-xs mb-2 font-normal text-[#616161]">
              Led Community Orientation
            </h3>
          </div>
        </div>
        <div className="p-4 h-24 bg-green-100 rounded-2xl flex">
          <img className="w-16 h-16 mr-4" src={communityLeader}></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-2 pb-2 font-bricolage">
              Ambassador
            </h1>
            <h3 className="text-xs mb-2 font-normal text-[#616161]">
              Had invited friend to join
            </h3>
          </div>
        </div>
        <div className="p-4 h-24 bg-green-100 rounded-2xl flex">
          <img className="w-16 h-16 mr-4" src={communityLeader}></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-2 pb-2 font-bricolage">
              Neighborhood Leader
            </h1>
            <h3 className="text-xs mb-2 font-normal text-[#616161]">
              Joined {">"} 3 Outreach in the same neighborhood.
            </h3>
          </div>
        </div>
        <div className="p-4 h-24 bg-green-100 rounded-2xl flex">
          <img className="w-16 h-16 mr-4" src={communityLeader}></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-2 pb-2 font-bricolage">
              Information Sharer
            </h1>
            <h3 className="text-xs mb-2 font-normal text-[#616161]">
              Finish the 10 min how to Streetcare program
            </h3>
          </div>
        </div>
        <div className="p-4 h-24 bg-green-100 rounded-2xl flex">
          <img className="w-16 h-16 mr-4" src={communityLeader}></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-2 pb-2 font-bricolage">
              Seasoned Volunteer
            </h1>
            <h3 className="text-[11px] mb-2 font-normal text-[#616161]">
              Joined more than 4 outreaches or has helped more than 8 people.
            </h3>
          </div>
        </div>
      </div>
      <div className="px-32 pb-32">
        <h1 className="font-medium font-bricolage text-[44px] pb-16">
          My Impact
        </h1>
        <div className="w-full h-fit justify-start items-start  grid grid-cols-1 lg:grid-cols-3 font-bricolage">
          {/*  */}
          <div className="grow rounded-t-2xl  lg:rounded-tr-none lg:rounded-l-2xl shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-emerald-100 to-neutral-200 justify-start items-end gap-6 flex">
            <div className="flex-col justify-start items-start gap-6 inline-flex">
              <div className="text-violet-950 text-2xl font-medium leading-loose">
                We helped
              </div>

              <div className="px-8 py-2 bg-white rounded-[100px] inline-flex">
                <div className="text-violet-950 font-bricolage text-5xl font-normal leading-[64px]">
                  103
                </div>
              </div>
            </div>
            <div className="w-fit text-violet-950 text-xl font-medium py-2 md:ml-[-8px] inline-flex">
              homeless people
            </div>
          </div>
          {/*  */}
          <div className="grow shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-purple-300 to-zinc-200 justify-start items-end gap-6 flex">
            <div className="flex-col justify-start items-start gap-6 inline-flex">
              <div className="text-violet-950 text-2xl font-medium leading-loose">
                Helped by{" "}
              </div>
              <div className="px-6 py-2 bg-white rounded-[100px] inline-flex">
                <div className="text-violet-950 font-bricolage text-5xl font-normal leading-[64px]">
                  264
                </div>
              </div>
            </div>
            <div className="w-fit text-violet-950 text-xl font-medium py-2 md:ml-[-12px] inline-flex ">
              volunteers
            </div>
          </div>
          {/*  */}
          <div className="grow rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-sky-200 to-neutral-200 justify-start items-end gap-6 flex">
            <div className="flex-col justify-start items-start gap-6 inline-flex">
              <div className="text-violet-950 text-2xl font-medium leading-loose">
                Donated
              </div>
              <div className="px-6 py-2 bg-white rounded-[100px] inline-flex">
                <div className="text-violet-950 font-bricolage text-5xl font-normal leading-[64px]">
                  1172{" "}
                </div>
              </div>
            </div>
            <div className="w-fit text-violet-950 text-xl font-medium py-2 md:ml-[-8px] inline-flex">
              items
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
