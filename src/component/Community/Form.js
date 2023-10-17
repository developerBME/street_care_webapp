import React, { useRef, useState } from "react";

import Chip from "../Community/Chip";
import arrowDown from "../../images/arrowDown.png";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import errorImg from "../../images/error.png"

const chipList = [
  "Clothing",
  "Education",
  "Personal Care",
  "Employment and Training",
  "Food and water",
  "Healthcare",
  "Chinese",
  "Spanish",
  "Language(please specify)",
  "Legal",
  "Shelter",
  "Transportation",
  "LGBTQ Support",
  "Technology Access",
  "Social Integration",
  "Pet Care",
];

const Form = () => {
  const [success, setSuccess] = useState(false);
  const nameRef = useRef("");
  const descRef = useRef("");
  const maxCapRef = useRef("");
  const streetRef = useRef("");
  const stateRef = useRef("");
  const zipcodeRef = useRef("");
  const dateRef = useRef("");
  const startTimeRef = useRef("");
  const endTimeRef = useRef("");
  const [helpType, setHelpType] = useState([]);
  const [clear, setClear] = useState(false);
  

  const [error, setError] = useState({
    nameError:"",
    streetError:"",
    stateError:"",
    zipError:"",
    dateError:"",
    stimeError:"",
    etimeError:"",
  })

  //
  const fAuth = getAuth();
  //

  const updateErrorState = (key, value) => {
    setError((prevState) => ({
      ...prevState, // Clone the current state
      [key]: value   // Update the specific key with the new value
    }));
  };

  const clearFields = () => {
    dateRef.current.value = "";
    startTimeRef.current.value = "";
    endTimeRef.current.value = "";
    stateRef.current.value = "";
    nameRef.current.value = "";
    descRef.current.value = "";
    maxCapRef.current.value = "";
    streetRef.current.value = "";
    setHelpType([]);
    setClear(true);
  };

  // This function is drilled to child component: Chips
  function handleHelpTypeArray(val, checked) {
    if (checked) {
      setHelpType([...helpType, val]);
    } else {
      setHelpType(helpType.filter((item) => item !== val));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Validation Start
    if (!nameRef.current.value) {
      updateErrorState("nameError", "Name is required");
    }else{
      updateErrorState("nameError","")
    }

    if (!streetRef.current.value) {
      updateErrorState("streetError", "Street is required");
    }else{
      updateErrorState("streetError","");
    }

    if (!stateRef.current.value) {
      updateErrorState("stateError", "Street is required");
    }else{
      updateErrorState("stateError","");
    }

    if (!zipcodeRef.current.value) {
      updateErrorState("zipError", "Zipcode is required");
    }else{
      updateErrorState("zipError","");
    }

    if (!dateRef.current.value) {
      updateErrorState("dateError", "Date is required");
    }else{
      updateErrorState("dateError","");
    }

    if (!startTimeRef.current.value) {
      updateErrorState("stimeError", "Start Time is required");
    }else{
      updateErrorState("stimeError","");
    }

    if (!endTimeRef.current.value) {
      updateErrorState("etimeError", "End Time is required");
    }else{
      updateErrorState("eTimeerror","");
    }


    let obj = {
      uid: fAuth.currentUser.uid,
      title: nameRef.current.value,
      description: descRef.current.value,
      eventDate: dateRef.current.value,
      eventEndTime: startTimeRef.current.value,
      eventStartTime: endTimeRef.current.value,
      totalSlots: maxCapRef.current.value,
      state: stateRef.current.value,
      street: streetRef.current.value,
      skills: helpType,
      createdAt: Date(),
      interests: 0,
      participants: [],
      approved: false,
    };

    try {
      const eventRef = collection(db, "outreachEvents");
      const docRef = await addDoc(eventRef, obj);
      if (docRef.id) {
        console.log(docRef.id);
        setSuccess(true);
        clearFields();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <div className="lg:text-5xl text-3xl font-medium font-bricolage pb-4 lg:pb-16">
            Create Outreach Event
          </div>
          <div className="space-y-4">
            <div className="font-semibold font-bricolage text-[22px]">
              Event Information
            </div>
            <div className="space-y-1.5">
              <p className="font-semibold font-['Inter'] text-[15px]">
                Event Name*
              </p>
              <input
                type="text"
                className={`px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  ${
                  error.nameError!=="" ? 'ring-red-500':'ring-gray-300'
                }`}
                placeholder="Use Location by default for group meetup"
                id="event-name"
                ref={nameRef}
              />
              {error.nameError && (
                <div className="inline-flex items-center">
                <img src={errorImg} className="w-3 h-3"/>
                  <p className="text-red-600 text-xs">{error.nameError}</p>
                </div>
                
              )}
            </div>
            <div className="space-y-1.5">
              <p className="font-semibold font-['Inter'] text-[15px]">
                Event Description
              </p>
              <input
                type="text"
                className="px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "
                placeholder="Details"
                id="event-desc"
                ref={descRef}
              />
            </div>
            <div className="space-y-1.5">
              <p className="font-semibold font-['Inter'] text-[15px]">
                Maximum capacity of participants allowed
              </p>
              <input
                type="text"
                className="w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "
                id="max-cap"
                ref={maxCapRef}
              />
              <p className="font-normal font-['Inter'] text-xs">
                Please provide a numerical value.
              </p>
            </div>
            <div className="text-[22px] font-semibold font-bricolage">
              Meet up Details
            </div>
            <div className="space-y-1.5">
              <p className="font-semibold font-['Inter'] text-[15px]">
                Street*
              </p>
              <input
                type="text"
                className={`px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                  error.streetError!=="" ? 'ring-red-500':'ring-gray-300'
                }`}
                placeholder="Street"
                id="street"
                ref={streetRef}
              />
              {error.streetError && (
                <div className="inline-flex items-center">
                <img src={errorImg} className="w-3 h-3"/>
                  <p className="text-red-600 text-xs">{error.streetError}</p>
                </div>
                
              )}
            </div>
            <div className="inline-flex grid grid-cols-2 space-x-4">
              <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  State*
                </p>
                <input
                  type="text"
                  className={`px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                    error.stateError!=="" ? 'ring-red-500':'ring-gray-300'
                  }`} 
                  placeholder="New York"
                  id="state"
                  ref={stateRef}
                />
                {error.stateError && (
                  <div className="inline-flex items-center">
                  <img src={errorImg} className="w-3 h-3"/>
                    <p className="text-red-600 text-xs">{error.stateError}</p>
                  </div>
                  
                )}
              </div>
              <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  Zipcode*
                </p>
                <input
                  type="text"
                  className={`px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                    error.zipError!=="" ? 'ring-red-500':'ring-gray-300'
                  }`}
                  placeholder="11201"
                  id="zipcode"
                  ref={zipcodeRef}
                />
                {error.zipError && (
                  <div className="inline-flex items-center">
                  <img src={errorImg} className="w-3 h-3"/>
                    <p className="text-red-600 text-xs">{error.zipError}</p>
                  </div>
                  
                )}
              </div>
            </div>
            <div>
              <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  Date*
                </p>
                <input
                  type="date"
                  className={`px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                    error.dateError!=="" ? 'ring-red-500':'ring-gray-300'
                  }`}
                  id="date"
                  ref={dateRef}
                />
                {error.dateError && (
                  <div className="inline-flex items-center">
                  <img src={errorImg} className="w-3 h-3"/>
                    <p className="text-red-600 text-xs">{error.dateError}</p>
                  </div>
                  
                )}
                <p className="font-normal font-['Inter'] text-xs">
                  Please follow the format mm/dd/yyyy
                </p>
              </div>
            </div>
            <div className="inline-flex space-x-4 grid grid-cols-2">
              <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  Start Time*
                </p>
                <input
                  type="time"
                  className={`px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                    error.stimeError!=="" ? 'ring-red-500':'ring-gray-300'
                  }`} 
                  id="start-time"
                  ref={startTimeRef}
                />
                {error.stimeError && (
                  <div className="inline-flex items-center">
                  <img src={errorImg} className="w-3 h-3"/>
                    <p className="text-red-600 text-xs">{error.stimeError}</p>
                  </div>
                  
                )}
              </div>
              <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  End Time*
                </p>
                <input
                  type="time"
                  className={`px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                    error.nameError!=="" ? 'ring-red-500':'ring-gray-300'
                  }`} 
                  id="end-time"
                  ref={endTimeRef}
                />
                {error.etimeError && (
                  <div className="inline-flex items-center">
                  <img src={errorImg} className="w-3 h-3"/>
                    <p className="text-red-600 text-xs">{error.etimeError}</p>
                  </div>
                  
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="font-semibold font-bricolage text-[22px]">
            What kind of help they need?
          </div>
          <div className="space-y-1.5 relative">
            <p className="font-semibold font-['Inter'] text-[15px]">
              Is this Event related to any Help Request?
            </p>
            <select
              className="px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring focus:ring-indigo-400 appearance-none"
              defaultValue=""
              id="help-req"
            >
              <option value="" disabled>
                Select Help Request
              </option>
              <option value="helpRequest1">Help Request 1</option>
              <option value="helpRequest2">Help Request 2</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-5 text-gray-700">
              <img src={arrowDown} />
            </div>
          </div>

          <div className="font-semibold font-bricolage text-[15px]">
            Select skills it would require to provide the help
          </div>
          <div className="lg:w-[587px] space-y-2">
            {chipList.map((value, index) => (
              <Chip
                keyName={"chip-" + index}
                val={value}
                setter={handleHelpTypeArray}
                clear={clear}
              />
            ))}
          </div>
        </div>
        <div className="space-y-16 space-x-[15px]">
          <button className="px-8 py-4 border border-[#5F35D5] rounded-full text-violet-700">
            Cancel
          </button>
          <button className="px-8 py-4 border rounded-full bg-violet-700 text-[#F8F9F0]">
            Publish
          </button>
          {success && (
            <div className="justify-start items-start gap-4 inline-flex">
              <div className="justify-start items-start gap-4 flex">
                Success!
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
