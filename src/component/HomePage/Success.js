import React, { useState, useEffect } from "react";

import Campaign from "../../images/campaign.svg";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../firebase";

function Success() {

  const [donations, setDonations] = useState("");
  const [helpedBy, setHelpedBy] = useState("");
  // const [helpedPeople, setHelpedPeople] = useState("");
  useEffect(() => {
    const getValues = async () => {
      try {
        const logOfUserRef = query(
          collection(db, "testLog")
        );
        const data = await getDocs(logOfUserRef);
        let totalDonations = 0;
        // let totalHelpedPeople = 0;
        let uniqueID = new Set();
        data.docs.map((doc) => {
          uniqueID.add(doc.data().uid);
          totalDonations = (isNaN(doc.data().itemQty) || typeof doc.data().itemQty === 'undefined' || doc.data().itemQty === '')
            ? totalDonations
            : totalDonations + parseInt(doc.data().itemQty);

            // Assuming field is called peopleHelped in the collection
          // totalHelpedPeople = (isNaN(doc.data().peopleHelped))
          //   ? totalHelpedPeople
          //   : totalHelpedPeople + parseInt(doc.data().peopleHelped)
          
          return null;
        });
        setDonations(
          isNaN(parseInt(totalDonations)) ? 0 : parseInt(totalDonations)
        );
        setHelpedBy(uniqueID.size)
        // setHelpedPeople(totalHelpedPeople)
      } catch (err) {
        console.log(err);
      }
    };
    getValues();
  }, []);


  return (
    <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
      <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
        {" "}
        Highlights of our success
      </p>
      <div className="w-fit h-fit my-9 p-7 bg-white rounded-[30px] justify-start items-start lg:gap-5 lg:inline-flex">
        <div className="w-20 h-20 p-4 bg-gradient-to-br from-yellow-100 to-neutral-200 rounded-3xl justify-start items-start gap-2.5 flex">
          <div className="w-12 h-12 relative">
            <img src={Campaign} className=""></img>
          </div>
        </div>

        <div className="grow font-bricolage basis-0 flex-col justify-start items-start gap-8 inline-flex">
          <div className="self-stretch pt-6 lg:pt-2 text-violet-800 text-[20px] font-bold leading-7">
            Great News!!
          </div>
          <div className="self-stretch">
            <span className="text-neutral-900 text-[24px] font-medium leading-10">
              We've recently achieved the 2023 Platinum Seal from{" "}
            </span>
            <span className="text-violet-600 text-[24px] font-medium leading-10">
              Candid
            </span>
            <span className="text-neutral-900 text-[24px] font-medium leading-10">
              ! This is our commitment to transparency and accountability in all
              we do.
            </span>
          </div>
          <div className="self-stretch">
            <span className="text-neutral-900 text-lg font-normal leading-normal">
              We are excited to share the work our nonprofit does through our{" "}
            </span>
            <span className="text-violet-600 text-lg font-normal underline leading-normal">
              Nonprofit Profile
            </span>
            <span className="text-neutral-900 text-lg font-normal leading-normal">
              .{" "}
            </span>
          </div>
        </div>
      </div>
      {/* Grid */}

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
                {/* {helpedPeople} */}
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
                {helpedBy}
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
                {donations}
              </div>
            </div>
          </div>
          <div className="w-fit text-violet-950 text-xl font-medium py-2 md:ml-[-8px] inline-flex">
            items
          </div>
        </div>
        {/*  */}
      </div>
      {/* grid over */}
    </div>
  );
}

export default Success;
