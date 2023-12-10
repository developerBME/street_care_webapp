import React, { useState, useEffect } from "react";

import Campaign from "../../images/campaign.svg";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../firebase";
import cbsNews from "../../images/cbsNews.png";
import abc from "../../images/abc.png";
import eye from "../../images/eye.png";
import politico from "../../images/politico.png";
import newsweek from "../../images/newsweek.png";
import platinumSeal from "../../images/platinumSeal.png";
import goldSeal from "../../images/goldSeal.png";
import silverSeal from "../../images/silverSeal.png";
import bronzeSeal from "../../images/bronzeSeal.png";
import OutreachVisitLogCard from "../Community/OutreachVisitLogCard";
import arrowRight from "../../images/arrowRight.png";
import { useNavigate } from "react-router-dom";
import { fetchVisitLogs } from "../VisitLogCardService";

function Success() {
  const [donations, setDonations] = useState("");
  const [helpedBy, setHelpedBy] = useState("");
  const [helpedPeople, setHelpedPeople] = useState("");
  const [visitLogs, setVisitLogs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getValues = async () => {
      try {
        const logOfUserRef = query(collection(db, "testLog"));
        const data = await getDocs(logOfUserRef);
        let totalDonations = 0;
        let totalHelpedPeople = 0;
        let uniqueID = new Set();
        data.docs.map((doc) => {
          uniqueID.add(doc.data().uid);
          totalDonations =
            isNaN(doc.data().itemQty) ||
            typeof doc.data().itemQty === "undefined" ||
            doc.data().itemQty === ""
              ? totalDonations
              : totalDonations + parseInt(doc.data().itemQty);
          totalHelpedPeople =
            isNaN(doc.data().numberPeopleHelped) ||
            typeof doc.data().numberPeopleHelped === "undefined" ||
            doc.data().numberPeopleHelped === ""
              ? totalHelpedPeople
              : totalHelpedPeople + parseInt(doc.data().numberPeopleHelped);

          return null;
        });
        setDonations(
          isNaN(parseInt(totalDonations)) ? 0 : parseInt(totalDonations)
        );
        setHelpedBy(uniqueID.size);
        setHelpedPeople(totalHelpedPeople);
        const visitLogsData = await fetchVisitLogs();
        setVisitLogs(visitLogsData)
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
      {/* <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed rounded-[20px] font-bricolage"> */}
      <div className="bg-gradient-to-b from-[#FFF] from-0% to-[#FFFFE0] to-70% rounded-[30px] font-bricolage">
        <div className="w-full my-9 px-7 py-2.5">
          <div className="w-full flex items-center justify-center">
            <div className="text-center text-[10px] md:text-[12px] lg:text-[13px]">
              <b className="w-full">
                "Experts say [Bright Mind/Street Care's] app will start those
                conversations [to get those who aren't vaccinated, vaccinated]."
              </b>
            </div>
            <div className="w-16 h-16 items-center justify-center ">
              <a href="https://www.localsyr.com/news/looking-for-an-incentive-to-get-the-covid-19-vaccine-this-app-is-here-to-help/">
                <img src={cbsNews} className="mx-1 mt-1"></img>
              </a>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="text-center text-[10px] md:text-[12px] lg:text-[13px] font-bricolage">
              As Seen on
            </div>
            <div className="m-1 flex flex-row items-center">
              <div className="m-0.5 my-3">
                <a
                  href="https://www.news10.com/news/ny-news/monroe-county/new-app-aggregates-covid-vaccine-incentives-near-you/"
                  target="_blank"
                >
                  <img src={abc} className="w-8 h-8 md:w-10 md:h-10"></img>
                </a>
              </div>
              <div className="m-0.5 my-3">
                <a
                  href="https://www.rochesterfirst.com/news/local-news/looking-for-an-incentive-to-get-the-covid-19-vaccine-this-app-is-here-to-help/"
                  target="_blank"
                >
                  <img src={eye} className="w-8 h-8 md:w-10 md:h-10"></img>
                </a>
              </div>
              <div className="m-0.5 my-3">
                <a
                  href="https://www.politico.com/newsletters/global-translations/2021/08/04/no-jab-no-job-493847"
                  target="_blank"
                >
                  <img
                    src={politico}
                    className="w-36 h-8 md:w-40 md:h-8 lg:w-44 lg:h-10"
                  ></img>
                </a>
              </div>
              <div className="m-0.5 my-3">
                <a
                  href="https://www.newsweek.com/these-states-are-renewing-incentives-bid-get-more-people-vaccinated-1615393"
                  target="_blank"
                >
                  <img
                    src={newsweek}
                    className="w-36 h-8 md:w-40 md:h-8 lg:w-44 lg:h-10"
                  ></img>
                </a>
              </div>
            </div>
          </div>
          {/* <div className="pt-2"></div>
          <div className="w-full flex justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-2">
              <div className="flex flex-col gap-2">
                <img src={platinumSeal} className="w-8 h-8"></img>
                <img src={silverSeal} className="w-8 h-8"></img>
              </div>
              <div className="flex flex-col gap-2">
                <img src={goldSeal} className="w-8 h-8"></img>
                <img src={bronzeSeal} className="w-8 h-8"></img>
              </div>
              <div className="w-full flex flex-col items-left justify-center">
                <div className="text-left text-[10px] md:text-[12px] lg:text-[13px]">
                  <p>
                    We've just earned our 2023 Platinum Seal with{" "}
                    <b>
                      <a href="https://candid.org/" target="_blank">
                        Candid/Guidestar
                      </a>
                    </b>
                    , the premier nonprofit organization that evaluates
                    transparency.
                  </p>
                  <p>
                    We are excited to share the work our nonprofit does. Learn
                    how you can
                    <b>
                      <a
                        href="https://brightmindenrichment.org/job-openings/"
                        target="_blank"
                      >
                        {" "}
                        join us{" "}
                      </a>
                    </b>
                    or
                    <b>
                      <a
                        href="https://brightmindenrichment.org/support-us/"
                        target="_blank"
                      >
                        {" "}
                        support us{" "}
                      </a>
                    </b>{" "}
                    to make a difference.
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="w-fit h-fit my-2 p-7 bg-white rounded-[30px] justify-start items-start lg:gap-5 lg:inline-flex">
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
                Candid/Guidestar
              </a>
            </span>
            <span className="text-neutral-900 text-[24px] font-medium leading-10">
              ! This is our commitment to transparency and accountability in all
              we do.
            </span>
          </div>
          <div className="self-stretch font-bricolage text-[24px] font-medium">
            {/* <span className="text-neutral-900 text-lg font-normal leading-normal">
              We are excited to share the work our nonprofit does through our{" "}
            </span>
            <span className="text-violet-600 text-lg font-normal underline leading-normal">
              Nonprofit Profile
            </span>
            <span className="text-neutral-900 text-lg font-normal leading-normal">
              .{" "}
            </span>{" "} */}
            <p>
              We are excited to share the work our nonprofit does. Learn how you
              can
              <a
                href="https://brightmindenrichment.org/job-openings/"
                target="_blank"
                className="text-violet-600"
              >
                {" "}
                join us{" "}
              </a>
              or
              <a
                href="https://brightmindenrichment.org/support-us/"
                target="_blank"
                className="text-violet-600"
              >
                {" "}
                support us{" "}
              </a>{" "}
              to make a difference.
            </p>
          </div>
        </div>
      </div>
      {/* Grid */}

      <div className=" mt-10 w-full h-fit justify-start items-start">
        {/*  */}

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
      {/* grid over */}

      <div className="mt-8 space-y-9">
        <div className="flex justify-between">
          <div className="font-medium text-[45px] font-dmsans">
            Latest Actions - Visit Log
          </div>
          <div
            className="inline-flex items-center gap-2 font-medium text-[8px] lg:text-[13px] hover:cursor-pointer"
            onClick={() => {
              navigate("/allOutreachVisitLog");
            }}
          >
            View all
            <img src={arrowRight} className="w-4 h-4" />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
        {(visitLogs.map((visitLogData) => (
          <OutreachVisitLogCard visitLogCardData={visitLogData}/>
              )))}
        </div>
      </div>
    </div>
  );
}

export default Success;
