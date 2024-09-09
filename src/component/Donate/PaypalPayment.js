import React, { useState } from "react";
const PaypalPayment = () => {
  const [isDonationBehalfChecked, setIsDonationBehalfChecked] = useState(false);

  const handleDonationBehalfCheckboxChange = () => {
    setIsDonationBehalfChecked((prevState) => !prevState);
  };

  return (
    <>
      <div className="w-full h-fit flex-col justify-start items-start gap-4 inline-flex">
        <div className="self-stretch text-black text-[22px] font-bold font-dmsans leading-7">
          Billing Information
        </div>
        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          <div className="w-[18px] h-[18px] justify-center items-center flex">
            <div className="p-[11px] rounded-[100px] justify-center items-center flex">
              {/* <div className="w-[18px] h-[18px] bg-slate-500 rounded-sm" />
              <div className="w-6 h-6 left-[8px] top-[8px] absolute" /> */}
              <input
                type="checkbox"
                id="donationbehalf-option"
                value="donationbehalf"
                className="w-[18px] h-[18px] cursor-pointer accent-[#5F36D6]"
                required=""
                checked={isDonationBehalfChecked}
                onChange={handleDonationBehalfCheckboxChange}
              ></input>
            </div>
          </div>
          <div className="grow shrink basis-0 text-black text-sm font-normal font-dmsans leading-snug">
            I am donating on behalf of a company or organization
          </div>
        </div>
        {isDonationBehalfChecked && (
          <div className="self-stretch justify-start items-start gap-4 inline-flex">
            <div className="grow shrink basis-0 h-[74px] rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
              <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
                Company/Organization Name
              </div>
              <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex">
                <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex">
                  <div className="justify-start items-center inline-flex w-full h-full">
                    <div className="w-full h-full">
                      <input
                        type="text"
                        id="companyName"
                        placeholder=""
                        className="text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          <div className="grow shrink basis-0 h-[74px] rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
              First Name
            </div>
            <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex">
                <div className="justify-start items-center inline-flex w-full h-full">
                  <div className="w-full h-full">
                    <input
                      type="text"
                      id="firstName"
                      placeholder=""
                      className="text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 h-[74px] rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
              Last Name
            </div>
            <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex">
                <div className="justify-start items-center inline-flex w-full h-full">
                  <div className="w-full h-full">
                    <input
                      type="text"
                      id="lastName"
                      placeholder=""
                      className="text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[74px] rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex">
          <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
            Street Address
          </div>
          <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex">
            <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex">
              <div className="justify-start items-center inline-flex w-full h-full">
                <div className="w-full h-full">
                  <input
                    type="text"
                    id="streetAddress"
                    placeholder=""
                    className="text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[74px] rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex">
          <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
            Country
          </div>
          <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex w-full">
            {/* <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex w-full"> */}
            {/* <div className="justify-start items-center inline-flex h-full w-full"> */}
            <div className="self-stretch h-full border-collapse w-full">
              {/* <div className="h-full inline-flex w-full"> */}
              <select
                className="text-zinc-900  w-full h-full px-4 rounded-[4px] text-[14px] font-normal font-dmsans leading-normal tracking-wide"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Country
                </option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
              {/* </div> */}
            </div>
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          <div className="grow shrink basis-0 rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
              City
            </div>
            <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex w-full">
              {/* <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex w-full"> */}
              {/* <div className="justify-start items-center inline-flex h-full w-full"> */}
              <div className="self-stretch h-full border-collapse w-full">
                {/* <div className="h-full inline-flex w-full"> */}
                <select
                  className="text-zinc-900  w-full h-full px-4 rounded-[4px] text-[14px] font-normal font-dmsans leading-normal tracking-wide"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select City
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
                {/* </div> */}
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
          <div className="grow shrink basis-0 rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
              State
            </div>
            <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex w-full">
              {/* <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex w-full"> */}
              {/* <div className="justify-start items-center inline-flex h-full w-full"> */}
              <div className="self-stretch h-full border-collapse w-full">
                {/* <div className="h-full inline-flex w-full"> */}
                <select
                  className="text-zinc-900  w-full h-full px-4 rounded-[4px] text-[14px] font-normal font-dmsans leading-normal tracking-wide"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select State
                  </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
                {/* </div> */}
              </div>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          <div className="grow shrink basis-0 rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
              Zip/Postal Code
            </div>
            <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex">
                <div className="justify-start items-center inline-flex w-full h-full">
                  <div className="w-full h-full">
                    <input
                      type="number"
                      id="zipCode"
                      placeholder=""
                      className="text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
              Contact (Phone, Email)
            </div>
            <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex">
                <div className="justify-start items-center inline-flex w-full h-full">
                  <div className="w-full h-full">
                    <input
                      type="text"
                      id="contactInfo"
                      placeholder=""
                      className="text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch text-black text-[22px] font-bold font-dmsans leading-7">
          Payment Information
        </div>
        <div className="self-stretch justify-start items-start gap-4 inline-flex">
          <div className="grow shrink basis-0 h-[74px] rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
            <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
              Paypal ID
            </div>
            <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex">
                <div className="justify-start items-center inline-flex w-full h-full">
                  <div className="w-full h-full">
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder=""
                      className="text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaypalPayment;
