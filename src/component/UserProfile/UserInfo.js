import React , {useState , useEffect} from "react";

import user from "../../images/user.png";
import crown from "../../images/crown.png";
import notes from "../../images/notes.png";
import announcement from "../../images/announcement.png";
import {db} from "../firebase";
import { doc, getDoc,getDocs, collection, query,where } from "firebase/firestore";

const UserInfo =  () => {
  const userId = "Uej8TTFv5aXghZ6S8JfzhTo0nWw2"
  const [helped,setHelped] = useState("");
  const [donations,setDonations] = useState("");
  const logOfUserRef = query(collection(db, "visitLog"), where("uid", "==", userId));

  useEffect( ()=>{
    const getValues = async () =>{
      try {
      const data = await getDocs(logOfUserRef); 
      let totalHelped = 0;
      let totalDonations = 0;
      data.docs.map((doc)=> {
        totalHelped = totalHelped + doc.data().numberPeopleHelped; 
        // totalDonations = totalDonations + doc.data().numberIt; 
        return null;
      })
      setHelped(totalHelped);
      }
      catch(err){
        console.log(err);
      }
    }
    getValues()
  },[]);

  useEffect (()=>{console.log(helped)},[helped])
  return (
    <div>
      <div className="flex px-24 pt-24 pb-16">
        <div className="pr-16">
          <img
            src={user}
            alt="..."
            className="rounded-full h-56 w-56 border-none"
          />
        </div>
        <div className="py-8">
          <h1 className="font-bricolage text-[52px] font-medium h-16 text-[#212121]">
            Mandy Klose
          </h1>
          <h3 className="py-4 text-[#212121] font-bricolage text-sm">
            Joined 12/20/23
          </h3>
          <div className="flex flex-wrap">
            <div className="px-4 py-2 mr-2 h-10 bg-[#DEF6EB] rounded-full border border-[#CACACA] font-semibold">
              <h3 className="text-[#212121]">Spanish Speaker</h3>
            </div>
            <div className="px-4 py-2 mr-2 h-10 bg-[#DEF6EB] rounded-full border border-[#CACACA] font-semibold">
              <h3 className="text-[#212121]">Healthcare</h3>
            </div>
            <div className="px-4 py-2 mr-2 h-10 bg-[#DEF6EB] rounded-full border border-[#CACACA] font-semibold">
              <h3 className="text-[#212121]">Childcare</h3>
            </div>
            <button className="px-2 py-2 mr-2 h-10 rounded-md border border-[#CACACA] hover:bg-[#DEF6EB] text-[#212121] font-semibold">
              Add my superpower
            </button>
          </div>
        </div>
      </div>
      <div className="px-24 pb-16 grid grid-cols-3 grid-rows-2 gap-4">
        <div className="p-4 h-24 bg-[#DEF6EB] rounded-2xl flex border border-[#CACACA]">
          <img className="w-16 h-16 mr-4" src={crown}></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold pb-2 font-bricolage text-[#212121]">
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
        <div className="p-4 h-24 bg-[#DEF6EB] rounded-2xl flex border border-[#CACACA]">
          <img className="w-16 h-16 mr-4" src={notes}></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-2 pb-2 font-bricolage text-[#212121]">
              Volunteer Trainers
            </h1>
            <h3 className="text-xs mb-2 font-normal text-[#616161]">
              Led Community Orientation
            </h3>
          </div>
        </div>
        <div className="p-4 h-24 bg-[#DEF6EB] rounded-2xl flex border border-[#CACACA]">
          <img className="w-16 h-16 mr-4" src={announcement}></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-2 pb-2 font-bricolage text-[#212121]">
              Ambassador
            </h1>
            <h3 className="text-xs mb-2 font-normal text-[#616161]">
              Had invited friend to join
            </h3>
          </div>
        </div>
        <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA]">
          <img className="w-16 h-16 mr-4" src={crown}></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-2 pb-2 font-bricolage text-[#212121]">
              Neighborhood Leader
            </h1>
            <h3 className="text-xs mb-2 font-normal text-[#616161]">
              Joined {">"} 3 Outreach in the same neighborhood.
            </h3>
          </div>
        </div>
        <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA]">
          <img className="w-16 h-16 mr-4" src={crown}></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-2 pb-2 font-bricolage text-[#212121]">
              Information Sharer
            </h1>
            <h3 className="text-xs mb-2 font-normal text-[#616161]">
              Finish the 10 min how to Streetcare program
            </h3>
          </div>
        </div>
        <div className="p-4 h-24 rounded-2xl flex border border-[#CACACA]">
          <img className="w-16 h-16 mr-4" src={crown}></img>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold mt-2 pb-2 font-bricolage text-[#212121]">
              Seasoned Volunteer
            </h1>
            <h3 className="text-[11px] mb-2 font-normal text-[#616161]">
              Joined more than 4 outreaches or has helped more than 8 people.
            </h3>
          </div>
        </div>
      </div>
      <div className="px-24 pb-24">
        <h1 className="font-medium font-bricolage text-[44px] pb-16 text-[#212121]">
          My Impact
        </h1>
        <div className="w-full h-fit justify-start items-start  grid grid-cols-1 lg:grid-cols-3 font-bricolage">
          {/*  */}
          <div className="grow rounded-t-2xl  lg:rounded-tr-none lg:rounded-l-2xl shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-emerald-100 to-neutral-200 justify-start items-end gap-6 flex">
            <div className="flex-col justify-start items-start gap-6 inline-flex">
              <div className="text-[#1F0A58] text-2xl font-medium leading-loose">
                Helped
              </div>

              <div className="px-8 py-2 bg-white rounded-[100px] inline-flex">
                <div className="text-[#1F0A58]font-bricolage text-5xl font-normal leading-[64px]">
                  {helped}
                </div>
              </div>
            </div>
            <div className="w-fit text-[#1F0A58] text-xl font-medium py-2 md:ml-[-8px] inline-flex">
              homeless people
            </div>
          </div>
          {/*  */}
          <div className="grow shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-purple-300 to-zinc-200 justify-start items-end gap-6 flex">
            <div className="flex-col justify-start items-start gap-6 inline-flex">
              <div className="text-[#1F0A58] text-2xl font-medium leading-loose">
                Participated
              </div>
              <div className="px-6 py-2 bg-white rounded-[100px] inline-flex">
                <div className="text-[#1F0A58] font-bricolage text-5xl font-normal leading-[64px]">
                  264
                </div>
              </div>
            </div>
            <div className="w-fit text-[#1F0A58] text-xl font-medium py-2 md:ml-[-12px] inline-flex ">
              Outreaches
            </div>
          </div>
          {/*  */}
          <div className="grow rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none shrink basis-0 h-fit px-8 py-4 bg-gradient-to-br from-sky-200 to-neutral-200 justify-start items-end gap-6 flex">
            <div className="flex-col justify-start items-start gap-6 inline-flex">
              <div className="text-[#1F0A58] text-2xl font-medium leading-loose">
                Donated
              </div>
              <div className="px-6 py-2 bg-white rounded-[100px] inline-flex">
                <div className="text-[#1F0A58] font-bricolage text-5xl font-normal leading-[64px]">
                  1172{" "}
                </div>
              </div>
            </div>
            <div className="w-fit text-[#1F0A58] text-xl font-medium py-2 md:ml-[-8px] inline-flex">
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
