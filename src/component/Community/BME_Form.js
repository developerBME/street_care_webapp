import React, { useRef, useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth} from "firebase/auth";
import errorImg from "../../images/error.png";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { Timestamp } from 'firebase/firestore';
import {checkString,checkNumber} from "../helper/validator"
import CreateBMEModal from "./CreateBMEModal";

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

const BME_Form = () => {
  const [success, setSuccess] = useState(false);
  const nameRef = useRef("");
  const descRef = useRef("");
  const maxCapRef = useRef("");
  const streetRef = useRef("");
  const cityRef = useRef("");
  const stateRef = useRef("");
  const zipcodeRef = useRef("");
  const startTimeRef = useRef("");
  const endTimeRef = useRef("");
  const [setClear] = useState(false);

  const [error, setError] = useState({
    nameError: "",
    streetError: "",
    cityError: "",
    stateError: "",
    zipError: "",
    dateError: "",
    stimeError: "",
    etimeError: "",
    descError:"",
    maxCapError:"",
  });

  //
  const fAuth = getAuth();
  //

  const updateErrorState = (key, value) => {
    setError((prevState) => ({
      ...prevState, // Clone the current state
      [key]: value, // Update the specific key with the new value
    }));
  };

  const clearFields = () => {
    setStartDate(null);
    setEndDate(null);
    stateRef.current.value = "";
    nameRef.current.value = "";
    descRef.current.value = "";
    maxCapRef.current.value = "";
    streetRef.current.value = "";
    cityRef.current.value = "";
    zipcodeRef.current.value = "";
    setClear(true);
  };

  const [shouldSubmit, setShouldSubmit] = useState(false);

  useEffect(() => {
    const submitForm = async () => {
      const hasErrors = Object.values(error).some(errorMessage => errorMessage !== "");
  
      if (hasErrors) {
        console.log("There are errors in the form");
        setShouldSubmit(false); // Reset the submission flag
      } else {
        // Proceed with form submission logic
        try {
          let obj = {
            uid: fAuth.currentUser.uid,
            title: nameRef.current.value,
            description: descRef.current.value,
            eventDate: Timestamp.fromDate(startDate),
            eventEndTime: Timestamp.fromDate(endDate),
            eventStartTime: Timestamp.fromDate(startDate),
            totalSlots: maxCapRef.current.value,
            location: {
              street: streetRef.current.value,
              city: cityRef.current.value,
              state: stateRef.current.value,
              zipcode: zipcodeRef.current.value,
            },
            createdAt: Date(),
            interests: 0,
            participants: [],
            approved: false,
          };
          const eventRef = collection(db, "BMEEvents");
          const docRef = await addDoc(eventRef, obj);
          if (docRef.id) {
            console.log(docRef.id);
            setSuccess(true);
            clearFields();
          }
        } catch (e) {
          console.error(e);
        }
      }
    };
  
    if (shouldSubmit) {
      submitForm();
    }
  }, [shouldSubmit, error]);
    

  const handleNameChange = (e)=>{
    updateErrorState("nameError","")
  }
  const handleStreetChange = (e)=>{
    updateErrorState("streetError","")
  }
  const handleCityChange = (e)=>{
    updateErrorState("cityError","")
  }
  const handleDescChange = (e)=>{
    updateErrorState("descError","")
  }
  const handleCapChange = (e)=>{
    updateErrorState("maxCapError","")
  }
  const handleStateChange = (e)=>{
    updateErrorState("stateError","")
  }
  const handleZipChange = (e)=>{
    updateErrorState("zipError","")
  }
  const handleStimeChange = (e)=>{
    updateErrorState("stimeError","")
  }
  const handleEtimeChange = (e)=>{
    updateErrorState("etimeError","")
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShouldSubmit(true); 


    // Form Validation Start
    if (!nameRef.current.value) {
      updateErrorState("nameError", "Name is required");
    } else {  
      try{
        checkString(nameRef.current.value,"Event Name");
        updateErrorState("nameError","");
      }catch(e){
        updateErrorState("nameError","Description should consist only characters")
      }
    }
    if(descRef.current.value){
      try{
        checkString(descRef.current.value,"Event Name");
        updateErrorState("descError","");
      }catch(e){
        updateErrorState("descError","Should consist only characters")
      }
    }

    try{
      checkNumber(maxCapRef.current.value,"Event Name");
      updateErrorState("maxCapError","");
    }catch(e){
      updateErrorState("maxCapError","Should consist only Numbers")
    }

    if (!streetRef.current.value) {
      updateErrorState("streetError", "Street is required");
    } else {
      try{
        checkString(streetRef.current.value,"Event Name");
        updateErrorState("streetError","");
      }catch(e){
        updateErrorState("streetError","Street should consist only characters")
      }
    }

    if (!cityRef.current.value) {
      updateErrorState("cityError", "City is required");
    } else {
      try{
        checkString(cityRef.current.value,"Event Name");
        updateErrorState("cityError","");
      }catch(e){
        updateErrorState("cityError","Description should consist only characters")
      }
    }

    if (!stateRef.current.value) {
      updateErrorState("stateError", "Street is required");
    } else {
      try{
        checkString(stateRef.current.value,"Event Name");
        updateErrorState("stateError","");
      }catch(e){
        updateErrorState("stateError","Description should consist only characters")
      }
    }

    if (!zipcodeRef.current.value) {
      updateErrorState("zipError", "Zipcode is required");
    } else {
      try{
        checkNumber(zipcodeRef.current.value,"Event Name");
        updateErrorState("zipError","");
      }catch(e){
        updateErrorState("zipError","Should consist only Numbers")
      }
    }

    if (!startDate) {
      updateErrorState("stimeError", "Start Time is required");
    } else {
      updateErrorState("stimeError", "");
    }

    if (!endDate) {
      updateErrorState("etimeError", "End Time is required");
    } else {
      updateErrorState("etimeError", "");
    }

  };

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();


  return (
    <div >
      <form className="space-y-6 " onSubmit={handleSubmit}>
        <div>
          <div className="lg:text-5xl text-3xl font-medium font-bricolage pb-4 lg:pb-16">
            Create BME Official Event
          </div>
          <div className="space-y-4">
            <div className="font-semibold font-bricolage text-[22px]">
              BME Official Event Information
            </div>
            <div className="space-y-1.5">
              <p className="font-semibold font-['Inter'] text-[15px]">
                Event Name*
              </p>
              <input
                type="text"
                className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  ${
                  error.nameError !== "" ? "ring-red-500" : "ring-gray-300"
                }`}
                placeholder="Use Location by default for group meetup"
                id="event-name"
                ref={nameRef}
                onChange={handleNameChange}
              />
              {error.nameError && (
                <div className="inline-flex items-center">
                  <img src={errorImg} className="w-3 h-3" />
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
                className="h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "
                placeholder="Details"
                id="event-desc"
                ref={descRef}
                onChange={handleDescChange}
              />
              {error.descError && (
                <div className="inline-flex items-center">
                  <img src={errorImg} className="w-3 h-3" />
                  <p className="text-red-600 text-xs">{error.descError}</p>
                </div>
              )}
            </div>
            
            <div className="space-y-1.5">
              <p className="font-semibold font-['Inter'] text-[15px]">
                Maximum capacity of participants allowed
              </p>
              <input
                type="text"
                className="h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "
                id="max-cap"
                ref={maxCapRef}
                onChange={handleCapChange}
              />
              <p className="font-normal font-['Inter'] text-xs">
                Please provide a numerical value.
              </p>
              {error.maxCapError && (
                <div className="inline-flex items-center">
                  <img src={errorImg} className="w-3 h-3" />
                  <p className="text-red-600 text-xs">{error.maxCapError}</p>
                </div>
              )}
            </div>
            <div className="text-[22px] font-semibold font-bricolage">
              Event Meet Up Details
            </div>
            <div className="space-y-1.5">
              <p className="font-semibold font-['Inter'] text-[15px]">
                Street*
              </p>
              <input
                type="text"
                className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                  error.streetError !== "" ? "ring-red-500" : "ring-gray-300"
                }`}
                placeholder="Street"
                id="street"
                ref={streetRef}
                onChange={handleStreetChange}
              />
              {error.streetError && (
                <div className="inline-flex items-center">
                  <img src={errorImg} className="w-3 h-3" />
                  <p className="text-red-600 text-xs">{error.streetError}</p>
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <p className="font-semibold font-['Inter'] text-[15px]">City*</p>
              <input
                type="text"
                className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                  error.cityError !== "" ? "ring-red-500" : "ring-gray-300"
                }`}
                placeholder="City"
                id="city"
                ref={cityRef}
                onChange={handleCityChange}
              />
              {error.cityError && (
                <div className="inline-flex items-center">
                  <img src={errorImg} className="w-3 h-3" />
                  <p className="text-red-600 text-xs">{error.cityError}</p>
                </div>
              )}
            </div>
            <div className="grid-cols-2 space-x-4 flex">
              <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  State*
                </p>
                <input
                  type="text"
                  className={`h-12 px-4 w-fit block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                    error.stateError !== "" ? "ring-red-500" : "ring-gray-300"
                  }`}
                  placeholder="New York"
                  id="state"
                  ref={stateRef}
                  onChange={handleStateChange}
                />
                {error.stateError && (
                  <div className="inline-flex items-center">
                    <img src={errorImg} className="w-3 h-3" />
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
                  className={`h-12 px-4 w-fit block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                    error.zipError !== "" ? "ring-red-500" : "ring-gray-300"
                  }`}
                  placeholder="11201"
                  id="zipcode"
                  ref={zipcodeRef}
                  onChange={handleZipChange}
                />
                {error.zipError && (
                  <div className="inline-flex items-center">
                    <img src={errorImg} className="w-3 h-3" />
                    <p className="text-red-600 text-xs">{error.zipError}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 space-x-4">
              <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  Start DateTime*
                </p>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {setStartDate(date); handleStimeChange(date)}}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="Pp"
                  customInput={
                    <CustomInput
                      id="date"
                      className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${error.stimeError !== "" ? "ring-red-500" : "ring-gray-300"
                        }`}
                      ref={startTimeRef}
                    />
                  }
                />
                {error.stimeError && (
                  <div className="inline-flex items-center">
                    <img src={errorImg} className="w-3 h-3" />
                    <p className="text-red-600 text-xs">{error.stimeError}</p>
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  End DateTime*
                </p>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {setEndDate(date); handleEtimeChange(date)}}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="Pp"
                  customInput={
                    <CustomInput
                      id="date"
                      className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${error.etimeError !== "" ? "ring-red-500" : "ring-gray-300"
                        }`}
                      ref={endTimeRef}
                    />
                  }  
                />
                {error.etimeError && (
                  <div className="inline-flex items-center">
                    <img src={errorImg} className="w-3 h-3" />
                    <p className="text-red-600 text-xs">{error.etimeError}</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              
            </div>
          </div>
        </div>

        <div className="mb-3 w-96">
          <label
            htmlFor="formFile"
            className="mb-2 inline-block text-gray-900 font-semibold font-['Inter'] text-[15px]"
          >
          Upload BME Event Image
          </label>
          <input
            className="relative m-0 block w-fit min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            type="file"
           id="formFile"
          />
      </div>
        
        <div className="space-y-8 space-x-[15px]">
          <button
            type="button"
            className="px-8 py-4 border border-[#5F35D5] rounded-full text-violet-700"
          >Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-4 border rounded-full bg-violet-700 text-[#F8F9F0]"
          >
            Publish
          </button>

          {success && (
            <CreateBMEModal isOpen={true} />
          )}
        </div>
      </form>
    </div>
  );
};

export default BME_Form;