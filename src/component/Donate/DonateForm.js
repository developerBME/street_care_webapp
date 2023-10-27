import React, { useState } from "react";
import CustomButton from "../Buttons/CustomButton";
import creditCard from "../../images/credit_card.svg";
import paypal from "../../images/paypal.svg";
import selectedIcon from "../../images/selected_icon.svg";
import CreditCardPayment from "./CreditCardPayment";

function DonateForm() {
  const [isFrequencyDivActive, setIsFrequencyDivActive] = useState(true);
  const [isNameDivActive, setIsNameDivActive] = useState(true);
  const [divAmounts] = useState([15, 25, 35, 50, 75, 100]);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [userAmount, setUserAmount] = useState("");
  const [isCreditCardPaymentActive, setIsCreditCardPaymentActive] =
    useState(false);

  const handleFrequencyDivClick = () => {
    setIsFrequencyDivActive((prevState) => !prevState);
  };

  const handleNameDivClick = () => {
    setIsNameDivActive((prevState) => !prevState);
  };

  const handleDivClick = (amount) => {
    setSelectedAmount(amount);

    if (amount === selectedAmount) {
      setSelectedAmount(null);
    }
  };

  const handleInputChange = (e) => {
    setUserAmount(e.target.value);
  };

  const handleCreditCardPayment = () => {
    setIsCreditCardPaymentActive(!isCreditCardPaymentActive);
  };

  const totalAmount =
    (selectedAmount || 0) + (userAmount ? parseInt(userAmount) : 0);

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className="w-full sm:w-[590px] md:w-[750px] lg:w-[930px] mt-32 mb-16 md:mt-40 md:mb-16 lg:mt-48 lg:mb-16 rounded-2xl bg-[#F7F7F7] h-fit">
          <div className="w-full h-fit px-8 py-8 md:px-28 md:py-16 lg:px-40 lg:py-24 flex-col justify-start items-start gap-16 inline-flex">
            <div className="w-fit text-[#212121] text-[45px] font-medium font-dmsans leading-[52px]">
              Donate
            </div>
            <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
              <div className="self-stretch text-[#000] text-[22px] font-bold font-dmsans leading-7">
                Frequency
              </div>
              <div className="self-stretch h-12 justify-center items-center inline-flex">
                <div className="grow shrink basis-0 h-12 py-1 justify-center items-center flex">
                  <div
                    className={`grow shrink basis-0 self-stretch rounded-tl-[100px] rounded-bl-[100px] border border-[#79747E] flex-row justify-center items-center inline-flex px-3 py-2.5 gap-2 text-center text-[#1D1B20] text-sm font-medium font-dmsans leading-tight ${
                      isFrequencyDivActive ? "bg-[#E8DEF8]" : "bg-[#FFF]"
                    }`}
                    onClick={handleFrequencyDivClick}
                  >
                    {isFrequencyDivActive ? (
                      <div className="w-[18px] h-[18px] relative">
                        <img src={selectedIcon} />
                      </div>
                    ) : (
                      ""
                    )}
                    {"  "} One time
                  </div>
                </div>
                <div className="grow shrink basis-0 h-12 py-1 justify-center items-center flex">
                  <div
                    className={`grow shrink basis-0 self-stretch bg-[#E8DEF8] rounded-tr-[100px] rounded-br-[100px] border border-[#79747E] flex-row justify-center items-center gap-2 inline-flex px-3 py-2.5 text-center text-[#1D1B20] text-sm font-medium font-dmsans leading-tight ${
                      isFrequencyDivActive ? "bg-[#FFF]" : "bg-[#E8DEF8]"
                    }`}
                    onClick={handleFrequencyDivClick}
                  >
                    {!isFrequencyDivActive ? (
                      <div className="w-[18px] h-[18px] relative">
                        <img src={selectedIcon} />
                      </div>
                    ) : (
                      ""
                    )}{" "}
                    {"  "} Monthly
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-start items-start gap-4 inline-flex">
                <div className="w-[18px] h-[18px] justify-center items-center flex">
                  <div className="p-[11px] rounded-sm justify-center items-center flex">
                    <input
                      type="checkbox"
                      id="agreement-option"
                      value="agreement"
                      class="w-[18px] h-[18px] cursor-pointer accent-[#5F36D6]"
                      required=""
                    ></input>
                  </div>
                </div>

                <div className="grow shrink basis-0 text-[#000] text-xs font-normal font-dmsans leading-[18px] tracking-tight">
                  I understand by providing my credit card information, I
                  authorize Bright Mind Enrichment and Education to charge my
                  credit card on a recurring basis in the amount indicated
                  above. I understand that this authorization shall remain in
                  effect until I notify at least 30 days piror to the upcoming
                  charge that I wish to end this agreement. I understand my
                  credit card issuer may impose additional requirements and I
                  should contact the credit card issuer for furthe information.
                  A record of my contributions will appear on my billing
                  statement.
                </div>
              </div>
            </div>
            <div className="self-stretch h-fit flex-col justify-start items-start gap-8 flex">
              <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
                <div className="self-stretch text-[#000] text-[22px] font-bold font-dmsans leading-7">
                  Select Amount
                </div>
                <div className="self-stretch justify-start items-start gap-4 inline-flex flex-wrap sm:flex-nowrap">
                  {divAmounts.map((amount, index) => (
                    <div
                      key={index}
                      onClick={() => handleDivClick(amount)}
                      className={`h-8 px-6 py-1.5 rounded-lg justify-center items-start gap-2.5 flex text-sm font-medium font-dmsans leading-tight w-24  ${
                        selectedAmount === amount
                          ? "bg-[#6840E0] text-[#F6F3FF]"
                          : "bg-[#FFF] text-[#000]"
                      }`}
                    >
                      ${amount}
                    </div>
                  ))}
                </div>

                <div className="self-stretch h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex">
                  <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
                    Other amount
                  </div>
                  <div className="self-stretch w-full h-fit flex-col justify-start items-start flex border border-[#C8C8C8] rounded-[4px]">
                    <div className="absolute w-fit bg-white ml-3 mt-[17px] px-1 justify-start items-center inline-flex">
                      <div className="text-[#444746] text-sm font-normal font-dmsans leading-none">
                        $
                      </div>
                    </div>
                    <div className="self-stretch h-12 border-collapse">
                      <div className="h-full w-full justify-center items-start">
                        <input
                          type="number"
                          value={userAmount}
                          onChange={handleInputChange}
                          className={`text-[#444746] w-full h-full pl-7 rounded-[4px] text-sm font-normal font-dmsans leading-normal tracking-wide`}
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch justify-start items-start gap-4 inline-flex">
                  <div className="w-[18px] h-[18px] justify-center items-center flex">
                    <div className="p-[11px] rounded-sm justify-center items-center flex">
                      <input
                        type="checkbox"
                        id="extradonation-option"
                        value="extradonation"
                        class="w-[18px] h-[18px] cursor-pointer accent-[#5F36D6]"
                        required=""
                      ></input>
                    </div>
                  </div>
                  <div className="grow shrink basis-0 text-black text-sm font-normal font-dmsans leading-snug">
                    I’d love to help even more by covering the transaction fees
                    for my donation. My total amount will be{" "}
                    {totalAmount + totalAmount * 0.05}.
                  </div>
                </div>
                <div className="self-stretch justify-start items-start gap-4 inline-flex">
                  <div className="w-[18px] h-[18px] justify-center items-center flex">
                    <div className="p-[11px] rounded-sm justify-center items-center flex">
                      <input
                        type="checkbox"
                        id="gift-option"
                        value="gift"
                        class="w-[18px] h-[18px] cursor-pointer accent-[#5F36D6]"
                        required=""
                      ></input>
                    </div>
                  </div>
                  <div className="grow shrink basis-0 text-black text-sm font-normal font-dmsans leading-snug">
                    Make this gift in honor or memory of someone
                  </div>
                </div>
                <div className="self-stretch h-12 justify-center items-center inline-flex">
                  <div className="grow shrink basis-0 h-12 py-1 justify-center items-center flex">
                    <div
                      className={`grow shrink basis-0 self-stretch rounded-tl-[100px] rounded-bl-[100px] border border-[#79747E] flex-row justify-center items-center inline-flex px-3 py-2.5 gap-2 text-center text-[#1D1B20] text-sm font-medium font-dmsns leading-tight ${
                        isNameDivActive ? "bg-[#E8DEF8]" : "bg-[#FFF]"
                      }`}
                      onClick={handleNameDivClick}
                    >
                      {isNameDivActive ? (
                        <div className="w-[18px] h-[18px] relative">
                          <img src={selectedIcon} />
                        </div>
                      ) : (
                        ""
                      )}{" "}
                      {"  "} In honor of
                    </div>
                  </div>
                  <div className="grow shrink basis-0 h-12 py-1 justify-center items-center flex">
                    <div
                      className={`grow shrink basis-0 self-stretch bg-[#E8DEF8] rounded-tr-[100px] rounded-br-[100px] border border-[#79747E] flex-row justify-center items-center gap-2 inline-flex px-3 py-2.5 text-center text-[#1D1B20] text-sm font-medium font-dmsans leading-tight ${
                        isNameDivActive ? "bg-[#FFF]" : "bg-[#E8DEF8]"
                      }`}
                      onClick={handleNameDivClick}
                    >
                      {!isNameDivActive ? (
                        <div className="w-[18px] h-[18px] relative">
                          <img src={selectedIcon} />
                        </div>
                      ) : (
                        ""
                      )}{" "}
                      {"  "} In memory of
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex">
                  <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
                    Enter your loves one’s name here (Optional)
                  </div>
                  <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex">
                    <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex">
                      <div className="justify-start items-center inline-flex w-full h-full">
                        <div className="w-full h-full">
                          <input
                            type="text"
                            id="donationBehalfName"
                            placeholder=""
                            className="text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none"
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-[158px] flex-col justify-start items-start gap-4 flex">
                <div className="self-stretch text-black text-[22px] font-bold font-['DM Sans'] leading-7">
                  Payment Method
                </div>
                <div className="justify-start items-start gap-4 inline-flex">
                  <div className="w-[150px] sm:w-[200px] p-4 bg-white rounded-[20px] flex-col justify-start items-center gap-2.5 inline-flex">
                    <div className="w-[52px] h-[52px] relative">
                      <div className="w-[42px] h-[52px] left-[7px] top-0 absolute">
                        <img src={paypal}></img>
                      </div>
                    </div>
                    <div className="text-[#000] text-sm font-medium font-dmsans leading-tight">
                      Paypal
                    </div>
                  </div>
                  <div
                    className={`w-[150px] sm:w-[200px] p-4 bg-white rounded-[20px] flex-col justify-start items-center gap-2.5 inline-flex ${
                      isCreditCardPaymentActive
                        ? "border-4 border-violet-600"
                        : "border-none"
                    }`}
                    onClick={handleCreditCardPayment}
                  >
                    <div className="w-[52px] h-[52px] relative">
                      <div className="w-[52px] h-[52px] left-0 top-0 absolute">
                        <img src={creditCard}></img>
                      </div>
                    </div>
                    <div className="text-[#000] text-sm font-medium font-dmsans leading-tight">
                      Credit Card
                    </div>
                  </div>
                </div>
              </div>
              {isCreditCardPaymentActive && <CreditCardPayment />}
              <div className="justify-start items-start gap-4 inline-flex">
                <div className="justify-start items-start gap-4 flex">
                  <CustomButton
                    label="Continue"
                    name="buttondefault"
                    // onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonateForm;

// import React, { useState } from "react";
// import CustomButton from "../Buttons/CustomButton";
// import ConfirmationModal from "./../UserProfile/ConfirmationModal";
// import creditCard from "../../images/credit_card.svg";
// import paypal from "../../images/paypal.svg";
// import selectedIcon from "../../images/selected_icon.svg";
// import CreditCardPayment from "./CreditCardPayment";

// function DonateForm() {
//   const [isFrequencyDivActive, setIsFrequencyDivActive] = useState(true);
//   const [isNameDivActive, setIsNameDivActive] = useState(true);
//   const [amountDivActive, setAmountDivActive] = useState(null);
//   const [isCreditCardPaymentActive, setIsCreditCardPaymentActive] =
//     useState(false);
//   const [otherAmountValue, setOtherAmountValue] = useState("");

//   const handleFrequencyDivClick = () => {
//     setIsFrequencyDivActive((prevState) => !prevState);
//   };

//   const handleNameDivClick = () => {
//     setIsNameDivActive((prevState) => !prevState);
//   };

//   const handleToggle = (index) => {
//     setAmountDivActive(index);

//     if (index === amountDivActive) {
//       setAmountDivActive(null);
//     }
//   };

//   const handleOtherAmountChange = (e) => {
//     setOtherAmountValue(e.target.value);
//   };

//   const totalAmount = amountDivActive !== null ? amountDivActive : 0;

//   const handleCreditCardPayment = () => {
//     setIsCreditCardPaymentActive(!isCreditCardPaymentActive);
//   };

//   const amounts = [15, 25, 35, 50, 75, 100];

//   return (
//     <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
//       <div className="relative flex flex-col items-center ">
//         <div className="w-fit md:w-[930px] mx-2 mt-48 mb-16 rounded-2xl bg-[#F7F7F7] h-fit">
//           <div className="w-full h-fit px-40 py-24 flex-col justify-start items-start gap-16 inline-flex">
//             <div className="w-fit text-[#212121] text-[45px] font-medium font-dmsans leading-[52px]">
//               Donate
//             </div>
//             <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
//               <div className="self-stretch text-[#000] text-[22px] font-bold font-dmsans leading-7">
//                 Frequency
//               </div>
//               <div className="self-stretch h-12 justify-center items-center inline-flex">
//                 <div className="grow shrink basis-0 h-12 py-1 justify-center items-center flex">
//                   <div
//                     className={`grow shrink basis-0 self-stretch rounded-tl-[100px] rounded-bl-[100px] border border-[#79747E] flex-row justify-center items-center inline-flex px-3 py-2.5 gap-2 text-center text-[#1D1B20] text-sm font-medium font-dmsans leading-tight ${
//                       isFrequencyDivActive ? "bg-[#E8DEF8]" : "bg-[#FFF]"
//                     }`}
//                     onClick={handleFrequencyDivClick}
//                   >
//                     {isFrequencyDivActive ? (
//                       <div className="w-[18px] h-[18px] relative">
//                         <img src={selectedIcon} />
//                       </div>
//                     ) : (
//                       ""
//                     )}
//                     {"  "} One time
//                   </div>
//                 </div>
//                 <div className="grow shrink basis-0 h-12 py-1 justify-center items-center flex">
//                   <div
//                     className={`grow shrink basis-0 self-stretch bg-[#E8DEF8] rounded-tr-[100px] rounded-br-[100px] border border-[#79747E] flex-row justify-center items-center gap-2 inline-flex px-3 py-2.5 text-center text-[#1D1B20] text-sm font-medium font-dmsans leading-tight ${
//                       isFrequencyDivActive ? "bg-[#FFF]" : "bg-[#E8DEF8]"
//                     }`}
//                     onClick={handleFrequencyDivClick}
//                   >
//                     {!isFrequencyDivActive ? (
//                       <div className="w-[18px] h-[18px] relative">
//                         <img src={selectedIcon} />
//                       </div>
//                     ) : (
//                       ""
//                     )}{" "}
//                     {"  "} Monthly
//                   </div>
//                 </div>
//               </div>
//               <div className="self-stretch justify-start items-start gap-4 inline-flex">
//                 <div className="w-[18px] h-[18px] justify-center items-center flex">
//                   <div className="p-[11px] rounded-sm justify-center items-center flex">
//                     {/* <div className="w-[18px] h-[18px] bg-slate-500 rounded-sm" /> */}
//                     {/* <div className="w-6 h-6 left-[8px] top-[8px] absolute" /> */}
//                     <input
//                       type="checkbox"
//                       id="agreement-option"
//                       value="agreement"
//                       class="w-[18px] h-[18px] cursor-pointer accent-[#5F36D6]"
//                       required=""
//                     ></input>
//                   </div>
//                 </div>

//                 <div className="grow shrink basis-0 text-[#000] text-xs font-normal font-dmsans leading-[18px] tracking-tight">
//                   I understand by providing my credit card information, I
//                   authorize Bright Mind Enrichment and Education to charge my
//                   credit card on a recurring basis in the amount indicated
//                   above. I understand that this authorization shall remain in
//                   effect until I notify at least 30 days piror to the upcoming
//                   charge that I wish to end this agreement. I understand my
//                   credit card issuer may impose additional requirements and I
//                   should contact the credit card issuer for furthe information.
//                   A record of my contributions will appear on my billing
//                   statement.
//                 </div>
//               </div>
//             </div>
//             <div className="self-stretch h-fit flex-col justify-start items-start gap-8 flex">
//               <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
//                 <div className="self-stretch text-[#000] text-[22px] font-bold font-dmsans leading-7">
//                   Select Amount
//                 </div>
//                 <div className="self-stretch justify-start items-start gap-4 inline-flex">
//                   {amounts.map((index) => (
//                     <div
//                       key={index}
//                       className={`h-8 px-6 py-1.5 rounded-lg justify-center items-start gap-2.5 flex text-sm font-medium font-dmsans leading-tight w-24 ${
//                         amountDivActive === index
//                           ? "bg-[#6840E0] text-[#F6F3FF]"
//                           : "bg-[#FFF] text-[#000]"
//                       }`}
//                       onClick={() => handleToggle(index)}
//                     >
//                       ${index}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="self-stretch h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex">
//                   <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
//                     Other amount
//                   </div>
//                   {/* <div className="self-stretch h-12 px-2 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex">
//                     <div className="grow shrink basis-0 w-full h-full flex-col justify-center items-start inline-flex">
//                       <div className="justify-start items-center inline-flex w-full h-full">
//                         <div className="text-[#444746] text-sm font-normal font-dmsans leading-snug">
//                           $
//                         </div>
//                         <div className="w-full h-full">
//                           <input
//                             type="number"
//                             id="amount"
//                             placeholder=""
//                             className="text-[#444746] w-full h-full ml-3 pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none"
//                           ></input>
//                         </div>
//                       </div>
//                     </div>
//                   </div> */}

//                   <div className="self-stretch w-full h-fit flex-col justify-start items-start flex border border-[#C8C8C8] rounded-[4px]">
//                     <div className="absolute w-fit bg-white ml-3 mt-[17px] px-1 justify-start items-center inline-flex">
//                       <div className="text-[#444746] text-sm font-normal font-dmsans leading-none">
//                         $
//                       </div>
//                     </div>
//                     <div className="self-stretch h-12 border-collapse">
//                       <div className="h-full w-full justify-center items-start">
//                         <input
//                           type="number"
//                           id="otherAmount"
//                           value={otherAmountValue}
//                           placeholder=""
//                           className={`text-[#444746] w-full h-full pl-7 rounded-[4px] text-sm font-normal font-dmsans leading-normal tracking-wide`}
//                           required={true}
//                           onChange={handleOtherAmountChange}
//                         ></input>
//                       </div>
//                       <h1>{otherAmountValue}</h1>
//                     </div>
//                   </div>

//                   {/* <span className="text-gray-500">$</span> */}
//                   {/* <input
//                     type="number"
//                     id=""
//                     placeholder=""
//                     className="text-zinc-900 w-full h-full rounded-[4px] text-base font-normal font-roboto leading-normal tracking-wide border-none"
//                   ></input> */}
//                 </div>
//                 <div className="self-stretch justify-start items-start gap-4 inline-flex">
//                   {/* <div className="w-[18px] h-[18px] justify-center items-center flex">
//                     <div className="p-[11px] rounded-[100px] justify-center items-center flex">
//                       <div className="w-[18px] h-[18px] bg-slate-500 rounded-sm" />
//                       <div className="w-6 h-6 left-[8px] top-[8px] absolute" />
//                     </div>
//                   </div> */}
//                   <div className="w-[18px] h-[18px] justify-center items-center flex">
//                     <div className="p-[11px] rounded-sm justify-center items-center flex">
//                       {/* <div className="w-[18px] h-[18px] bg-slate-500 rounded-sm" /> */}
//                       {/* <div className="w-6 h-6 left-[8px] top-[8px] absolute" /> */}
//                       <input
//                         type="checkbox"
//                         id="extradonation-option"
//                         value="extradonation"
//                         class="w-[18px] h-[18px] cursor-pointer accent-[#5F36D6]"
//                         required=""
//                       ></input>
//                     </div>
//                   </div>
//                   <div className="grow shrink basis-0 text-black text-sm font-normal font-dmsans leading-snug">
//                     I’d love to help even more by covering the transaction fees
//                     for my donation. My total amount will be{" "}
//                     {totalAmount + totalAmount * 0.05}.
//                   </div>
//                 </div>
//                 <div className="self-stretch justify-start items-start gap-4 inline-flex">
//                   {/* <div className="w-[18px] h-[18px] justify-center items-center flex">
//                     <div className="p-[11px] rounded-[100px] justify-center items-center flex">
//                       <div className="w-[18px] h-[18px] bg-slate-500 rounded-sm" />
//                       <div className="w-6 h-6 left-[8px] top-[8px] absolute" />
//                     </div>
//                   </div> */}
//                   <div className="w-[18px] h-[18px] justify-center items-center flex">
//                     <div className="p-[11px] rounded-sm justify-center items-center flex">
//                       {/* <div className="w-[18px] h-[18px] bg-slate-500 rounded-sm" /> */}
//                       {/* <div className="w-6 h-6 left-[8px] top-[8px] absolute" /> */}
//                       <input
//                         type="checkbox"
//                         id="gift-option"
//                         value="gift"
//                         class="w-[18px] h-[18px] cursor-pointer accent-[#5F36D6]"
//                         required=""
//                       ></input>
//                     </div>
//                   </div>
//                   <div className="grow shrink basis-0 text-black text-sm font-normal font-dmsans leading-snug">
//                     Make this gift in honor or memory of someone
//                   </div>
//                 </div>
//                 <div className="self-stretch h-12 justify-center items-center inline-flex">
//                   <div className="grow shrink basis-0 h-12 py-1 justify-center items-center flex">
//                     <div
//                       className={`grow shrink basis-0 self-stretch rounded-tl-[100px] rounded-bl-[100px] border border-[#79747E] flex-row justify-center items-center inline-flex px-3 py-2.5 gap-2 text-center text-[#1D1B20] text-sm font-medium font-dmsns leading-tight ${
//                         isNameDivActive ? "bg-[#E8DEF8]" : "bg-[#FFF]"
//                       }`}
//                       onClick={handleNameDivClick}
//                     >
//                       {isNameDivActive ? (
//                         <div className="w-[18px] h-[18px] relative">
//                           <img src={selectedIcon} />
//                         </div>
//                       ) : (
//                         ""
//                       )}{" "}
//                       {"  "} In honor of
//                     </div>
//                   </div>
//                   <div className="grow shrink basis-0 h-12 py-1 justify-center items-center flex">
//                     <div
//                       className={`grow shrink basis-0 self-stretch bg-[#E8DEF8] rounded-tr-[100px] rounded-br-[100px] border border-[#79747E] flex-row justify-center items-center gap-2 inline-flex px-3 py-2.5 text-center text-[#1D1B20] text-sm font-medium font-dmsans leading-tight ${
//                         isNameDivActive ? "bg-[#FFF]" : "bg-[#E8DEF8]"
//                       }`}
//                       onClick={handleNameDivClick}
//                     >
//                       {/* <div className="w-[18px] h-[18px] relative">
//                           <img src={selectedIcon} />
//                         </div> */}
//                       {!isNameDivActive ? (
//                         <div className="w-[18px] h-[18px] relative">
//                           <img src={selectedIcon} />
//                         </div>
//                       ) : (
//                         ""
//                       )}{" "}
//                       {"  "} In memory of
//                     </div>
//                   </div>
//                 </div>
//                 <div className="self-stretch h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex">
//                   <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
//                     Enter your loves one’s name here (Optional)
//                   </div>
//                   {/* <div className="self-stretch h-12 px-4 py-1 bg-white rounded border border-stone-300 justify-start items-center gap-2 inline-flex">
//                     <div className="grow shrink basis-0 h-10 flex-col justify-center items-start inline-flex">
//                       <div className="justify-start items-center inline-flex">
//                         <div></div>
//                       </div>
//                     </div>
//                   </div> */}
//                   <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex">
//                     <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex">
//                       <div className="justify-start items-center inline-flex w-full h-full">
//                         <div className="w-full h-full">
//                           <input
//                             type="text"
//                             id="donationBehalfName"
//                             placeholder=""
//                             className="text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none"
//                           ></input>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="self-stretch h-[158px] flex-col justify-start items-start gap-4 flex">
//                 <div className="self-stretch text-black text-[22px] font-bold font-['DM Sans'] leading-7">
//                   Payment Method
//                 </div>
//                 <div className="justify-start items-start gap-4 inline-flex">
//                   <div className="w-[200px] p-4 bg-white rounded-[20px] flex-col justify-start items-center gap-2.5 inline-flex">
//                     <div className="w-[52px] h-[52px] relative">
//                       <div className="w-[42px] h-[52px] left-[7px] top-0 absolute">
//                         <img src={paypal}></img>
//                       </div>
//                     </div>
//                     <div className="text-[#000] text-sm font-medium font-dmsans leading-tight">
//                       Paypal
//                     </div>
//                   </div>
//                   <div
//                     className={`w-[200px] p-4 bg-white rounded-[20px] flex-col justify-start items-center gap-2.5 inline-flex ${
//                       isCreditCardPaymentActive
//                         ? "border-4 border-violet-600"
//                         : "border-none"
//                     }`}
//                     onClick={handleCreditCardPayment}
//                   >
//                     <div className="w-[52px] h-[52px] relative">
//                       <div className="w-[52px] h-[52px] left-0 top-0 absolute">
//                         <img src={creditCard}></img>
//                       </div>
//                     </div>
//                     <div className="text-[#000] text-sm font-medium font-dmsans leading-tight">
//                       Credit Card
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {isCreditCardPaymentActive && <CreditCardPayment />}
//               {/* <div className="justify-start items-start gap-[15px] inline-flex">
//                 <div className="h-10 bg-violet-600 rounded-[100px] flex-col justify-center items-center gap-2 inline-flex">
//                   <div className="self-stretch grow shrink basis-0 px-6 py-2.5 justify-center items-center gap-2 inline-flex">
//                     <div className="text-center text-neutral-100 text-sm font-medium font-['DM Sans'] leading-tight">
//                       Continue
//                     </div>
//                   </div>
//                 </div>
//               </div> */}
//               <div className="justify-start items-start gap-4 inline-flex">
//                 <div className="justify-start items-start gap-4 flex">
//                   <CustomButton
//                     label="Continue"
//                     name="buttondefault"
//                     // onClick={handleSubmit}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DonateForm;
