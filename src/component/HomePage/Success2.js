import Campaign from "../../images/campaign.svg";
import Outreach from "../../images/outreach.png";
import CustomButton from "../Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import useSuccessMetrics from "../../utils/successMetrics";
import { getAuth } from "firebase/auth";

function Success2() {
  const navigate = useNavigate();
  const { isLoading, error, metrics } = useSuccessMetrics();

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
              Street Care and Bright Mind have expanded national university
              engagement, connecting with 88 campuses and securing
              collaborations with Northeastern, UT Dallas, and Stanford.{" "}
            </span>
            {/* Saving the Hyperlink css for later.*/}
            {/* <span className="text-violet-600 text-[24px] font-medium leading-10">
              <a href="https://example.com" target="_blank">
                Candid
              </a>
            </span>*/}
          </div>
          {/* We'll be enabling this following on Monday.*/}
          {/* <div className="self-stretch font-bricolage text-[18px] font-small ">
            <p>
              Learn more about{" "}
              <a
                href="https://brightmindenrichment.org/about-us/"
                target="_blank"
                className="text-violet-600 underline"
              >
                The new grant funding
              </a>
              {" and "}
              <a
                href="https://brightmindenrichment.org/about-us/"
                target="_blank"
                className="text-violet-600 underline"
              >
                Volunteer training.
              </a>
            </p>
          </div>*/}
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
                  {metrics.HomelessPeopleAided.toLocaleString()}+
                </div>
              </div>
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
                  900+
                </div>
              </div>
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
                  {metrics.ItemsShared.toLocaleString()}+
                </div>
              </div>
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
                  {metrics.PeopleMentored.toLocaleString()}+
                </div>
              </div>
            </div>
          </div>

          <div className="grow shrink items-start h-full lg:items-center xl:items-start flex-col basis-0 px-8 py-4 bg-gradient-to-br from-yellow-300 to-zinc-200 justify-start  gap-6 flex">
            <div className="text-violet-950 text-2xl lg:text-xl font-medium leading-loose">
              Total Outreach
            </div>
            <div className="flex lg:flex-col xl:flex-row gap-4 mt-auto">
              <div className=" px-5 xl:px-8 w-fit py-2 bg-white rounded-[100px]">
                <div className="text-violet-950  font-bricolage text-[28px] font-normal leading-[64px] whitespace-nowrap">
                  {metrics.TotalOutreach.toLocaleString()} Million+ People
                </div>
              </div>
            </div>
          </div>

          <div className="grow items-start h-full lg:items-center xl:items-start flex-col rounded-b-2xl lg:rounded-tr-none lg:rounded-bl-none shrink basis-0 px-8 py-4 bg-gradient-to-br from-orange-300 to-neutral-200 justify-start  gap-6 flex">
            <div className="text-violet-950 text-2xl lg:text-xl font-medium leading-loose">
              {/* App User Rating */}
              Chapter Members
            </div>
            <div className="flex lg:flex-col xl:flex-row gap-4 mt-auto">
              <div className=" px-8 w-fit py-2 bg-white rounded-[100px]">
                <div className="text-violet-950  font-bricolage text-[40px] font-normal leading-[64px]">
                  {/* 4.9/5 */}
                  {metrics.ChapterMembers.toLocaleString()}+
                </div>
              </div>
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
                onClick={async () => {
                  const fAuth = await getAuth();
                  const user = fAuth.currentUser;

                  if (user) {
                    console.log("User is still logged in:", user);
                    navigate("/createOutreach");
                  } else {
                    console.log("User is not logged in");
                    navigate("/login"); // or show a message
                  }
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
                label="Create an Interaction Log"
                name="buttondefault"
                // onClick={async () => {
                //   const fAuth = await getAuth();
                //   const user = fAuth.currentUser;

                //   if (user) {
                //     navigate("/profile/personaloutform");
                //   } else {
                //     navigate("/login"); // or show a message
                //   }
                // }}
                onClick={() => {
                  navigate("profile/interactionLogForm");
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
