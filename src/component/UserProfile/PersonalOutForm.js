import React from "react";
import { useState, useRef, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, getDocs, getDoc, doc, updateDoc, query, where, limit } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CustomButton from "../Buttons/CustomButton";
import errorImg from "../../images/error.png";
import ConfirmationModal from "./ConfirmationModal";
import DatePicker from "react-datepicker";
import { Timestamp } from "firebase/firestore";
const USERS_COLLECTION = "users";

const CustomInput = ({ value, onClick, onChange, id, className }) => (
  <div>
    <input
      type="text"
      onClick={onClick}
      onChange={onChange}
      value={value}
      id={id}
      className={className}
    />
  </div>
);

function PersonalOutForm() {
  const navigate = useNavigate();
  // const ratingChanged = (newRating) => {
  //   console.log(newRating);
  // };
  const date = useRef("");
  const time = useRef("");
  const cityRef = useRef("");
  const stateRef = useRef("");
  const checkboxes = useRef([]);
  const [itemQty, setItemQty] = useState("");
  const [numberHelped, setNumberhelped] = useState("");
  const [itemArray, setItemArray] = useState([]);
  const [rating, setRating] = useState(0);
  const [success, setSuccess] = useState(false);
  const [stateList, setStateList] = useState({});
  const [stateNames, setStateNames] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [descriptionHelped, setDescriptionHelped] = useState("");
  const [isInfoShareCheckboxChecked, setInfoShareCheckboxChecked] =
    useState(false);
  const infoShareCheckbox = useRef(null);
  const [showOptionalQuestions, setShowOptionalQuestions] = useState(false);
  // const furtherHelpDescription = useRef("");
  // const furtherHelpLocation = useRef("");
  // const [otherInfo, setOtherInfo] = useState("");
  const optDesc = useRef("");
  const optLandmark = useRef("");
  // const optTime = useRef("");
  // const [optFurtherHelp, setOptFurtherHelp] = useState([]);
  // const optFollowUpTime = useRef("");
  // const optInfo = useRef("");
  // const [optInfoShare, setOptInfoShare] = useState(false);

  const [error, setError] = useState({
    numberHelpedError: "",
    cityError: "",
    stateError: "",
    checkboxesError: "",
    itemQtyError: "",
    dateError: "",
    timeError: "",
    optDescError: "",
    optLandmarkError: "",
    infoShareCheckboxError: "",
  });

  const handleNumChange = (e) => {
    const inputValue = e.target.value;
    if (/^[1-9]+\d*$/.test(inputValue) || inputValue === "") {
      setNumberhelped(inputValue);
      updateErrorState("numberHelpedError", "");
    } else {
      updateErrorState(
        "numberHelpedError",
        "Please enter number more or equal to 1"
      );
    }
  };

  const handleDescriptionHelpedChange = (e) => {
    const inputValue = e.target.value;
    setDescriptionHelped(inputValue);
  };

  const handleOptDescChange = (e) => {
    updateErrorState("optDescError", "");
  };

  const handleOptLandmarkChange = (e) => {
    updateErrorState("optLandmarkError", "");
  };

  const handleInfoShareCheckboxChange = () => {
    setInfoShareCheckboxChecked((prevState) => !prevState);
    updateErrorState("infoShareCheckboxError", "");
  };

  const handleItemQtyChange = (e) => {
    const inputValue = e.target.value;
    if (/^[0-9]+\d*$/.test(inputValue) || inputValue === "") {
      setItemQty(inputValue);
      updateErrorState("itemQtyError", "");
    } else {
      updateErrorState("itemQtyError", "Please enter a number");
    }
  };
  const handleDateChange = (e) => {
    updateErrorState("dateError", "");
  };
  const handleTimeChange = (e) => {
    updateErrorState("timeError", "");
  };

  const updateErrorState = (key, value) => {
    setError((prevState) => ({
      ...prevState, // Clone the current state
      [key]: value, // Update the specific key with the new value
    }));
  };

  const handleOptionalButtonClick = () => {
    setShowOptionalQuestions(!showOptionalQuestions);
  };
  {
    /* Firebase */
  }
  const fAuth = getAuth();
  onAuthStateChanged(fAuth, (user) => {
    if (user) {
      console.log("Found user");
    } else {
      console.log("USER NOT FOUND!");
      navigate("/login");
    }
  });

  useEffect(() => {
    async function getStates() {
      const response = await fetch(
        "https://parseapi.back4app.com/classes/Usabystate_States?keys=name,postalAbreviation",
        {
          headers: {
            "X-Parse-Application-Id":
              "vahnMBqbmIbxOw8R3qtsEMoYrZMljfClGvc1aMyp",
            "X-Parse-REST-API-Key": "LBjkDrxuUKEfb8liRPgZyv1Lu5WsPIvTx2FWgTpi",
          },
        }
      );
      const data = await response.json();

      const filteredData = data.results?.map((x) => {
        return x.name;
      });
      setStateList(data.results);
      setStateNames(filteredData);
    }
    getStates();
  }, []);

  async function getCities(e) {
    const stateCode = stateList.filter((x) => x.name == e.target.value)[0]
      .postalAbreviation;
    const response = await fetch(
      "https://parseapi.back4app.com/classes/Usabystate_" +
        stateCode +
        "?limit=1000&keys=name",
      {
        headers: {
          "X-Parse-Application-Id": "vahnMBqbmIbxOw8R3qtsEMoYrZMljfClGvc1aMyp",
          "X-Parse-REST-API-Key": "LBjkDrxuUKEfb8liRPgZyv1Lu5WsPIvTx2FWgTpi",
        },
      }
    );
    const data = await response.json();
    const filteredData = data.results?.map((x) => {
      return x.name;
    });
    console.log("Unfiltered: " + data.results.length);
    console.log("Filtered: " + filteredData.length);
    setState(e.target.value);
    setCityNames(filteredData);
    updateErrorState("stateError", "");
    updateErrorState("cityError", "");
  }

  function handleItemArray(e) {
    if (e.target.checked) {
      setItemArray([...itemArray, e.target.value]);
    } else {
      setItemArray(itemArray.filter((item) => item !== e.target.value));
    }
    updateErrorState("checkboxesError", "");
  }

  const handleSubmit = async (e) => {
    let setReturn = false;
    e.preventDefault();

    // Form Validation Start
    if (!numberHelped) {
      updateErrorState("numberHelpedError", "Number is required");
      setReturn = true;
    } else {
      updateErrorState("numberHelpedError", "");
    }

    if (itemArray == "") {
      updateErrorState(
        "checkboxesError",
        "Please provide the kind of help provided"
      );
      setReturn = true;
    } else {
      updateErrorState("checkboxesError", "");
    }

    if (!stateRef.current.value) {
      updateErrorState("stateError", "Select State");
      setReturn = true;
    } else {
      updateErrorState("stateError", "");
    }

    if (!cityRef.current.value) {
      updateErrorState("cityError", "Select City");
      setReturn = true;
    } else {
      updateErrorState("cityError", "");
    }

    if (!date.current.value) {
      updateErrorState("dateError", "Enter a date");
      setReturn = true;
    } else {
      updateErrorState("dateError", "");
    }

    if (!time.current.value) {
      updateErrorState("timeError", "Enter a time");
      setReturn = true;
    } else {
      updateErrorState("timeError", "");
    }

    if (!itemQty) {
      updateErrorState("itemQtyError", "Enter Quantity");
      setReturn = true;
    } else {
      updateErrorState("itemQtyError", "");
    }
    if (showOptionalQuestions) {
      if (!optDesc.current.value) {
        updateErrorState(
          "optDescError",
          "Enter the description of the people who require further help"
        );
        setReturn = true;
      } else {
        updateErrorState("optDescError", "");
      }

      if (!optLandmark.current.value) {
        updateErrorState(
          "optLandmarkError",
          "Enter the location of the people who require further help"
        );
        setReturn = true;
      } else {
        updateErrorState("optLandmarkError", "");
      }

      if (!infoShareCheckbox.current.checked) {
        updateErrorState(
          "infoShareCheckboxError",
          "Location sharing is required"
        );
        setReturn = true;
      } else {
        setInfoShareCheckboxChecked(true);
        updateErrorState("infoShareCheckboxError", "");
      }
    }

    if (setReturn) {
      return;
    }

    let obj = {
      uid: fAuth.currentUser.uid,
      numberPeopleHelped: numberHelped,
      whatGiven: itemArray,
      itemQty: itemQty,
      date: date.current.value,
      time: time.current.value,
      state: state,
      city: city,
      rating: rating,
    };

    try {
      const logRef = collection(db, "personalVisitLog");
      const docRef = await addDoc(logRef, obj);
      if (docRef.id) {
        console.log(docRef.id);

        const userQuery = query(
          collection(db, USERS_COLLECTION),
          where("uid", "==", fAuth?.currentUser?.uid)
        );
        const userDocRef = await getDocs(userQuery);
        const userDocID = userDocRef.docs[0].id;
        // reference for the userdoc
        const userRef = doc(db, USERS_COLLECTION, userDocID);
        // outreach event collection
        const docSnap = await getDoc(userRef);
        let personalVisitLogs = docSnap.data().personalVisitLogs || [];
        personalVisitLogs.push(docRef.id)
        const updateRef = await updateDoc(userRef, {
          personalVisitLogs: personalVisitLogs,
        });
        
        setSuccess(true);
        clearFields();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const clearFields = () => {
    date.current.value = "";
    setNumberhelped("");
    setItemQty("");
    setItemArray([]);
    checkboxes.current.forEach((x) => {
      x.checked = false;
    });
    time.current.value = "";
    setRating(0);
    setState("");
    setCity("");
    cityRef.current.value = "";
    stateRef.current.value = "";
  };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-fit md:w-[930px] mx-2    mt-48 mb-16 rounded-2xl bg-[#F8F9F0] text-black ">
          <div className="items-center justify-center  h-full w-full mx-auto rounded-2xl ">
            {/*  */}
            <div
              className=" absolute flex mt-[-50px] items-center cursor-pointer "
              onClick={() => {
                navigate("/profile");
              }}
            >
              <IoIosArrowBack className=" w-6 h-6" />{" "}
              <p className=" font-bricolage text-xl font-bold leading-7">
                Return to Profile
              </p>
            </div>
            {/*  */}
            <div className="w-fit h-fit md:px-[150px] md:py-[100px] flex-col justify-start items-start gap-16 inline-flex">
              <div className="flex-col justify-start items-start gap-16 flex">
                <div className="w-fit text-neutral-800 text-[57px] font-medium font-bricolage leading-[64px]">
                  Tell us more about who you helped!
                </div>
                <div className="self-stretch h-fit flex-col justify-center items-start gap-[24px] flex">
                  <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                    <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                      Who did you help (and how many people)?*
                    </div>
                    {/*  */}
                    <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                      <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                        <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                          Description of the people helped
                        </div>
                      </div>
                      <div className="self-stretch h-fit  border-collapse     ">
                        <div className=" h-14  justify-center items-start ">
                          <input
                            id="descriptionHelped"
                            value={descriptionHelped}
                            placeholder="E.g. Tommy, a senior citizen in a wheelchair wearing a navy blue top and brown shoes."
                            className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] border-0 text-[15px] font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ring-gray-300`}
                            required=""
                            onChange={handleDescriptionHelpedChange}
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                      <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                        <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                          Number of people helped
                        </div>
                      </div>
                      <div className="self-stretch h-fit  border-collapse     ">
                        <div className=" h-14  justify-center items-start ">
                          <input
                            id="numberHelped"
                            value={numberHelped}
                            placeholder="Number of people helped"
                            className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] border-0 text-base font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ${
                              error.numberHelpedError !== ""
                                ? "ring-red-500"
                                : "ring-gray-300"
                            }`}
                            required={true}
                            onChange={handleNumChange}
                          ></input>
                          {error.numberHelpedError && (
                            <div className="inline-flex items-center">
                              <img src={errorImg} className="w-3 h-3" />
                              <p className="text-red-600 text-xs ml-1">
                                {error.numberHelpedError}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* {error.numberHelpedError && (
                      <div className="inline-flex items-center">
                        <img src={errorImg} className="w-3 h-3" />
                        <p className="text-red-600 text-xs ml-1">
                          {error.numberHelpedError}
                        </p>
                      </div>
                    )} */}
                    </div>
                  </div>
                  {/* </div> */}
                  {/*  */}

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
                          className="inline-flex items-start justify-between w-full h-[140px] p-3 bg-slate-200 border-4 border-gray-200 rounded-[30px] cursor-pointer peer-checked:border-[#5F36D6] peer-checked:text-gray-600 text-neutral-800 text-base font-bold font-bricolage leading-normal ring-1 ring-inset ring-gray-300"
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
                          value=""
                          className="w-[18px] h-[18px] m-5 cursor-pointer accent-[#5F36D6] peer absolute"
                          required="Medical Help"
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
                          <div class="w-full h-full mb-6  text-base font-semibold ">
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
                          onChange={handleItemArray}
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
                        <p className="text-red-600 text-xs ml-1">
                          {error.checkboxesError}
                        </p>
                      </div>
                    )}
                  </div>
                  {/*  */}
                  <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                    <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                      Where did you see a person in need?*
                    </div>
                    {/*  */}
                    <div className="self-stretch w-full h-fit flex-col  flex ">
                      <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                        <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                          State
                        </div>
                      </div>
                      <div className="self-stretch h-fit  border-collapse     ">
                        <div className=" h-14 inline-flex w-full">
                          <select
                            className={`text-zinc-900  w-full h-full px-4 rounded-[4px] text-base font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ${
                              error.stateError !== ""
                                ? "ring-red-500"
                                : "ring-gray-300"
                            }`}
                            defaultValue=""
                            ref={stateRef}
                            onChange={getCities}
                          >
                            <option value="" disabled>
                              Please select from the list
                            </option>
                            {stateNames &&
                              stateNames.map((stateName, index) => {
                                return (
                                  <option
                                    className="w-fit"
                                    value={stateName}
                                    key={"state_" + index}
                                  >
                                    {stateName}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        {error.stateError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs ml-1">
                              {error.stateError}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="self-stretch w-full h-fit flex-col  flex ">
                      <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                        <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                          City
                        </div>
                      </div>
                      <div className="self-stretch h-fit  border-collapse     ">
                        <div className=" h-14 inline-flex w-full">
                          <select
                            className={`text-zinc-900  w-full h-full px-4 rounded-[4px] text-base font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ${
                              error.cityError !== ""
                                ? "ring-red-500"
                                : "ring-gray-300"
                            }`}
                            defaultValue=""
                            disabled={!cityNames}
                            ref={cityRef}
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                          >
                            <option value="" disabled>
                              Please select from the list
                            </option>
                            {cityNames &&
                              cityNames.map((cityName, index) => {
                                return (
                                  <option
                                    className="w-fit"
                                    value={cityName}
                                    key={"city_" + index}
                                  >
                                    {cityName}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        {error.cityError && (
                          <div className="inline-flex items-center">
                            <img
                              src={errorImg}
                              className="w-3 h-3"
                              alt="Error Image"
                            />
                            <p className="text-red-600 text-xs ml-1">
                              {error.cityError}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/*  */}
                  <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                    {/* Grid 2 */}
                    <div className="w-full h-full grid grid-cols-2 gap-4 ">
                      <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                        <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                          <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                            Date
                          </div>
                        </div>
                        <div className="self-stretch h-fit  border-collapse     ">
                          <div className=" h-14  justify-center items-start ">
                            <input
                              type="date"
                              id="-itemnumber"
                              placeholder="Number"
                              className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-base  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ring-gray-300`}
                              ref={date}
                              onChange={handleDateChange}
                            ></input>
                            {/* {error.dateError && (
                            <div className="inline-flex items-center">
                              <img
                                src={errorImg}
                                className="w-3 h-3"
                                alt="Date Error"
                              />
                              <p className="text-red-600 text-xs ml-1">
                                {error.dateError}
                              </p>
                            </div>
                          )} */}
                          </div>
                        </div>
                      </div>
                      {/*  */}
                      <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                        <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                          <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                            Time
                          </div>
                        </div>
                        <div className="self-stretch h-fit  border-collapse     ">
                          <div className=" h-14  justify-center items-start ">
                            <input
                              type="time"
                              id="-itemnumber"
                              placeholder="Number"
                              className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-base  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ring-gray-300`}
                              ref={time}
                              onChange={handleTimeChange}
                            ></input>
                            {/* {error.timeError && (
                            <div className="inline-flex items-center">
                              <img src={errorImg} className="w-3 h-3" />
                              <p className="text-red-600 text-xs ml-1">
                                {error.timeError}
                              </p>
                            </div>
                          )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/**/}
                    <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                      Total number of items donated by you?*
                    </div>
                    <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                      <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                        <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                          Number of Items
                        </div>
                      </div>
                      <div className="self-stretch h-fit  border-collapse">
                        <div className=" h-14  justify-center items-start ">
                          <input
                            id="itemsNumber"
                            placeholder="Number of Items"
                            className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-base  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ${
                              error.itemQtyError !== ""
                                ? "ring-red-500"
                                : "ring-gray-300"
                            }`}
                            required={true}
                            value={itemQty}
                            onChange={handleItemQtyChange}
                          ></input>
                          {error.itemQtyError && (
                            <div className="inline-flex items-center">
                              <img src={errorImg} className="w-3 h-3" />
                              <p className="text-red-600 text-xs ml-1">
                                {error.itemQtyError}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="self-stretch grow shrink basis-0 px-8 pt-[54px] pb-[55px] bg-stone-50 rounded-[30px] border border-stone-300 flex-col justify-start items-center gap-[29px] flex">
                  <div className="self-stretch text-center text-black text-[22px] font-bold font-bricolage leading-7">
                    Street Care helped me prep my outreach
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
                      }}
                    />
                  </div>
                </div>
                <div>
                  <p className="self-stretch font-bricolage text-[18px]">
                    <b>Optional:</b> Would you like to answer more questions? It
                    will help us better assist people in need. If yes{" "}
                    <b>
                      <button
                        className="hover:text-[#6840E0]"
                        onClick={handleOptionalButtonClick}
                      >
                        click here.
                      </button>
                    </b>
                  </p>
                </div>

                {showOptionalQuestions && (
                  <div>
                    {/* <div className="flex-col justify-start items-start gap-16 flex"> */}
                    <div className="self-stretch h-fit flex-col justify-center items-start gap-[24px] flex">
                      <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                        <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                          Who requires further help?*
                        </div>
                        <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                          <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                            <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                              Description
                            </div>
                          </div>
                          <div className="self-stretch h-fit  border-collapse">
                            <div className=" h-14  justify-center items-start ">
                              <input
                                id="furtherHelpDescription"
                                type="text"
                                placeholder="E.g. Tommy, a senior citizen in a wheelchair wearing a navy blue top and brown shoes."
                                className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-[15px]  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ring-gray-300 ${
                                  error.optDescError !== ""
                                    ? "ring-red-500"
                                    : "ring-gray-300"
                                }`}
                                required={true}
                                // value={furtherHelpDescription}
                                onChange={handleOptDescChange}
                                ref={optDesc}
                              ></input>
                              {error.optDescError && (
                                <div className="inline-flex items-center">
                                  <img src={errorImg} className="w-3 h-3" />
                                  <p className="text-red-600 text-xs ml-1">
                                    {error.optDescError}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* {error.furtherHelpDescriptionError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs ml-1">
                              {error.furtherHelpDescriptionError}
                            </p>
                          </div>
                        )} */}
                      </div>
                      <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                        <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                          Can you describe the location or landmark of the
                          person(s) in need of help?*
                        </div>
                        <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                          {/* <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                        <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                          Description
                        </div>
                      </div> */}
                          <div className="self-stretch h-fit  border-collapse">
                            <div className=" h-14  justify-center items-start ">
                              <input
                                id="furtherHelpLocation"
                                placeholder="E.g. 187 Hambridge Street, NY"
                                className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-[15px]  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ring-gray-300 ${
                                  error.optLandmarkError !== ""
                                    ? "ring-red-500"
                                    : "ring-gray-300"
                                }`}
                                required={true}
                                onChange={handleOptLandmarkChange}
                                ref={optLandmark}
                              ></input>
                              {error.optLandmarkError && (
                                <div className="inline-flex items-center">
                                  <img src={errorImg} className="w-3 h-3" />
                                  <p className="text-red-600 text-xs ml-1">
                                    {error.optLandmarkError}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                        <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                          What time was the encounter?
                        </div>
                        <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                          {/* <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                        <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                          Description
                        </div>
                      </div> */}
                          <div className="self-stretch h-fit  border-collapse">
                            <div className=" h-14  justify-center items-start ">
                              <input
                                id="furtherHelpEncounterTime"
                                placeholder="2023-01-01 10:00"
                                className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-[15px]  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ring-gray-300`}
                                required=""
                              ></input>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex"> */}
                      <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                        <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                          What further help is needed?
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
                              className="inline-flex items-start justify-between w-full h-[140px] p-3 bg-slate-200 border-4 border-gray-200 rounded-[30px] cursor-pointer peer-checked:border-[#5F36D6] peer-checked:text-gray-600 text-neutral-800 text-base font-bold font-bricolage leading-normal ring-1 ring-inset ring-gray-300"
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
                              value=""
                              className="w-[18px] h-[18px] m-5 cursor-pointer accent-[#5F36D6] peer absolute"
                              required="Medical Help"
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
                              <div class="w-full h-full mb-6  text-base font-semibold ">
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
                              onChange={handleItemArray}
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
                        {/* {error.checkboxesError && (
                        <div className="inline-flex items-center">
                          <img src={errorImg} className="w-3 h-3" />
                          <p className="text-red-600 text-xs ml-1">
                            {error.checkboxesError}
                          </p>
                        </div>
                      )} */}
                      </div>

                      <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                        When is the follow-up needed?
                      </div>
                      <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                        {/* <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                        <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                          Description
                        </div>
                      </div> */}
                        <div className="self-stretch h-fit  border-collapse">
                          <div className=" h-14  justify-center items-start ">
                            <input
                              id="furtherHelpFollowUp"
                              placeholder="2023-01-01"
                              className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-[15px]  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ring-gray-300`}
                              required=""
                            ></input>
                          </div>
                        </div>
                      </div>

                      <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                        Is there anything else other volunteers should know?
                      </div>
                      <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                        {/* <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                        <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                          Description
                        </div>
                      </div> */}
                        <div className="self-stretch h-fit  border-collapse">
                          <div className=" h-14  justify-center items-start ">
                            <input
                              id="furtherHelpVolunteers"
                              placeholder="Please specify here"
                              className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-[15px]  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ring-gray-300`}
                              required=""
                            ></input>
                          </div>
                        </div>
                      </div>

                      <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                        <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                          Choose which information to share with the community
                          to improve assistance*
                        </div>
                        <div className=" justify-end items-end inline-flex ">
                          <input
                            type="checkbox"
                            // id="food-option"
                            value=""
                            className="w-[18px] h-[18px] m-5 cursor-pointer accent-[#5F36D6] peer absolute"
                            required=""
                            // ref={(el) => (checkboxes.current[0] = el)}
                            // onChange={handleItemArray}
                            ref={infoShareCheckbox}
                            checked={isInfoShareCheckboxChecked}
                            onChange={handleInfoShareCheckboxChange}
                          ></input>
                          <label
                            // for="food-option"
                            className={`inline-flex items-start justify-between w-full h-[140px] p-3 bg-slate-200 border-4 border-gray-200 rounded-[30px] cursor-pointer peer-checked:border-[#5F36D6] peer-checked:text-gray-600 text-neutral-800 text-base font-bold font-bricolage leading-normal ring-1 ring-inset ring-gray-300 ${
                              !isInfoShareCheckboxChecked &&
                              error.infoShareCheckboxError !== ""
                                ? "ring-red-500"
                                : "ring-gray-300"
                            }`}
                          >
                            <div className="w-full h-full mb-6 text-base font-semibold">
                              {" "}
                              Location where help provided
                            </div>
                          </label>
                        </div>
                        {error.infoShareCheckboxError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs ml-1">
                              {error.infoShareCheckboxError}
                            </p>
                          </div>
                        )}
                      </div>
                      {/*  */}

                      <div>
                        <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                          In case of a serious situation, dial 911 immediately.
                        </div>
                      </div>
                      {/* <span className="text-gray-500 self-stretch justify-normal font-bricolage">
                        If you can, it’s most helpful for you to fill out one
                        visit log per person. This way it enables us to provide
                        far better services and outreach to each person. That’s
                        totally optional, any information is great!
                      </span> */}
                    </div>
                  </div>
                )}
                <span className="text-gray-500 self-stretch justify-normal font-bricolage">
                  If you can, it’s most helpful for you to fill out one visit
                  log per person. This way it enables us to provide far better
                  services and outreach to each person. That’s totally optional,
                  any information is great!
                </span>
                {/*  */}
                <div className="justify-start items-start gap-4 inline-flex">
                  <div className="justify-start items-start gap-4 flex">
                    <CustomButton
                      label="Done"
                      name="buttondefault"
                      onClick={handleSubmit}
                    />
                  </div>
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

export default PersonalOutForm;
