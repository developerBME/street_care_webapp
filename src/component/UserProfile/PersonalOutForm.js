import React from "react";
import { useState, useRef, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { AiOutlineStar, AiTwotoneStar, AiFillStar } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import CustomButton from "../Buttons/CustomButton";
import errorImg from "../../images/error.png";

const starStyle = {
  width: 60,
  height: 60,
};

function PersonalOutForm() {
  const navigate = useNavigate();
  // const ratingChanged = (newRating) => {
  //   console.log(newRating);
  // };
  const numberHelped = useRef("");
  const date = useRef("");
  const time = useRef("");
  const cityRef = useRef("");
  const stateRef = useRef("");
  const itemQtyRef = useRef("");
  const checkboxes = useRef([]);
  const [itemArray, setItemArray] = useState([]);
  const [rating, setRating] = useState(0);
  const [success, setSuccess] = useState(false);
  const [stateList, setStateList] = useState({});
  const [stateNames, setStateNames] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [error, setError] = useState({
    numberHelpedError: "",
    cityError: "",
    stateError: "",
    checkboxesError: "",
    itemQtyError:"",
    dateError: "",
    timeError: "",
  });

  const updateErrorState = (key, value) => {
    setError((prevState) => ({
      ...prevState, // Clone the current state
      [key]: value, // Update the specific key with the new value
    }));
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
  }

  function handleItemArray(e) {
    if (e.target.checked) {
      setItemArray([...itemArray, e.target.value]);
    } else {
      setItemArray(itemArray.filter((item) => item !== e.target.value));
    }
    console.log(itemArray);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Validation Start
    if (!numberHelped.current.value) {
      updateErrorState("numberHelpedError", "Number is required");
    } else {
      updateErrorState("numberHelpedError", "");
    }

    if (itemArray == "") {
      updateErrorState("checkboxesError", "Please provide the kind of help provided");
    } else {
      updateErrorState("checkboxesError", "");
    }

    if (!stateRef.current.value) {
      updateErrorState("stateError", "Select State");
    } else {
      updateErrorState("stateError", "");
    }

    if (!cityRef.current.value) {
      updateErrorState("cityError", "Select City");
    } else {
      updateErrorState("cityError", "");
    }

    if (!date.current.value) {
      updateErrorState("dateError", "Enter a date");
    } else {
      updateErrorState("dateError", "");
    }

    if (!time.current.value) {
      updateErrorState("timeError", "Enter a time");
    } else {
      updateErrorState("timeError", "");
    }

    if (!itemQtyRef.current.value) {
      updateErrorState("itemQtyError", "Enter Quantity");
    } else {
      updateErrorState("itemQtyError", "");
    }

    let obj = {
      uid: fAuth.currentUser.uid,
      numberPeopleHelped: numberHelped.current.value,
      whatGiven: itemArray,
      itemQty: itemQtyRef.current.value,
      date: date.current.value,
      time: time.current.value,
      state: state,
      city: city,
      rating: rating,
    };

    try {
      const logRef = collection(db, "testLog");
      const docRef = await addDoc(logRef, obj);
      if (docRef.id) {
        console.log(docRef.id);
        setSuccess(true);
        clearFields();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const clearFields = () => {
    date.current.value = "";
    numberHelped.current.value = "";
    itemQtyRef.current.value = "";
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
                        Number of people helped
                      </div>
                    </div>
                    <div className="self-stretch h-fit  border-collapse     ">
                      <div className=" h-14  justify-center items-start ">
                        <input
                          type="number"
                          id="numberHelped"
                          placeholder="Number of people helped"
                          className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] border-0 text-base font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ${error.numberHelpedError !== "" ? "ring-red-500" : "ring-gray-300"}`}
                          required={true}
                          ref={numberHelped}
                        ></input>
                        {error.numberHelpedError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs">{error.numberHelpedError}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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
                      <p className="text-red-600 text-xs">{error.checkboxesError}</p>
                    </div>
                  )}
                </div>
                {/*  */}
                <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                  <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                    Where did you spot the homeless person?
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
                          className={`text-zinc-900  w-full h-full px-4 rounded-[4px] text-base font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ${error.stateError !== "" ? "ring-red-500" : "ring-gray-300"}`}
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
                            <p className="text-red-600 text-xs">{error.stateError}</p>
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
                          className={`text-zinc-900  w-full h-full px-4 rounded-[4px] text-base font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ${error.cityError !== "" ? "ring-red-500" : "ring-gray-300"}`}
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
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs">{error.cityError}</p>
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
                            className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-base  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ${error.dateError !== "" ? "ring-red-500" : "ring-gray-300"}`}
                            ref={date}
                          ></input>
                          {error.dateError && (
                            <div className="inline-flex items-center">
                              <img src={errorImg} className="w-3 h-3" />
                              <p className="text-red-600 text-xs">{error.dateError}</p>
                            </div>
                          )}
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
                            className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-base  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ${error.timeError !== "" ? "ring-red-500" : "ring-gray-300"}`}
                            ref={time}
                          ></input>
                          {error.timeError && (
                            <div className="inline-flex items-center">
                              <img src={errorImg} className="w-3 h-3" />
                              <p className="text-red-600 text-xs">{error.timeError}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/**/}
                  <div className="self-stretch text-neutral-800 text-[22px] font-bold font-bricolage leading-7">
                    Total number of items donated by you?
                  </div>
                  <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                    <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                      <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                        Number of Items
                      </div>
                    </div>
                    <div className="self-stretch h-fit  border-collapse     ">
                      <div className=" h-14  justify-center items-start ">
                        <input
                          type="number"
                          id="itemsNumber"
                          placeholder="Number of Items"
                          className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-base  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ${error.itemQtyError !== "" ? "ring-red-500" : "ring-gray-300"}`}
                          required={true}
                          ref={itemQtyRef}
                        ></input>
                        {error.itemQtyError && (
                            <div className="inline-flex items-center">
                              <img src={errorImg} className="w-3 h-3" />
                              <p className="text-red-600 text-xs">{error.itemQtyError}</p>
                            </div>
                          )}
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
                  <div className="justify-start items-start gap-4 inline-flex">
                    <div className="justify-start items-start gap-4 flex">
                      Success!
                    </div>
                  </div>
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
