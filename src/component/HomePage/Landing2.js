import React, { forwardRef, useImperativeHandle } from "react";
import one from "../../images/one.png";
import two from "../../images/two.png";
import three from "../../images/three.png";
import CustomButton from "../Buttons/CustomButton";

const Landing = forwardRef(({ scorllFuntion }, ref) => {
  const handleOnClick = () => {
    // Do something in the child component
    scorllFuntion(); // Call the parent function
  };
  useImperativeHandle(ref, () => ({
    // Expose parent function to parent component
    callParentFunction: handleOnClick,
  }));
  return (
    <div className="items-center justify-center px-4 py-8 lg:px-12 lg:py-15 xl:p-16 h-full w-full rounded-2xl  grid  xl:grid-cols-2 gap-5 lg:gap-9 bg-[#F7F7F7]">
      <div className="  flex-col">
        <p className="font-dmsans font-medium text-4xl md:text-[42px] md:leading-[48px]  text-black ">          
          <span>
            Support the homeless people.   
          </span>{" "}
          <span>
            Prepare care packages.   
          </span>{" "}
          <span>
            Join outreach.   
          </span>{" "}
          <span>
            Make a difference.
          </span>
        </p>
        <div className="mt-10 mb-5">
          <CustomButton
            label="Join Community Outreach"
            name="buttonlight"
            onClick={handleOnClick}
          />
        </div>
      </div>
      <div className=" grid grid-cols-1 gap-y-4">
        <div className=" grid grid-cols-5 gap-x-4">
          <img src={one} className=" rounded-2xl h-full w-fit col-span-2"></img>
          <img src={two} className=" rounded-2xl w-fit col-span-3"></img>
        </div>

        <div className="  col-span-2 ">
          <img src={three} className="rounded-2xl"></img>
        </div>
      </div>
    </div>
  );
});

export default Landing;
