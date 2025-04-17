import React from "react";

import Campaign from "../../images/campaign.svg";
import Outreach from "../../images/outreach.png";
import CustomButton from "../Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
// import { getDocs, collection, query } from "firebase/firestore";
// import { db } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import { fetchVisitLogs } from "../VisitLogCardService";
import HomePageVisitlog from "../HomePage/HomePageVisitlog";
import collectionMapping from "../../utils/firestoreCollections";

const visitLogs_collection = collectionMapping.visitLogs;

function Success2() {
  const navigate = useNavigate();
  // Commenting to reduce unnecessary database calls
  // const [donations, setDonations] = useState("");
  // const [helpedBy, setHelpedBy] = useState("");
  // const [helpedPeople, setHelpedPeople] = useState("");
  // const [visitLogs, setVisitLogs] = useState([]);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   const getValues = async () => {
  //     try {
  //       const logOfUserRef = query(collection(db, vistiLogs_collection));
  //       const data = await getDocs(logOfUserRef);
  //       let totalDonations = 0;
  //       let totalHelpedPeople = 0;
  //       let uniqueID = new Set();
  //       data.docs.map((doc) => {
  //         uniqueID.add(doc.data().uid);
  //         totalDonations =
  //           isNaN(doc.data().itemQty) ||
  //           typeof doc.data().itemQty === "undefined" ||
  //           doc.data().itemQty === ""
  //             ? totalDonations
  //             : totalDonations + parseInt(doc.data().itemQty);
  //         totalHelpedPeople =
  //           isNaN(doc.data().numberPeopleHelped) ||
  //           typeof doc.data().numberPeopleHelped === "undefined" ||
  //           doc.data().numberPeopleHelped === ""
  //             ? totalHelpedPeople
  //             : totalHelpedPeople + parseInt(doc.data().numberPeopleHelped);

  //         return null;
  //       });
  //       setDonations(
  //         isNaN(parseInt(totalDonations)) ? 0 : parseInt(totalDonations)
  //       );
  //       setHelpedBy(uniqueID.size);
  //       setHelpedPeople(totalHelpedPeople);
  //       const visitLogsData = await fetchVisitLogs();
  //       setVisitLogs(visitLogsData);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getValues();
  // }, []);

  return (
    <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
      <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
        {" "}
        Highlights of our success
      </p>

      <div className="w-fit h-fit my-8 p-7 bg-white rounded-[30px] justify-start items-start lg:gap-5 lg:inline-flex">
        <div className="w-20 h-20 p-4 bg-gradient-to-br from-yellow-100 to-neutral-200 rounded-3xl justify-start items-start gap-2.5 flex">
          <div className="w-12 h-12 relative">
            <img src={Campaign} className=""></img>
          </div>
        </div>

        <div className="grow font-bricolage basis-0 flex-col justify-start items-start gap-8 inline-flex">
          <div className="self-stretch pt-6 lg:pt-2 text-violet-800 text-[20px] font-bold leading-7">
            Great News!
          </div>
          <div className="self-stretch">
            <span className="text-neutral-900 text-[24px] font-medium leading-10">
              We've recently achieved the 2023 Platinum Seal from{" "}
            </span>
            <span className="text-violet-600 text-[24px] font-medium leading-10">
              <a href="https://candid.org/" target="_blank">
                Candid
              </a>
            </span>
            <span className="text-neutral-900 text-[24px] font-medium leading-10">
              ! This is our commitment to transparency and accountability in all
              we do.
            </span>
          </div>
          <div className="self-stretch font-bricolage text-[18px] font-small ">
            <p>
              We are excited to share the work our nonprofit does through our
              <a
                href="https://brightmindenrichment.org/about-us/"
                target="_blank"
                className="text-violet-600 underline"
              >
                {" "}
                Nonprofit Profile{" "}
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* Grid */}

      <div className=" mt-10 w-full h-fit justify-start items-start">
        <div className="w-full h-fit justify start items-start grid grid-cols-1 lg:grid-cols-3 font-bricolage">
          <div className="grow items-start h-full lg:items-center xl:items-start flex-col rounded-t-2xl  lg:rounded-tr-none lg:rounded-tl-2xl shrink basis-0  px-8 py-4 bg-gradient-to-br from-emerald-300 to-neutral-200 gap-6 flex">
            <div className="text-violet-950 text-2xl lg:text-xl  font-medium leading-loose">
              Homeless People Aided
            </div>
            <div className="flex lg:flex-col xl:flex-row gap-4 mt-auto ">
              <div className=" px-8 w-fit py-2 bg-white rounded-[100px]">
                <div className="text-violet-950  font-bricolage text-[40px] font-normal leading-[64px]">
                  {/* {helpedPeople} */}
                  1500+
                </div>
              </div>
              {/* <div className="w-fit text-violet-950 text-xl font-medium py-2  inline-flex mt-auto">
              homeless people
            </div> */}
            </div>
          </div>
          {/*  */}

          <div className="grow shrink items-start h-full lg:items-center xl:items-start flex-col basis-0 px-8 py-4 bg-gradient-to-br from-purple-300 to-zinc-200 justify-start  gap-6 flex">
            <div className="text-violet-950 text-2xl lg:text-xl font-medium leading-loose">
              Total Volunteers
            </div>
            <div className="flex lg:flex-col xl:flex-row gap-4 mt-auto">
              <div className=" px-8 w-fit py-2 bg-white rounded-[100px]">
                <div className="text-violet-950  font-bricolage text-[40px] font-normal leading-[64px]">
                  {/* {helpedBy} */}
                  700+
                </div>
              </div>
              {/* <div className="w-fit text-violet-950 text-xl font-medium py-2  inline-flex mt-auto">
              volunteers
            </div> */}
            </div>
          </div>
          {/*  */}

          <div className="grow items-start h-full lg:items-center xl:items-start flex-col rounded-br-none lg:rounded-tr-2xl lg:rounded-bl-none shrink basis-0 px-8 py-4 bg-gradient-to-br from-sky-300 to-neutral-200 justify-start  gap-6 flex">
            <div className="text-violet-950 text-2xl lg:text-xl font-medium leading-loose">
              Items Shared
            </div>
            <div className="flex lg:flex-col xl:flex-row gap-4 mt-auto">
              <div className=" px-8 w-fit py-2 bg-white rounded-[100px]">
                <div className="text-violet-950  font-bricolage text-[40px] font-normal leading-[64px]">
                  {/* {donations} */}
                  74000+
                </div>
              </div>
              {/* <div className="w-fit text-violet-950 text-xl font-medium py-2  inline-flex mt-auto">
              items
            </div> */}
            </div>
          </div>
        </div>

        <div className="w-full h-fit justify start items-start grid grid-cols-1 lg:grid-cols-3 font-bricolage">
          <div className="grow items-start h-full lg:items-center xl:items-start flex-col rounded-t-none  lg:rounded-tr-none lg:rounded-bl-2xl shrink basis-0 px-8 py-4 bg-gradient-to-br from-red-300 to-zinc-200 justify-start gap-6 flex">
            <div className="text-violet-950 text-2xl lg:text-xl font-medium leading-loose">
              People Mentored
            </div>
            <div className="flex lg:flex-col xl:flex-row gap-4 mt-auto">
              <div className=" px-8 w-fit py-2 bg-white rounded-[100px]">
                <div className="text-violet-950  font-bricolage text-[40px] font-normal leading-[64px]">
                  {/* {donations} */}
                  2300+
                </div>
              </div>
              {/* <div className="w-fit text-violet-950 text-xl font-medium py-2  inline-flex mt-auto">
              items
            </div> */}
            </div>
          </div>

          <div className="grow shrink items-start h-full lg:items-center xl:items-start flex-col basis-0 px-8 py-4 bg-gradient-to-br from-yellow-300 to-zinc-200 justify-start  gap-6 flex">
            <div className="text-violet-950 text-2xl lg:text-xl font-medium leading-loose">
              Total Outreaches
            </div>
            <div className="flex lg:flex-col xl:flex-row gap-4 mt-auto">
              <div className=" px-5 xl:px-8 w-fit py-2 bg-white rounded-[100px]">
                <div className="text-violet-950  font-bricolage text-[40px] font-normal leading-[64px] whitespace-nowrap">
                  {/* {donations} */}
                  67 Million
                </div>
              </div>
              {/* <div className="w-fit text-violet-950 text-xl font-medium py-2  inline-flex mt-auto">
              items
            </div> */}
            </div>
          </div>

          <div className="grow items-start h-full lg:items-center xl:items-start flex-col rounded-b-2xl lg:rounded-tr-none lg:rounded-bl-none shrink basis-0 px-8 py-4 bg-gradient-to-br from-orange-300 to-neutral-200 justify-start  gap-6 flex">
            <div className="text-violet-950 text-2xl lg:text-xl font-medium leading-loose">
              App User Rating
            </div>
            <div className="flex lg:flex-col xl:flex-row gap-4 mt-auto">
              <div className=" px-8 w-fit py-2 bg-white rounded-[100px]">
                <div className="text-violet-950  font-bricolage text-[40px] font-normal leading-[64px]">
                  {/* {donations} */}
                  4.9/5
                </div>
              </div>
              {/* <div className="w-fit text-violet-950 text-xl font-medium py-2  inline-flex mt-auto">
              items
            </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="neutral-100 mt-[72px]  flex justify-center items-center">
        <div className=" flex flex-col md:flex-row gap-6 md:gap-12">
          {/* Outreach Event Card */}
          <div className=" h-[265px] bg-white rounded-[30px] flex flex-col items-center text-center justify-center p-6">
            <img
              src={Outreach}
              alt="Outreach Icon"
              className="w-12 h-12 mb-4"
            />
            <p className="mt-4 font-dmsans font-normal text-[14px] leading-[22px] tracking-normal text-center text-[#444746]">
              Create an Outreach event today, turn compassion into action, and
              be the reason someone’s life changes for better!
            </p>

            <div className="mt-auto">
              <CustomButton
                label="Create an Outreach"
                name="buttondefault"
                onClick={() => {
                  navigate("/createOutreach");
                }}
              />
            </div>
          </div>

          {/* Visit Log Card */}
          <div className=" h-[265px] bg-white rounded-[30px] flex flex-col items-center text-center p-6">
            <img
              src={Outreach}
              alt="Outreach Icon"
              className="w-12 h-12 mb-4"
            />
            <p className="mt-4 font-dmsans font-normal text-[14px] leading-[22px] tracking-normal text-center text-[#444746]">
              Inspire others by sharing your impact and capture your journey of
              helping those in need with interaction logs!
            </p>
            <div className="mt-auto">
              <CustomButton
                label="Create a Interaction Log"
                name="buttondefault"
                onClick={() => {
                  navigate("/profile/personaloutform");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success2;
