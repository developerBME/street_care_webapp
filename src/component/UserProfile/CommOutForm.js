import React from "react";
import { useRef, useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { AiOutlineStar, AiTwotoneStar, AiFillStar } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  getDocs,
  collection,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../firebase";

import CustomButton from "../Buttons/CustomButton";
import ConfirmationModal from "./ConfirmationModal";
import errorImg from "../../images/error.png";
import { emailConfirmation } from "../EmailService";

const starStyle = {
  width: 60,
  height: 60,
};
const OUTREACH_EVENTS_COLLECTION = "outreachEvents";
function getLastWeeksDate() {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
}

function CommOutForm() {
  const navigate = useNavigate();
  // const ratingChanged = (newRating) => {
  //   console.log(newRating);
  // };

  const [numberHelped, setNumberHelped] = useState(null);
  const [itemArray, setItemArray] = useState([]);
  const [itemQty, setItemQty] = useState("");
  const [rating, setRating] = useState(0);
  const checkboxes = useRef([]);
  const [success, setSuccess] = useState(false);
  const outreachRef = useRef("");
  const [outreach, setOutreach] = useState([]);

  const [error, setError] = useState({
    numberHelpedError: "",
    itemQtyError: "",
    checkboxesError: "",
    outreachError: "",
  });

  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");

  const handleOtherCheck = () => {
    setIsOtherChecked(!isOtherChecked);
  };

  const handleItemQtyChange = (e) => {
    const inputValue = e.target.value;
    if (/^[1-9]+\d*$/.test(inputValue) || inputValue === "") {
      setItemQty(inputValue);
      updateErrorState("itemQtyError", "");
    } else {
      updateErrorState("itemQtyError", "Please enter a number");
    }
  };

  const handleNumChange = (e) => {
    const inputValue = e.target.value;
    if (/^[1-9]+\d*$/.test(inputValue) || inputValue === "") {
      setNumberHelped(inputValue);
      updateErrorState("numberHelpedError", "");
    } else {
      updateErrorState("numberHelpedError", "Please enter a number");
    }
  };

  const handleOutreachChange = (e) => {
    updateErrorState("outreachError", "");
  };

  const updateErrorState = (key, value) => {
    setError((prevState) => ({
      ...prevState, // Clone the current state
      [key]: value, // Update the specific key with the new value
    }));
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // const openModal = () => {
  //   setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };

  // const tempsub = async (e) => {
  //   e.preventDefault();

  //   setSuccess(true);
  // };

  // Firebase

  const fAuth = getAuth();
  onAuthStateChanged(fAuth, (user) => {
    if (user) {
      console.log("Found user");
      console.log(fAuth.currentUser.uid);
    } else {
      console.log("USER NOT FOUND!");
      // navigate("/login");
    }
  });

  function handleItemArray(e) {
    if (e.target.checked) {
      setItemArray([...itemArray, e.target.value]);
    } else {
      setItemArray(itemArray.filter((item) => item !== e.target.value));
    }
    updateErrorState("checkboxesError", "");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let setReturn = false;
    let setOtherBool = true;

    let whatGivenArr = [...itemArray];
    if (isOtherChecked) {
      setOtherBool = false;
      updateErrorState(
        "checkboxesError",
        "Please specify for other kind of help provided"
      );
      if (otherInputValue !== "") {
        whatGivenArr.push(otherInputValue);
        console.log(otherInputValue);
        updateErrorState("checkboxesError", "");
        setOtherBool = true;
      }
    }
    // Form Validation Start
    if (!numberHelped) {
      updateErrorState("numberHelpedError", "Number is required");
      setReturn = true;
    } else {
      updateErrorState("numberHelpedError", "");
    }

    if (whatGivenArr == [] || !setOtherBool) {
      updateErrorState(
        "checkboxesError",
        "Please provide the kind of help provided"
      );
      setReturn = true;
    } else {
      updateErrorState("checkboxesError", "");
    }

    if (itemArray == "" || itemArray == []) {
      updateErrorState(
        "checkboxesError",
        "Please provide the kind of help provided"
      );
      setReturn = true;
    } else {
      updateErrorState("checkboxesError", "");
    }

    if (!itemQty) {
      updateErrorState("itemQtyError", "Enter Quantity");
      setReturn = true;
    } else {
      updateErrorState("itemQtyError", "");
    }

    if (!outreachRef.current.value) {
      updateErrorState("outreachError", "Enter Outreach Attended");
      setReturn = true;
    } else {
      updateErrorState("outreachError", "");
    }
    if (setReturn) {
      return;
    }
    let obj = {
      uid: fAuth.currentUser.uid,
      numberPeopleHelped: numberHelped,
      whatGiven: whatGivenArr,
      itemQty: itemQty,
      rating: rating,
      outreachEvent: outreachRef.current.value,
    };

    const emailHTML = `<div style="border-radius: 30px;background: #F1EEFE; padding: 20px 50px">
      <h1>Thank you for creating the outreach</h1>
      <p>Your Community Outreach Form has been successfully created and you can view it in your profile.</p>
      <p>Here are some of the details:</p>
      <ul>
      <li>Number of People Helped: ${numberHelped}</li>
      <li>Outreach Event: ${outreachRef.current.value}</li>
      <li>Item Quantity: ${itemQty}</li>
      </ul>
    </div>`;

    try {
      const logRef = collection(db, "testLog");
      const docRef = await addDoc(logRef, obj);
      if (docRef.id) {
        console.log(docRef.id);
        setSuccess(true);
        emailConfirmation(
          fAuth.currentUser.email,
          fAuth.currentUser.displayName,
          "",
          emailHTML
        );
        clearFields();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const clearFields = () => {
    setItemQty(null);
    numberHelped.current.value = "";
    setItemArray([]);
    setOutreach("");
    checkboxes.current.forEach((x) => {
      x.checked = false;
    });
    setRating(0);
  };

  useEffect(() => {
    const fetchOutreachEvents = async () => {
      const oureachEventsRef = collection(db, OUTREACH_EVENTS_COLLECTION);
      const eventSnapshot = await getDocs(oureachEventsRef);
      let orEvents = [];
      for (const doc of eventSnapshot.docs) {
        const eventData = doc.data();
        let withinLastWeek =
          getLastWeeksDate() <= new Date(eventData.eventDate.seconds * 1000) &&
          new Date(eventData.eventDate.seconds * 1000) <= new Date();
        let tempObj = eventData;
        tempObj.id = doc.id;
        if (withinLastWeek) {
          orEvents.push(eventData);
        }
      }
      setOutreach(orEvents);
    };
    fetchOutreachEvents();
  }, []);

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-fit md:w-[930px] mx-2    mt-48 mb-16 rounded-2xl bg-[#F8F9F0] text-black ">
          <div className="items-center justify-center  h-full w-full mx-auto rounded-2xl ">
            {/*  */}
            <div className=" absolute flex mt-[-50px] items-center">
              <IoIosArrowBack className=" w-6 h-6" />{" "}
              <Link
                to={"/profile"}
                className=" font-bricolage text-xl font-bold leading-7"
              >
                Return to Profile
              </Link>
            </div>
            {/*  */}
            <div className="w-fit h-fit md:px-[150px] md:py-[100px] flex-col justify-start items-start gap-16 inline-flex">
              <div className="flex-col justify-start items-start gap-16 flex">
                <div className="w-fit text-neutral-800 text-[57px] font-medium font-bricolage leading-[64px]">
                  Tell us more about who you helped!
                </div>
                <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                  <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                    Who did you help?
                  </div>
                  {/*  */}
                  <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                    <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                      <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                        How many people did you help?
                      </div>
                    </div>
                    <div className="self-stretch h-fit  border-collapse     ">
                      <div className=" h-14  justify-center items-start ">
                        <input
                          id="numberHelped"
                          value={numberHelped}
                          placeholder="How many people did you help?"
                          onChange={handleNumChange}
                          className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-base  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ${
                            error.numberHelpedError !== ""
                              ? "ring-red-500"
                              : "ring-gray-300"
                          }`}
                          required={true}
                        ></input>
                        {error.numberHelpedError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs">
                              {error.numberHelpedError}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                  <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                    Select the community outreach you have attended.
                  </div>
                  {/*  */}
                  <div className="self-stretch w-full h-fit flex-col flex ">
                    <div className=" absolute w-fit bg-white ml-3 mt-[-5px] px-1 justify-start items-center inline-flex">
                      <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                        Community Outreach
                      </div>
                    </div>
                    <div className="self-stretch h-fit border-collapse">
                      <div className="h-14 inline-flex w-full">
                        <select
                          className={`text-zinc-900 w-full h-full px-3 rounded-[4px] text-base font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ${
                            error.outreachError !== ""
                              ? "ring-red-500"
                              : "ring-gray-300"
                          }`}
                          defaultValue=""
                          ref={outreachRef}
                          onChange={handleOutreachChange}
                        >
                          <option value="" disabled>
                            Select Outreach Event
                          </option>
                          {outreach &&
                            outreach.map((event) => {
                              return (
                                <option className="w-fit" value={event.id}>
                                  {event.title + " (" + event.description + ")"}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      {error.outreachError && (
                        <div className="inline-flex items-center">
                          <img src={errorImg} className="w-3 h-3" />
                          <p className="text-red-600 text-xs">
                            {error.outreachError}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Grid */}

                <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                  <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                    What kind of help did you provide?
                  </div>

                  <div className="self-stretch w-full h-fit grid md:grid-cols-4 grid-cols-3 gap-2 ">
                    {/* Grid Start */}
                    <div className=" justify-end items-end inline-flex ">
                      <input
                        type="checkbox"
                        id="food-option"
                        value="Food and Drink"
                        className="w-[18px] h-[18px] m-5 cursor-pointer accent-[#5F36D6] peer absolute"
                        required=""
                        ref={(el) => (checkboxes.current[0] = el)}
                        onChange={handleItemArray}
                      ></input>
                      <label
                        for="food-option"
                        className="inline-flex items-start justify-between w-full h-[140px] p-3 bg-slate-200 border-4 border-gray-200 rounded-[30px] cursor-pointer  peer-checked:border-[#5F36D6]  peer-checked:text-gray-600 text-neutral-800 text-base font-bold font-bricolage leading-normal ring-1 ring-inset ring-gray-300"
                      >
                        <div className="w-full h-full mb-6 text-base font-semibold">
                          {" "}
                          Food and Drink
                        </div>
                      </label>
                    </div>
                    {/*  */}

                    <div className=" justify-end items-end inline-flex ">
                      <input
                        type="checkbox"
                        id="clothing-option"
                        value="Clothing"
                        className="w-[18px] h-[18px] m-5 cursor-pointer accent-[#5F36D6] peer absolute"
                        required=""
                        ref={(el) => (checkboxes.current[1] = el)}
                        onChange={handleItemArray}
                      ></input>
                      <label
                        for="clothing-option"
                        className="inline-flex items-start justify-between w-full h-[140px] p-3 bg-slate-200 border-4 border-gray-200 rounded-[30px] cursor-pointer  peer-checked:border-[#5F36D6]  peer-checked:text-gray-600 text-neutral-800 text-base font-bold font-bricolage leading-normal ring-1 ring-inset ring-gray-300"
                      >
                        <div className="w-full h-full mb-6  text-base font-semibold ">
                          Clothing
                        </div>
                      </label>
                    </div>

                    {/*  */}
                    <div className=" justify-end items-end inline-flex ">
                      <input
                        type="checkbox"
                        id="hygiene-option"
                        value="Hygiene Products"
                        className="w-[18px] h-[18px] m-5 cursor-pointer accent-[#5F36D6] peer absolute"
                        required=""
                        ref={(el) => (checkboxes.current[2] = el)}
                        onChange={handleItemArray}
                      ></input>
                      <label
                        for="hygiene-option"
                        className="inline-flex items-start justify-between w-full h-[140px] p-3 bg-slate-200 border-4 border-gray-200 rounded-[30px] cursor-pointer  peer-checked:border-[#5F36D6]  peer-checked:text-gray-600 text-neutral-800 text-base font-bold font-bricolage leading-normal ring-1 ring-inset ring-gray-300"
                      >
                        <div className="w-full h-full mb-6  text-base font-semibold ">
                          Hygiene Products
                        </div>
                      </label>
                    </div>
                    {/*  */}
                    <div className=" justify-end items-end inline-flex ">
                      <input
                        type="checkbox"
                        id="wellness-option"
                        value="Wellness/ Emotional Support"
                        className="w-[18px] h-[18px] m-5 cursor-pointer accent-[#5F36D6] peer absolute"
                        required=""
                        ref={(el) => (checkboxes.current[3] = el)}
                        onChange={handleItemArray}
                      ></input>
                      <label
                        for="wellness-option"
                        className="inline-flex items-start justify-between w-full h-[140px] p-3 bg-slate-200 border-4 border-gray-200 rounded-[30px] cursor-pointer  peer-checked:border-[#5F36D6]  peer-checked:text-gray-600 text-neutral-800 text-base font-bold font-bricolage leading-normal ring-1 ring-inset ring-gray-300"
                      >
                        <div className="w-full h-full mb-6 text-base font-semibold">
                          Wellness/ Emotional Support
                        </div>
                      </label>
                    </div>
                    {/*  */}
                    <div className=" justify-end items-end inline-flex ">
                      <input
                        type="checkbox"
                        id="medical-option"
                        value="Medical Help"
                        className="w-[18px] h-[18px] m-5 cursor-pointer accent-[#5F36D6] peer absolute"
                        required=""
                        ref={(el) => (checkboxes.current[4] = el)}
                        onChange={handleItemArray}
                      ></input>
                      <label
                        for="medical-option"
                        className="inline-flex items-start justify-between w-full h-[140px] p-3 bg-slate-200 border-4 border-gray-200 rounded-[30px] cursor-pointer  peer-checked:border-[#5F36D6]  peer-checked:text-gray-600 text-neutral-800 text-base font-bold font-bricolage leading-normal ring-1 ring-inset ring-gray-300"
                      >
                        <div className="w-full h-full mb-6 text-base font-semibold">
                          {" "}
                          Medical Help
                        </div>
                      </label>
                    </div>
                    {/*  */}

                    <div className=" justify-end items-end inline-flex ">
                      <input
                        type="checkbox"
                        id="social-option"
                        value="Social Worker /Psychiatrist"
                        className="w-[18px] h-[18px] m-5 cursor-pointer accent-[#5F36D6] peer absolute"
                        required=""
                        ref={(el) => (checkboxes.current[5] = el)}
                        onChange={handleItemArray}
                      ></input>
                      <label
                        for="social-option"
                        className="inline-flex items-start justify-between w-full h-[140px] p-3 bg-slate-200 border-4 border-gray-200 rounded-[30px] cursor-pointer  peer-checked:border-[#5F36D6]  peer-checked:text-gray-600 text-neutral-800 text-base font-bold font-bricolage leading-normal ring-1 ring-inset ring-gray-300"
                      >
                        <div className="w-full h-full mb-6  text-base font-semibold ">
                          Social Worker /Psychiatrist
                        </div>
                      </label>
                    </div>

                    {/*  */}
                    <div className=" justify-end items-end inline-flex ">
                      <input
                        type="checkbox"
                        id="legal-option"
                        value="Legal/Lawyer"
                        className="w-[18px] h-[18px] m-5 cursor-pointer accent-[#5F36D6] peer absolute"
                        required=""
                        ref={(el) => (checkboxes.current[6] = el)}
                        onChange={handleItemArray}
                      ></input>
                      <label
                        for="legal-option"
                        className="inline-flex items-start justify-between w-full h-[140px] p-3 bg-slate-200 border-4 border-gray-200 rounded-[30px] cursor-pointer  peer-checked:border-[#5F36D6]  peer-checked:text-gray-600 text-neutral-800 text-base font-bold font-bricolage leading-normal ring-1 ring-inset ring-gray-300"
                      >
                        <div className="w-full h-full mb-6  text-base font-semibold ">
                          Legal/Lawyer
                        </div>
                      </label>
                    </div>
                    {/*  */}
                    <div className=" justify-end items-end inline-flex ">
                      <input
                        type="checkbox"
                        id="other-option"
                        value="Other"
                        className="w-[18px] h-[18px] m-5 cursor-pointer accent-[#5F36D6] peer absolute"
                        required=""
                        ref={(el) => (checkboxes.current[7] = el)}
                        onChange={handleOtherCheck}
                      ></input>
                      <label
                        for="other-option"
                        className="inline-flex items-start justify-between w-full h-[140px] p-3 bg-slate-200 border-4 border-gray-200 rounded-[30px] cursor-pointer  peer-checked:border-[#5F36D6]  peer-checked:text-gray-600 text-neutral-800 text-base font-bold font-bricolage leading-normal ring-1 ring-inset ring-gray-300"
                      >
                        <div className="w-full h-full mb-6 text-base font-semibold">
                          Other
                        </div>
                      </label>
                    </div>
                    {/*  */}
                  </div>
                  {error.checkboxesError && (
                    <div className="inline-flex items-center">
                      <img src={errorImg} className="w-3 h-3" />
                      <p className="text-red-600 text-xs">
                        {error.checkboxesError}
                      </p>
                    </div>
                  )}
                </div>
                {isOtherChecked && (
                  <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                    <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                      <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                        Other
                      </div>
                    </div>
                    <div className="self-stretch h-fit  border-collapse     ">
                      <div className=" h-14  justify-center items-start ">
                        <input
                          id="otherInput"
                          value={otherInputValue}
                          placeholder="Other"
                          className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] border-0 text-[15px] font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ring-gray-300`}
                          required=""
                          onChange={(e) => {
                            setOtherInputValue(e.target.value);
                          }}
                        ></input>
                      </div>
                    </div>
                    {error.checkboxesError && (
                      <div className="inline-flex items-center">
                        <img src={errorImg} className="w-3 h-3" />
                        <p className="text-red-600 text-xs">
                          {error.checkboxesError}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {/*  */}

                <div className="self-stretch grow shrink basis-0 px-8 pt-[54px] pb-[55px] bg-stone-50 rounded-[30px] border border-stone-300 flex-col justify-start items-center gap-[29px] flex">
                  <div className="self-stretch text-center text-black text-[22px] font-bold font-bricolage leading-7">
                    Rate your Street Care outreach experience
                  </div>
                  <div className=" inline-flex ">
                    <Rating
                      name="star-rating"
                      icon={
                        <AiFillStar className=" w-10 h-10 text-yellow-300 " />
                      }
                      emptyIcon={<AiOutlineStar className=" w-10 h-10" />}
                      value={rating}
                      size={"large"}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                        console.log(outreach);
                      }}
                    />
                  </div>
                </div>
                {/*  */}
                <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                  <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                    Total number of items donated by you?
                  </div>
                  {/*  */}
                  <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                    <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                      <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                        Number
                      </div>
                    </div>
                    <div className="self-stretch h-fit  border-collapse     ">
                      <div className=" h-14  justify-center items-start ">
                        <input
                          type="number"
                          id="-itemnumber"
                          placeholder="Number of Items donated"
                          className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-base  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ${
                            error.itemQtyError !== ""
                              ? "ring-red-500"
                              : "ring-gray-300"
                          }`}
                          onChange={handleItemQtyChange}
                        ></input>
                        {error.itemQtyError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs">
                              {error.itemQtyError}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className="justify-start items-start gap-4 inline-flex">
                  <div className="justify-start items-start gap-4 flex">
                    <CustomButton
                      label="Done"
                      name="buttondefault"
                      onClick={handleSubmit}
                    />
                  </div>
                  {/*  */}
                  {/* <div className="justify-start items-start gap-4 flex">
                    <div
                      className=" cursor-pointer px-8 py-4 bg-violet-700 rounded-[100px] justify-center items-center gap-2.5 flex"
                      onClick={tempsub}
                    >
                      <div className="text-center text-stone-100 text-lg font-semibold font-open-sans leading-normal">
                        Temp
                      </div>
                    </div>
                  </div> */}
                </div>
                {/*  */}
                {success && (
                  // <div className="justify-start items-start gap-4 inline-flex">
                  //   <div className="justify-start items-start gap-4 flex">
                  //     Success!
                  //   </div>
                  // </div>
                  <ConfirmationModal isOpen={true} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommOutForm;
