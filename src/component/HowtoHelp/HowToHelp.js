import React, { useState, useEffect, useRef } from "react";
import howtohelp from "../../images/howtohelp.png";
import howToHelpOutreachSample from "../../images/howToHelpSampleOutreach.png";
import EventOutrachesSection from "../HowtoHelp/EventOutrachesSection";
import groupOutreaches from "../../images/groupOutreaches.png";
import donate from "../../images/donate.png";
import spreadTheWord from "../../images/spreadTheWord.png";
import joinUsAsVolunteer from "../../images/joinAsVolunteer.png";
import arrowRight from "../../images/arrowRight.png";
import skipItem1 from "../../images/rectangle-1.png";
import skipItem2 from "../../images/rectangle-2.png";
import skipItem3 from "../../images/rectangle-3.png";
import skipItem4 from "../../images/rectangle-4.png";
import skipItem5 from "../../images/rectangle-5.png";
import sampleVisitLog from "../../images/sampleVisitLog.png";
import badge1 from "../../images/badge1.png";
import badge2 from "../../images/badge2.png";
import badge3 from "../../images/badge3.png";
import badge4 from "../../images/badge4.png";
import badge5 from "../../images/badge5.png";
import badge6 from "../../images/badge6.png";

/* ================= POPUP ================= */
const MEMBERSHIP_URL = "https://streetcare.us/chapter-membership-form/";
//const //LS_KEY = "sc_verify_popup_snooze_until"; // timestamp (ms)

function shouldShowPopup() {
  /*try {
    const snooze = Number(localStorage.getItem(LS_KEY) || 0);
    return Date.now() > snooze;
  } catch {
    return true;
  }*/
  return true;
}
/*function snooze(days = 7) {
  try {
    const until = Date.now() + days * 24 * 60 * 60 * 1000;
    localStorage.setItem(LS_KEY, String(until));
  } catch {}
}*/

function GetVerifiedPopup({ open, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = dialogRef.current?.querySelector("a,button");
    first?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleClose = () => {
    //snooze(7);
    onClose();
  };

  // 🆕 open StreetCare in a new tab (and keep your site)
  const handleCTA = () => {
    window.open(MEMBERSHIP_URL, "_blank", "noopener,noreferrer"); // 🆕
  };

  // 🆕 close when user clicks the dark backdrop
  const handleBackdropMouseDown = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
      onMouseDown={handleBackdropMouseDown} // 🆕
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl bg-white shadow-xl relative p-5"
        onMouseDown={(e) => e.stopPropagation()} // 🆕 prevent inner clicks from closing
      >
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 text-xl leading-none px-2"
          aria-label="Close" // (minor a11y improvement)
        >
          ×
        </button>
        <p className="m-0 text-xs font-bold tracking-wide text-[#2563EB]">
          NOW AVAILABLE
        </p>
        <h2 className="mt-1 mb-2 text-2xl font-bold">Get verified!</h2>
        <p className="text-sm leading-snug">
          Profile verification will allow anyone who is verified to post
          upcoming events and document their interactions with homeless
          individuals.
        </p>
        <button
          onClick={handleCTA}
          className="mt-4 ml-auto block rounded-full px-4 py-2 font-semibold text-white bg-black"
        >
          Become a Member
        </button>
      </div>
    </div>
  );
}
/* ======================================== */

const skipItems = [
  { image: skipItem1, content: "A ton of anything" },
  { image: skipItem2, content: "Alcohol" },
  { image: skipItem3, content: "Drugs" },
  { image: skipItem4, content: "Religious Material" },
  { image: skipItem5, content: "Political Material" },
];

const renderStepTitle = (step, selectedStep) => {
  switch (step) {
    case 1:
      return (
        <>
          <div className="bg-[#FFFFFF] px-4 py-2.5 rounded-full w-fit text-[14px]">
            Step {step}
          </div>
          <div className="font-dmsans text-[24px] leading-8 text-[#616161]">
            <div
              className={`${selectedStep === step ? "text-black" : ""} md:w-1/2`}
            >
              Join an Outreach
            </div>
          </div>
        </>
      );
    case 2:
      return (
        <>
          <div className="bg-[#FFFFFF] px-4 py-2.5 rounded-full w-fit text-[14px]">
            Step {step}
          </div>
          <div className="font-dmsans text-[24px] leading-8 text-[#616161]">
            <div
              className={`${selectedStep === step ? "text-black" : ""} md:w-1/2`}
            >
              Prepare an Outreach
            </div>
          </div>
        </>
      );
    case 3:
      return (
        <>
          <div className="bg-[#FFFFFF] px-4 py-2.5 rounded-full w-fit text-[14px]">
            Step {step}
          </div>
          <div className="font-dmsans text-[24px] leading-8 text-[#616161]">
            <div
              className={`${selectedStep === step ? "text-black" : ""} md:w-1/2`}
            >
              Attend Outreach
            </div>
          </div>
        </>
      );
    case 4:
      return (
        <>
          <div className="bg-[#FFFFFF] px-4 py-2.5 rounded-full w-fit text-[14px]">
            Step {step}
          </div>
          <div className="font-dmsans text-[24px] leading-8 text-[#616161]">
            <div
              className={`${selectedStep === step ? "text-black" : ""} md:w-1/2`}
            >
              Document your Interaction
            </div>
          </div>
        </>
      );
    default:
      return <></>;
  }
};

const renderStepContent = (selectedStep) => {
  switch (selectedStep) {
    case 1:
      return (
        <div className="flex flex-col px-10 md:flex-row">
          <div className="space-y-10 md:pr-18 md:w-2/3">
            <div className="space-y-2">
              <div className="text-[22px] font-dmsans font-bold leading-7">
                Create or Sign Up for existing outreaches
              </div>
              <div className="text-[16px] font-dmsans text-[#181818] leading-6">
                With StreetCare, you can sign up for existing outreaches or
                create an outreach for any help request where you can provide
                assistance.
                <br />
                <br />
                Outreaches are created by users who are willing to help for a
                particular cause where they can make a difference.
              </div>
            </div>
            <div className="space-y-2 pb-32">
              <div className="text-[22px] font-dmsans font-bold leading-7">
                Help Requests
              </div>
              <div className="text-[16px] font-dmsans text-[#181818] leading-6">
                If you come across someone in need and unsure how to assist,
                create a help request for others to view and contribute if they
                can.
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end md:justify-center md:w-1/3">
            <div>
              <img alt="" src={howToHelpOutreachSample} />
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <div className="flex px-10 gap-4 flex-col lg:flex-row">
            <div className="space-y-10 ">
              <div className="space-y-2 pr-18">
                <div className="text-[22px] font-dmsans font-bold leading-7">
                  How to prepare a care package?
                </div>
                <div className="text-[16px] font-dmsans text-[#181818] leading-6">
                  Remember that homeless individuals have diverse needs, so it's
                  important to tailor your outreach efforts to their specific
                  situations.
                  <br />
                  <br />
                  Building genuine connections and fostering trust is key to
                  making a positive impact.
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <div>{/* <img alt="" src={howtohelp} /> */}</div>
            </div>
          </div>
          <div className="px-10 pt-8">
            <p className="text-[16px] font-dmsans font-bold">Items to Skip</p>
            <div className="pt-4">
              <div className="w-full flex flex-wrap">
                {skipItems.map((item, index) => (
                  <div
                    key={item.content}
                    className="image-container px-[8px] lg:max-w-[90px] lg:min-w-[90px] w-[90px] mb-[25px]"
                  >
                    <img src={item.image} alt={`${index}`} />
                    <p className="text-[12px] pt-[10px]">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="space-y-[40px]">
          <div className="flex px-10 gap-4 flex-col lg:flex-row">
            <div className="space-y-10 ">
              <div className="space-y-2 pr-18">
                <div className="text-[22px] font-dmsans font-bold leading-7">
                  Show up to the outreach
                </div>
                <div className="text-[16px] font-dmsans text-[#181818] leading-6">
                  Homeless people are diverse group of people just like everyone
                  else, no matter their appearance, gender, age or race.
                  <br />
                  <br />
                  Some have fallen on hard times. Some may be struggling with
                  mental illness. But everyone wants to be treated with respect
                  and dignity.
                </div>
              </div>
            </div>
            <div className="flex  w-full justify-end">
              <div className="flex ">
                {/* <img alt="" src={howtohelp} /> */}
              </div>
            </div>
          </div>
          <div className="px-10 space-y-2">
            <div className="text-[22px] font-dmsans font-bold leading-7">
              Before attending:
            </div>
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="rounded-[30px] bg-[#F7F7F7] px-[20px] py-[24px] space-y-3">
                <div className="text-[16px] font-dmsans font-bold leading-7">
                  Let someone know
                </div>
                <div className="text-[16px] font-dmsans text-[#181818] leading-6">
                  During an outreach you may run into new neighborhoods. It
                  would help to keep someone informed about this outreach.
                </div>
              </div>
              <div className="rounded-[30px] bg-[#F7F7F7] px-[20px] py-[24px] space-y-3">
                <div className="text-[16px] font-dmsans font-bold leading-7">
                  Plan an introduction
                </div>
                <div className="text-[16px] font-dmsans text-[#181818] leading-6">
                  During an outreach you may run into new neighborhoods. It
                  would help to keep someone informed about this outreach.
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div>
          <div className="flex px-10 flex-col lg:flex-row ">
            <div className="space-y-10 md:w-3/5">
              <div className="space-y-2 pr-18">
                <div className="text-[22px] font-dmsans font-bold leading-7">
                  Log your interaction
                </div>
                <div className="text-[16px] font-dmsans text-[#181818] leading-6">
                  After your interaction, make sure you log your interaction to
                  the outreach on your profile using the streetcare website or
                  mobile application.
                </div>
              </div>
              <div className="space-y-2 pb-4">
                <div className="text-[22px] font-dmsans font-bold leading-7">
                  Earn Badges
                </div>
                <div className="text-[16px] font-dmsans text-[#181818] leading-6">
                  After your interaction, make sure you log your interaction to
                  the outreach on your profile using the streetcare website or
                  mobile application.
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end md:w-2/5">
              <div>
                <img alt="" src={sampleVisitLog} />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap px-10 hidden md:flex">
            <img
              alt=""
              src={badge1}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 max-w-[146px] max-h-[132px]"
            />
            <img
              alt=""
              src={badge2}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 max-w-[146px] max-h-[132px]"
            />
            <img
              alt=""
              src={badge3}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 max-w-[146px] max-h-[132px]"
            />
            <img
              alt=""
              src={badge4}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 max-w-[146px] max-h-[132px]"
            />
            <img
              alt=""
              src={badge5}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 max-w-[146px] max-h-[132px]"
            />
            <img
              alt=""
              src={badge6}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 max-w-[146px] max-h-[132px]"
            />
          </div>
        </div>
      );
    default:
      return <div>Select a step</div>;
  }
};

function HowToHelp() {
  const [selectedStep, setSelectedStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const handleSelectStep = (step) => {
    setSelectedStep(step);
  };

  useEffect(() => {
    document.title = "How to help - Street Care";
    // Force popup with ?verify=1 for testing
    setShowPopup(true);
  }, []);

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      {/* RENDER THE POPUP */}
      <GetVerifiedPopup open={showPopup} onClose={() => setShowPopup(false)} />

      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[79%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {/*  casaskasjlkalslssas*/}
          <div className="items-center justify-center p-8 lg:p-16 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <div className="flex-col justify-start items-start gap-10 inline-flex">
              <div className="w-fit text-neutral-800 text-[57px] font-medium font-bricolage leading-[64px]">
                Make a Difference,
                <br />
                <span className="text-[#6840E0]">
                  Your Support Transforms Lives
                </span>
              </div>
              <div className="w-fit text-zinc-600 text-lg font-normal font-open-sans leading-normal">
                Getting involved in addressing homelessness brings positive
                change to individuals, communities, and society. By joining the
                cause, you contribute to meaningful impact and personal
                fulfillment.
              </div>
              <div className="flex w-full ">
                <div className="bg-gradient-to-br from-[#D3F2CE] to-[#E7E7E7] p-8 w-full rounded-l-2xl">
                  <span className="font-dmsans text-[45px]">771k+</span>
                  <br />
                  <span className="font-dmsans text-[12px]">
                    Total homeless population in United States
                  </span>
                </div>
                <div className="bg-gradient-to-br from-[#D3C3FF] to-[#DEDCE4] p-8 w-full rounded-r-2xl">
                  <span className="font-dmsans text-[45px]">24%</span>
                  <br />
                  <span className="font-dmsans text-[12px]">
                    Homeless due to health conditions
                  </span>
                </div>
              </div>
              <div className="w-full">
                {/* <img alt="" src={howtohelp} className="w-full" /> */}
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[95%] md:w-[90%] lg:w-[79%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <div className="items-center justify-center p-8 lg:p-16 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <div className="flex-col justify-start items-start gap-10 inline-flex">
              <div>
                <div className="font-bricolage text-[57px]">
                  How to help with Street Care
                </div>
                <div className="font-dmsans text-1 text-grey-300 font-normal">
                  We’ve created a simple guide on how you can contribute to the
                  help homeless. Join our team of 700+ members and contribute in
                  your own way. Over 35% of our volunteers are first-time
                  volunteers.
                </div>
              </div>
              {/* Desktop screen */}
              <div className="w-full hidden md:block">
                <div className="flex w-full flex-col sm:flex-row">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`border-x border-y w-full cursor-pointer px-4 py-6 space-y-8 ${
                        selectedStep === step
                          ? "bg-[#CEBFFC] border-[#6840E0] border-1 rounded-b-lg"
                          : ""
                      }`}
                      style={{
                        transform:
                          selectedStep === step ? "scaleY(1.05)" : "none",
                        transformOrigin: "top",
                      }}
                      onClick={() => handleSelectStep(step)}
                    >
                      {renderStepTitle(step, selectedStep)}
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                <div className="border-l-2 border-r-2 border-b-2 w-full py-10 rounded-b-2xl bg-white">
                  {renderStepContent(selectedStep)}
                </div>
              </div>
              {/* Desktop screen end */}

              {/* Mobile screen */}
              <div className="w-full md:hidden">
                <div className="flex w-full flex-col sm:flex-row">
                  {[1, 2, 3, 4].map((step) => (
                    <React.Fragment key={step}>
                      <div
                        key={step}
                        className={`border-x border-y w-full cursor-pointer px-4 py-6 space-y-8 ${
                          selectedStep === step
                            ? "bg-[#CEBFFC] border-[#6840E0] border-1 rounded-b-lg"
                            : ""
                        }`}
                        style={{
                          transform:
                            selectedStep === step ? "scaleY(1.05)" : "none",
                          transformOrigin: "top",
                        }}
                        onClick={() => handleSelectStep(step)}
                      >
                        {renderStepTitle(step, selectedStep)}
                      </div>
                      {step === selectedStep && (
                        <div className="border-l-2 border-r-2 border-b-2 w-full py-10 rounded-b-2xl bg-white">
                          {renderStepContent(step)}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              {/* Mobile screen end */}
            </div>
          </div>
        </div>

        <div className=" w-[95%] md:w-[90%] lg:w-[79%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          <EventOutrachesSection />
        </div>

        <div className=" w-[95%] md:w-[90%] lg:w-[79%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          {/* <div className="items-center justify-center p-8 lg:p-16 h-full w-full rounded-2xl bg-[#F7F7F7] "> */}
          {/* <div className="flex-col justify-start items-start gap-10 inline-flex"> */}
          {/* <div className="space-y-12">
                <div className="font-bricolage text-[57px] text-[#273164] font-medium">
                  What else can I do to help?
                </div>
                <div className="grid grid-cols-2 md:flex md:flex-row md:gap-4 gap-4 lg:flex lg:flex-row lg:gap-4 ">
                  <div className="p-2 bg-[#FFFFFF] space-y-2 w-fit rounded-2xl">
                    <div>
                      <img alt="" src={groupOutreaches} />
                    </div>
                    <div className="font-dmsans font-medium text-[14px]">
                      Group Outreaches
                    </div>
                    <div className="w-4 h-4">
                      <img alt="" src={arrowRight} />
                    </div>
                  </div>
                  <div className="p-2 bg-[#FFFFFF] space-y-2 w-fit rounded-2xl">
                    <div>
                      <img alt="" src={joinUsAsVolunteer} />
                    </div>
                    <div className="font-dmsans font-medium text-[14px]">
                      Join us as Volunteer
                    </div>
                    <div className="w-4 h-4">
                      <img alt="" src={arrowRight} />
                    </div>
                  </div>
                  <div className="p-2 bg-[#FFFFFF] space-y-2 w-fit rounded-2xl">
                    <div>
                      <img alt="" src={spreadTheWord} />
                    </div>
                    <div className="font-dmsans font-medium text-[14px]">
                      Spread the Word
                    </div>
                    <div className="w-4 h-4">
                      <img alt="" src={arrowRight} />
                    </div>
                  </div>
                  <div className="p-2 bg-[#FFFFFF] space-y-2 w-fit rounded-2xl">
                    <div>
                      <img alt="" src={donate} />
                    </div>
                    <div className="font-dmsans font-medium text-[14px]">
                      Donate
                    </div>
                    <div className="w-4 h-4">
                      <img alt="" src={arrowRight} />
                    </div>
                  </div>
                </div>
              </div> */}
          {/* </div> */}
          {/* </div> */}
        </div>
        {/* <div className="  w-[95%] md:w-[90%] lg:w-[75%] mx-2 lg:mx-40 mt-8 mb-20 rounded-2xl bg-white text-black ">
          section 2
           <div className="items-center justify-center p-8 lg:py-24 lg:px-36 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <div className="text-neutral-800 text-2xl font-medium font-bricolage leading-loose">
              Next...
            </div>
            <div className="w-fit my-16  text-gray-800 text-[57px] font-medium font-bricolage leading-[64px]">
              "I Learned, Now I'll Share."
            </div>
            <CustomButton
              label="Send the guide to a friend"
              name="buttondefault"
            />
          </div> */}
      </div>
    </div>
  );
}

export default HowToHelp;
