import React, {useState, useRef, useEffect } from "react";
import CustomButton from "../Buttons/CustomButton";
import howtohelp from "../../images/howtohelp.png";
import howToHelpOutreachSample from "../../images/howToHelpSampleOutreach.png"

import CarePackage from "./CarePackage";

function HowToHelp() {
  const [selectedStep, setSelectedStep] = useState(1);

  const handleSelectStep = (step) => {
    setSelectedStep(step);
  };

  const renderStepContent = () => {
    switch (selectedStep) {
      case 1:
        return (
          <div className="flex px-10 ">
            <div className="space-y-10 ">
              <div className="space-y-2 pr-18">
                <div className="text-[22px] font-dmsans font-bold leading-7">Create or Signup to existing outreaches</div>
                <div className="text-[16px] font-dmsans text-[#181818] leading-6">With StreetCare, you can sign up to existing outreaches or create an outreach for any help request for which you could offer help.<br/>
                <br/>Outreaches are created by users that are willing to help for a particular cause for which they could provide help.</div>
              </div>
              <div className="space-y-2 pb-32">
                <div className="text-[22px] font-dmsans font-bold leading-7">Help Requests</div>
                <div className="text-[16px] font-dmsans text-[#181818] leading-6">If you come across people in need and not sure how to help them, create a help request for others to view and contribute if they could.</div>
              </div>
            </div>
            <div className="flex w-full justify-end">
               <div> <img src={howToHelpOutreachSample} /></div>
            </div>
          </div>
          );
      case 2:
        return <div>Content for Step 2</div>;
      case 3:
        return <div>Content for Step 3</div>;
      case 4:
        return <div>Content for Step 4</div>;
      default:
        return <div>Select a step</div>;
    }
  };

  const howToHelp = useRef();
  useEffect(() => {
    document.title = "How to help - Street Care";
  }, []);
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[79%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {/*  */}
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
                  <span className="font-dmsans text-[45px]">650k+</span>
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
                <img src={howtohelp} className="w-full" />
              </div>
            </div>
          </div>
          {/*  */}
        </div>
        <div className=" w-[95%] md:w-[90%] lg:w-[79%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          {/*  */}
          <div className="items-center justify-center p-8 lg:p-16 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <div className="flex-col justify-start items-start gap-10 inline-flex">
              <div>
                <div className="font-bricolage text-[57px]">
                  How to help with StreetCare
                </div>
                <div className="font-dmsans text-1 text-grey-300 font-normal">
                  We’ve made a simple guide on how you can contribute to the
                  homeless. Join our team of 700+ members and contribute in your
                  own way. More than 35% of our volunteers are first-time
                  volunteers.
                </div>
              </div>
              <div className="w-full">
                <div className="flex w-full">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`border-x border-y w-full cursor-pointer px-4 py-6 space-y-8 ${selectedStep === step ? 'bg-[#CEBFFC] border-[#6840E0] border-1 rounded-b-lg' : ''}`}
                      style={{
                        transform: selectedStep === step ? 'scaleY(1.05)' : 'none',
                        transformOrigin: 'top',
                      }}
                      onClick={() => handleSelectStep(step)}
                    >
                      <div className="bg-[#FFFFFF] px-4 py-2.5 rounded-full w-fit text-[14px]">Step {step}</div>
                      <div className="font-dmsans text-[24px] leading-8 text-[#616161]">
                        {/* Example description for each step */}
                        {step === 1 && <div className={`${selectedStep === step ? 'text-black' : ''}`}>Join an <br/> Outreach</div>}
                        {step === 2 && <div className={`${selectedStep === step ? 'text-black' : ''}`}>Prepare<br/> an <br/>Outreach</div>}
                        {step === 3 && <div className={`${selectedStep === step ? 'text-black' : ''}`}>Attend <br/> Outreach</div>}
                        {step === 4 && <div className={`${selectedStep === step ? 'text-black' : ''}`}>Document your <br/> Visit</div>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Step Content */}
                <div className="border-l-2 border-r-2 border-b-2 w-full py-10 rounded-b-2xl bg-white">
                  {renderStepContent()}
                </div>
                
              </div>
            </div>
          </div>
          {/*  */}
        </div>
        <div
          ref={howToHelp}
          className=" w-[95%] md:w-[90%] lg:w-[75%] mx-2 lg:mx-40 mt-8 rounded-2xl text-black scroll-m-16  "
        >
          {" "}
          <CarePackage />
          {/* Remove this component and create a new one for your code  */}
        </div>
        <div className="  w-[95%] md:w-[90%] lg:w-[75%] mx-2 lg:mx-40 mt-8 mb-20 rounded-2xl bg-white text-black ">
          {/* section 2 */}
          {/* <div className="items-center justify-center p-8 lg:py-24 lg:px-36 h-full w-full rounded-2xl bg-[#F7F7F7] ">
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
    </div>
  );
}

export default HowToHelp;
