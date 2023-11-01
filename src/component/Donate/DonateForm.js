import React, { useRef, useState } from "react";
import CustomButton from "../Buttons/CustomButton";
import creditCard from "../../images/credit_card.svg";
import paypal from "../../images/paypal.svg";
import selectedIcon from "../../images/selected_icon.svg";
import errorImg from "../../images/error.png";

function DonateForm() {
  const [isFrequencyDivActive, setIsFrequencyDivActive] = useState(true);
  const [isAgreementCheckboxChecked, setIsAgreementCheckboxChecked] =
    useState(false);
  const [isNameDivChecked, setIsNameDivChecked] = useState(false);
  const [isNameDivActive, setIsNameDivActive] = useState(true);
  const [divAmounts] = useState([15, 25, 35, 50, 75, 100]);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [otherAmount, setOtherAmount] = useState("");
  const [selectedPaymentDiv, setSelectedPaymentDiv] = useState(null);
  const [isDonationBehalfChecked, setIsDonationBehalfChecked] = useState(false);

  const handleFrequencyDivClick = () => {
    setIsFrequencyDivActive((prevState) => !prevState);
  };

  const handleAgreementCheckboxChange = () => {
    setIsAgreementCheckboxChecked((prevState) => !prevState);
    updateErrorState("agreementCheckboxError", "");
  };

  const handleNameDivCheckboxChange = () => {
    setIsNameDivChecked((prevState) => !prevState);
  };

  const handleNameDivClick = () => {
    setIsNameDivActive((prevState) => !prevState);
  };

  const handleSelectAmountDivClick = (amount) => {
    setSelectedAmount(amount);

    if (amount === selectedAmount) {
      setSelectedAmount(null);
    }
    updateErrorState("otherAmountError", "");
  };

  const handleOtherAmountInputChange = (e) => {
    setOtherAmount(e.target.value);
    updateErrorState("otherAmountError", "");
    setSelectedAmount(null);
  };

  const handlePaymentDivSelection = (divNumber) => {
    setSelectedPaymentDiv(divNumber);
    updateErrorState("paymentMethodError", "");
  };

  const handleDonationBehalfCheckboxChange = () => {
    setIsDonationBehalfChecked((prevState) => !prevState);
    updateErrorState("companyNameError", "");
  };

  const handleCompanyNametInputChange = (e) => {
    updateErrorState("companyNameError", "");
  };

  const handleFirstNametInputChange = (e) => {
    updateErrorState("firstNameError", "");
  };

  const handleLastNametInputChange = (e) => {
    updateErrorState("lastNameError", "");
  };

  const handleStreetAddressInputChange = (e) => {
    updateErrorState("streetAddressError", "");
  };

  const handleZipCodeInputChange = (e) => {
    updateErrorState("zipCodeError", "");
  };

  const handleContactInputChange = (e) => {
    updateErrorState("contactError", "");
  };

  const handleCardNumberInputChange = (e) => {
    updateErrorState("cardNumberError", "");
  };

  const handleExpirationDateInputChange = (e) => {
    updateErrorState("expirationDateError", "");
  };

  const handleCVVInputChange = (e) => {
    updateErrorState("cvvError", "");
  };

  const handleFirstNametPPInputChange = (e) => {
    updateErrorState("firstNameErrorPP", "");
  };

  const totalAmount =
    (selectedAmount || 0) + (otherAmount ? parseFloat(otherAmount) : 0);

  // Error handling
  const agreementCheckbox = useRef(null);
  const otherAmountError = useRef("");
  const paymentMethodError = useRef(null);
  const companyNameError = useRef("");
  const firstNameError = useRef("");
  const lastNameError = useRef("");
  const streetAddressError = useRef("");
  const zipCodeError = useRef("");
  const contactError = useRef("");
  const cardNumberError = useRef("");
  const expirationDateError = useRef("");
  const cvvError = useRef("");
  const firstNameErrorPP = useRef("");

  const [error, setError] = useState({
    agreementCheckboxError: "",
    otherAmountError: "",
    paymentMethodError: "",
    companyNameError: "",
    firstNameError: "",
    lastNameError: "",
    streetAddressError: "",
    zipCodeError: "",
    contactError: "",
    cardNumberError: "",
    expirationDateError: "",
    cvvError: "",
    firstNameErrorPP: "",
  });

  const updateErrorState = (key, value) => {
    setError((prevState) => ({
      ...prevState, // Clone the current state
      [key]: value, // Update the specific key with the new value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Validation Start
    if (!agreementCheckbox.current.checked) {
      updateErrorState("agreementCheckboxError", "Agreement is required");
    } else {
      updateErrorState("agreementCheckboxError", "");
    }

    if (!selectedAmount) {
      if (!otherAmountError.current.value) {
        updateErrorState("otherAmountError", "Other Amount is required");
      } else {
        updateErrorState("otherAmountError", "");
      }
    }

    if (!selectedPaymentDiv) {
      if (!paymentMethodError.current.value) {
        updateErrorState("paymentMethodError", "Payment method is required");
      } else {
        updateErrorState("paymentMethodError", "");
      }
    }

    if (isDonationBehalfChecked && !companyNameError.current.value) {
      updateErrorState(
        "companyNameError",
        "Company/Organization Name is required"
      );
    } else {
      updateErrorState("companyNameError", "");
    }

    if (
      selectedPaymentDiv !== null &&
      selectedPaymentDiv === 1 &&
      !firstNameError.current.value
    ) {
      updateErrorState("firstNameErrorPP", "First Name is required");
    } else {
      updateErrorState("firstNameErrorPP", "");
    }

    if (
      selectedPaymentDiv !== null &&
      selectedPaymentDiv === 2 &&
      !firstNameError.current.value
    ) {
      updateErrorState("firstNameError", "First Name is required");
    } else {
      updateErrorState("firstNameError", "");
    }

    if (
      selectedPaymentDiv !== null &&
      selectedPaymentDiv === 2 &&
      !lastNameError.current.value
    ) {
      updateErrorState("lastNameError", "Last Name is required");
    } else {
      updateErrorState("lastNameError", "");
    }

    if (
      selectedPaymentDiv !== null &&
      selectedPaymentDiv === 2 &&
      !streetAddressError.current.value
    ) {
      updateErrorState("streetAddressError", "Street Address is required");
    } else {
      updateErrorState("streetAddressError", "");
    }

    if (
      selectedPaymentDiv !== null &&
      selectedPaymentDiv === 2 &&
      !zipCodeError.current.value
    ) {
      updateErrorState("zipCodeError", "Zip/Postal Code is required");
    } else {
      updateErrorState("zipCodeError", "");
    }

    if (
      selectedPaymentDiv !== null &&
      selectedPaymentDiv === 2 &&
      !contactError.current.value
    ) {
      updateErrorState("contactError", "Contact is required");
    } else {
      updateErrorState("contactError", "");
    }

    if (
      selectedPaymentDiv !== null &&
      selectedPaymentDiv === 2 &&
      !cardNumberError.current.value
    ) {
      updateErrorState("cardNumberError", "Card Number is required");
    } else {
      updateErrorState("cardNumberError", "");
    }

    if (
      selectedPaymentDiv !== null &&
      selectedPaymentDiv === 2 &&
      !expirationDateError.current.value
    ) {
      updateErrorState("expirationDateError", "Expiration Date is required");
    } else {
      updateErrorState("expirationDateError", "");
    }

    if (
      selectedPaymentDiv !== null &&
      selectedPaymentDiv === 2 &&
      !cvvError.current.value
    ) {
      updateErrorState("cvvError", "CVV is required");
    } else {
      updateErrorState("cvvError", "");
    }
  };

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
                      ref={agreementCheckbox}
                      checked={isAgreementCheckboxChecked}
                      onChange={handleAgreementCheckboxChange}
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
              {error.agreementCheckboxError && (
                <div className="inline-flex items-center">
                  <img src={errorImg} className="w-3 h-3" />
                  <p className="text-red-600 text-xs ml-1">
                    {error.agreementCheckboxError}
                  </p>
                </div>
              )}
            </div>
            <div className="self-stretch h-fit flex-col justify-start items-start gap-8 flex">
              <div className="self-stretch h-fit flex-col justify-start items-start gap-5 flex">
                <div className="self-stretch text-[#000] text-[22px] font-bold font-dmsans leading-7">
                  Select Amount
                </div>
                <div className="self-stretch justify-start items-start gap-4 inline-flex flex-wrap sm:flex-nowrap">
                  {divAmounts.map((amount, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectAmountDivClick(amount)}
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
                          value={otherAmount}
                          onChange={handleOtherAmountInputChange}
                          className={`text-[#444746] w-full h-full pl-7 rounded-[4px] text-sm font-normal font-dmsans leading-normal tracking-wide ring-1 ring-inset ${
                            error.otherAmountError !== ""
                              ? "ring-red-500"
                              : "ring-gray-100"
                          }`}
                          placeholder=""
                          id="otherAmount"
                          ref={otherAmountError}
                        />
                      </div>
                      {error.otherAmountError && (
                        <div className="inline-flex items-center">
                          <img src={errorImg} className="w-3 h-3" />
                          <p className="text-red-600 text-xs ml-1">
                            {error.otherAmountError}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="self-stretch justify-start items-start gap-4 inline-flex">
                  <div className="w-[18px] h-[18px] justify-center items-center flex">
                    <div className="p-[11px] rounded-sm justify-center items-center flex">
                      <input
                        type="checkbox"
                        id="otherAmount-option"
                        value="otherAmount"
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
                        checked={isNameDivChecked}
                        onChange={handleNameDivCheckboxChange}
                      ></input>
                    </div>
                  </div>
                  <div className="grow shrink basis-0 text-black text-sm font-normal font-dmsans leading-snug">
                    Make this gift in honor or memory of someone
                  </div>
                </div>

                {isNameDivChecked && (
                  <>
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
                                id="donationBehalfName-option"
                                placeholder=""
                                className="text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none"
                              ></input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="self-stretch h-[158px] flex-col justify-start items-start gap-4 flex">
                <div className="self-stretch text-black text-[22px] font-bold font-['DM Sans'] leading-7">
                  Payment Method
                </div>
                <div className="justify-start items-start gap-4 inline-flex">
                  <div
                    className={`w-[150px] sm:w-[200px] p-4 bg-white rounded-[20px] flex-col justify-start items-center gap-2.5 inline-flex ${
                      selectedPaymentDiv === 1
                        ? "border-4 border-violet-600"
                        : "border-none"
                    }`}
                    onClick={() => handlePaymentDivSelection(1)}
                    ref={paymentMethodError}
                  >
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
                      selectedPaymentDiv === 2
                        ? "border-4 border-violet-600"
                        : "border-none"
                    }`}
                    onClick={() => handlePaymentDivSelection(2)}
                    ref={paymentMethodError}
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
                {error.paymentMethodError && (
                  <div className="inline-flex items-center">
                    <img src={errorImg} className="w-3 h-3" />
                    <p className="text-red-600 text-xs ml-1">
                      {error.paymentMethodError}
                    </p>
                  </div>
                )}
              </div>
              {selectedPaymentDiv === 1 && (
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
                            class="w-[18px] h-[18px] cursor-pointer accent-[#5F36D6]"
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
                        <div className="grow shrink basis-0 h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
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
                      <div className="grow shrink basis-0 h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
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
                                  className={`text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none ring-1 ring-inset ${
                                    error.firstNameErrorPP !== ""
                                      ? "ring-red-500"
                                      : "ring-gray-100"
                                  }`}
                                  ref={firstNameErrorPP}
                                  onChange={handleFirstNametPPInputChange}
                                ></input>
                              </div>
                            </div>
                          </div>
                        </div>
                        {error.firstNameErrorPP && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs ml-1">
                              {error.firstNameErrorPP}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="grow shrink basis-0 h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
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
                    <div className="self-stretch h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex">
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
                    <div className="self-stretch h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex">
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
                      <div className="grow shrink basis-0 h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
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
              )}

              {selectedPaymentDiv === 2 && (
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
                            class="w-[18px] h-[18px] cursor-pointer accent-[#5F36D6]"
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
                        <div className="grow shrink basis-0 h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
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
                                    className={`text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none ring-1 ring-inset ${
                                      error.companyNameError !== ""
                                        ? "ring-red-500"
                                        : "ring-gray-100"
                                    }`}
                                    ref={companyNameError}
                                    onChange={handleCompanyNametInputChange}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          </div>
                          {error.companyNameError && (
                            <div className="inline-flex items-center">
                              <img src={errorImg} className="w-3 h-3" />
                              <p className="text-red-600 text-xs ml-1">
                                {error.companyNameError}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="self-stretch justify-start items-start gap-4 inline-flex">
                      <div className="grow shrink basis-0 h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
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
                                  className={`text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none ring-1 ring-inset ${
                                    error.firstNameError !== ""
                                      ? "ring-red-500"
                                      : "ring-gray-100"
                                  }`}
                                  ref={firstNameError}
                                  onChange={handleFirstNametInputChange}
                                ></input>
                              </div>
                            </div>
                          </div>
                        </div>
                        {error.firstNameError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs ml-1">
                              {error.firstNameError}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="grow shrink basis-0 h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
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
                                  className={`text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none ring-1 ring-inset ${
                                    error.lastNameError !== ""
                                      ? "ring-red-500"
                                      : "ring-gray-100"
                                  } `}
                                  ref={lastNameError}
                                  onChange={handleLastNametInputChange}
                                ></input>
                              </div>
                            </div>
                          </div>
                        </div>
                        {error.lastNameError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs ml-1">
                              {error.lastNameError}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="self-stretch h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex">
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
                                className={`text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none ring-1 ring-inset ${
                                  error.streetAddressError !== ""
                                    ? "ring-red-500"
                                    : "ring-gray-100"
                                } `}
                                ref={streetAddressError}
                                onChange={handleStreetAddressInputChange}
                              ></input>
                            </div>
                          </div>
                        </div>
                      </div>
                      {error.streetAddressError && (
                        <div className="inline-flex items-center">
                          <img src={errorImg} className="w-3 h-3" />
                          <p className="text-red-600 text-xs ml-1">
                            {error.streetAddressError}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="self-stretch h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex">
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
                                  className={`text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none ring-1 ring-inset ${
                                    error.zipCodeError !== ""
                                      ? "ring-red-500"
                                      : "ring-gray-100"
                                  } `}
                                  onChange={handleZipCodeInputChange}
                                ></input>
                              </div>
                            </div>
                          </div>
                        </div>
                        {error.zipCodeError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs ml-1">
                              {error.zipCodeError}
                            </p>
                          </div>
                        )}
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
                                  className={`text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none ring-1 ring-inset ${
                                    error.contactError !== ""
                                      ? "ring-red-500"
                                      : "ring-gray-100"
                                  }`}
                                  onChange={handleContactInputChange}
                                ></input>
                              </div>
                            </div>
                          </div>
                        </div>
                        {error.contactError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs ml-1">
                              {error.contactError}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
                    <div className="self-stretch text-black text-[22px] font-bold font-dmsans leading-7">
                      Payment Information
                    </div>
                    <div className="self-stretch justify-start items-start gap-4 inline-flex">
                      <div className="grow shrink basis-0 h-fit rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
                        <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
                          Card Number
                        </div>
                        <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex">
                          <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex">
                            <div className="justify-start items-center inline-flex w-full h-full">
                              <div className="w-full h-full">
                                <input
                                  type="number"
                                  id="cardNumber"
                                  placeholder=""
                                  className={`text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none ring-1 ring-inset ${
                                    error.cardNumberError !== ""
                                      ? "ring-red-500"
                                      : "ring-gray-100"
                                  }`}
                                  onChange={handleCardNumberInputChange}
                                ></input>
                              </div>
                            </div>
                          </div>
                        </div>
                        {error.cardNumberError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs ml-1">
                              {error.cardNumberError}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="self-stretch justify-start items-start gap-4 inline-flex">
                      <div className="grow shrink basis-0 rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
                        <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
                          Expiration Date
                        </div>
                        <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex">
                          <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex">
                            <div className="justify-start items-center inline-flex w-full h-full">
                              <div className="w-full h-full">
                                <input
                                  type="text"
                                  id="expirationDate"
                                  placeholder=""
                                  className={`text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none ring-1 ring-inset ${
                                    error.expirationDateError !== ""
                                      ? "ring-red-500"
                                      : "ring-gray-100"
                                  }`}
                                  onChange={handleExpirationDateInputChange}
                                ></input>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="self-stretch h-[18px] text-[#444746] text-xs font-normal font-dmsans leading-[18px] tracking-tight">
                          Please follow this format: MM/YY
                        </div>
                        {error.expirationDateError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs ml-1">
                              {error.expirationDateError}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="grow shrink basis-0 rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 inline-flex">
                        <div className="self-stretch text-[#444746] text-sm font-medium font-dmsans leading-tight">
                          CVV
                        </div>
                        <div className="self-stretch h-12 bg-white rounded border border-[#C8C8C8] justify-start items-center gap-2 inline-flex">
                          <div className="grow shrink basis-0 h-full flex-col justify-center items-start inline-flex">
                            <div className="justify-start items-center inline-flex w-full h-full">
                              <div className="w-full h-full">
                                <input
                                  type="text"
                                  id="cvv"
                                  placeholder=""
                                  className={`text-[#444746] w-full h-full pl-2 rounded-[4px] text-base font-normal font-dmsans leading-normal tracking-wide border-none ring-1 ring-inset ${
                                    error.cvvError !== ""
                                      ? "ring-red-500"
                                      : "ring-gray-100"
                                  }`}
                                  onChange={handleCVVInputChange}
                                ></input>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch h-[18px] text-[#444746] text-xs font-normal font-dmsans leading-[18px] tracking-tight">
                          3 digit on back of your card
                        </div>
                        {error.cvvError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs ml-1">
                              {error.cvvError}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="justify-start items-start gap-4 inline-flex">
                <div className="justify-start items-start gap-4 flex">
                  <CustomButton
                    label="Continue"
                    name="buttondefault"
                    onClick={handleSubmit}
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

// function DonateForm() {
//   const [isChecked, setIsChecked] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [error, setError] = useState("");

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//     if (!isChecked) {
//       setError("");
//     }
//   };

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);

//     if (!value.trim()) {
//       setError("Input cannot be empty");
//     } else {
//       setError("");
//     }
//   };

//   return (
//     <div>
//       <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
//         <div className="relative flex flex-col items-center ">
//           <div className="w-full sm:w-[590px] md:w-[750px] lg:w-[930px] mt-32 mb-16 md:mt-40 md:mb-16 lg:mt-48 lg:mb-16 rounded-2xl bg-[#F7F7F7] h-fit">
//             <div className="w-full h-fit px-8 py-8 md:px-28 md:py-16 lg:px-40 lg:py-24 flex-col justify-start items-start gap-16 inline-flex">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={isChecked}
//                   onChange={handleCheckboxChange}
//                 />
//                 Checkbox
//               </label>

//               {isChecked && (
//                 <div>
//                   <label>
//                     Input:
//                     <input
//                       type="text"
//                       value={inputValue}
//                       onChange={handleInputChange}
//                     />
//                   </label>
//                   {error && <div style={{ color: "red" }}>{error}</div>}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DonateForm;
