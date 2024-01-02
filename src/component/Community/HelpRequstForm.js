import React, { useRef, useState } from "react";
import Chip from "../Community/Chip";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import arrowBack from "../../images/arrowBack.png";
import arrowDown from "../../images/arrowDown.png";
import errorImg from "../../images/error.png";
import { useNavigate } from "react-router-dom";
import { emailConfirmation } from "../EmailService";

function HelpRequestForm() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const addDescRef = useRef("");
  const streetRef = useRef("");
  const cityRef = useRef("");
  const stateRef = useRef("");
  const zipRef = useRef("");
  const idRef = useRef("");
  const titleRef = useRef("");
  const [clear, setClear] = useState(false);
  const [helpType, setHelpType] = useState([]);

  const fAuth = getAuth();

  function handleHelpTypeArray(val, checked) {
    if (checked) {
      setHelpType([...helpType, val]);
    } else {
      setHelpType(helpType.filter((item) => item !== val));
    }
    updateErrorState("checkboxesError", "");
  }

  const chipList = [
    "Childcare",
    "Counseling and Support",
    "Clothing",
    "Education",
    "Personal Care",
    "Employment and Training",
    "Food and Water",
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

  const clearFields = () => {
    addDescRef.current.value = "";
    streetRef.current.value = "";
    cityRef.current.value = "";
    stateRef.current.value = "";
    zipRef.current.value = "";
    idRef.current.value = "";
    titleRef.current.value = "";
    setHelpType([]);
    setClear(true);
  };

  const [isAtLeastOneChipSelected, setIsAtLeastOneChipSelected] = useState(false);
  
  const handleChipClick = (value, isSelected) => {
    setIsAtLeastOneChipSelected(isSelected);
  };

  const [error, setError] = useState({
    streetError: "",
    cityError:"",
    stateError:"",
    zipError: "",
    idError : "",
    checkboxesError: "",
    titleError: "",
  });

  const updateErrorState = (key, value) => {
    setError((prevState) => ({
      ...prevState, // Clone the current state
      [key]: value, // Update the specific key with the new value
    }));
  };

  
  const handleTitleChange = (e) => {
    updateErrorState("titleError", "");
  };
  const handleStreetChange = (e) => {
    updateErrorState("streetError", "");
  };
  const handleCityChange = (e) => {
    updateErrorState("cityError", "");
  };
  const handleStateChange = (e) => {
    updateErrorState("stateError", "");
  };
  const handleZipChange = (e) => {
    updateErrorState("zipError", "");
  };
  const handleIDChange = (e) => {
    updateErrorState("idError", "");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titleRef.current.value) {
      updateErrorState("titleError", "Title is required");
      setSuccess(false);
    } else {
      updateErrorState("titleError", "");
    }
    if (helpType == "") {
      updateErrorState("checkboxesError", "Please provide the kind of help is needed");
      setSuccess(false);
    } else {
      updateErrorState("checkboxesError", "");
    }
    if (!streetRef.current.value) {
      updateErrorState("streetError", "Street is required");
      setSuccess(false);
    } else {
      updateErrorState("streetError", "");
    }
    if (!zipRef.current.value) {
      updateErrorState("zipError", "Zipcode is required");
      setSuccess(false);
    } else {
      updateErrorState("zipError", "");
    }
    if(!cityRef.current.value){
      updateErrorState("cityError","City is required");
      setSuccess(false);
    }else{
      updateErrorState("cityError","");
    }
    if (!idRef.current.value) {
      updateErrorState("idError", "This field is required");
      setSuccess(false);
    } else {
      updateErrorState("idError", "");
    }
    if(!stateRef.current.value){
      updateErrorState("stateError","Sate is required");
      setSuccess(false);
    }else{
      updateErrorState("stateError","")
    }

    let obj = {
      uid: fAuth.currentUser.uid,
      description: addDescRef.current.value,
      identification: idRef.current.value,
      title:titleRef.current.value,
      location: {
        street: streetRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        zipcode: zipRef.current.value,
      },
      skills: helpType,
      createdAt: Date(),
      status: "Need Help" // This is default for every new HR
    };

    const emailHTML = `<div style="border-radius: 30px;background: #F1EEFE; padding: 20px 50px"><h1>Thank you for creating the outreach</h1><p>Your Help Request <b>${titleRef.current.value}</b> has been successfully created and you can view it in your profile.</p>
          <p>Here are some of the details:</p>
          <ul>
          <li>Description: ${addDescRef.current.value}</li>
          <li>Location: ${streetRef.current.value}, ${cityRef.current.value}, ${stateRef.current.value}, ${zipRef.current.value}</li>
          <li>Help Type: ${idRef.current.value}</li>
          </ul>
    </div>`;

    try {
      const reqRef = collection(db, "helpRequests");
      const docRef = await addDoc(reqRef, obj);
      if (docRef.id) {
        console.log(docRef.id);
        setSuccess(true);
        emailConfirmation(fAuth.currentUser.email, fAuth.currentUser.displayName, titleRef.current.value, emailHTML);
        clearFields();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <form>
        <div className="relative flex flex-col items-center ">
          <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl text-black ">
            <div className="inline-flex pl-3 lg:pl-40 cursor-pointer pb-[19px]">
              <img src={arrowBack} />
              <p className="font-semibold font-bricolage text-[22px]" onClick={() => {navigate("/community");}}>
                Return to Profile
              </p>
            </div>
            <div className="rounded-2xl mx-2 mb-32 lg:mx-40 bg-[#F8F9F0] p-4 lg:pt-[100px] lg:pb-[100px] lg:pr-[150px] lg:pl-[150px]">
              <div>
                <form>
                  <div>
                    <div className="lg:text-5xl text-3xl font-medium font-bricolage pb-4 lg:pb-16">
                      🙌 Need extra help?
                      <br /> Let us spread the word!
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-black text-2xl font-bricolage font-medium">
                        Publish a request to Community Hub
                      </div>
                      <div className="text-zinc-700 text-sm font-normal font-['Open Sans'] ">
                        If this homeless person requires further assistance,
                        please provide additional details so we can share with
                        the community and rally support to help them.
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-zinc-700 font-semibold text-[15px] font-['Inter']">
                        Title
                      </div>
                      <input
                        type="text"
                        className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${ error.titleError !== "" ? "ring-red-500" : "ring-gray-300" }`}
                        placeholder="Title"
                        required
                        ref={titleRef}
                        onChange={handleTitleChange}
                      />
                    </div>
                    {error.titleError && (
                      <div className="inline-flex items-center">
                        <img src={errorImg} className="w-3 h-3" />
                        <p className="text-red-600 text-xs">
                          {error.titleError}
                        </p>
                      </div>
                    )}
                    <div className="text-black font-bold font-bricolage text-sm">
                      What kind of help they need?*
                    </div>
                    <div className="space-y-2">
                      {chipList.map((value, index) => (
                        <Chip
                          key={"chip-" + index}
                          val={value}
                          setter={handleHelpTypeArray}
                          clear={clear}
                        />
                      ))}
                    </div>
                    {error.checkboxesError && (
                      <div className="inline-flex items-center">
                        <img src={errorImg} className="w-3 h-3" />
                        <p className="text-red-600 text-xs">
                          {error.checkboxesError}
                        </p>
                      </div>
                    )}
                    <div className="space-y-1.5">
                      <div className="text-zinc-700 font-semibold text-[15px] font-['Inter']">
                        Additional Notes
                      </div>
                      <input
                        type="text"
                        className="h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "
                        placeholder="Description"
                        ref={addDescRef}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium font-bricolage text-2xl text-black">
                        Help other volunteers to find them
                      </div>
                      <div className="text-zinc-700 text-sm font-normal font-['Open Sans'] ">
                        Please provide as many details as you can to help us
                        locate them
                      </div>
                    </div>
                    <div className="inline-flex grid grid-cols-2 space-x-4">
                      <div className="space-y-1.5">
                        <p className="font-semibold font-['Inter'] text-[15px]">
                          Street*
                        </p>
                        <input
                          type="text"
                          className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${ error.streetError !== "" ? "ring-red-500" : "ring-gray-300" }`}
                          placeholder="Street"
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
                        <p className="font-semibold font-['Inter'] text-[15px]">
                          City*
                        </p>
                        <input
                          type="text"
                          className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${ error.cityError !== "" ? "ring-red-500" : "ring-gray-300" }`}
                          placeholder="City"
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
                    </div>
                    <div className="inline-flex grid grid-cols-2 space-x-4">
                      <div className="space-y-1.5">
                        <p className="font-semibold font-['Inter'] text-[15px]">
                          State*
                        </p>
                        <input
                          type="text"
                          className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${ error.stateError !== "" ? "ring-red-500" : "ring-gray-300" }`}
                          placeholder="State"
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
                          className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${ error.zipError !== "" ? "ring-red-500" : "ring-gray-300" }`}
                          placeholder="Zipcode"
                          ref={zipRef}
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
                    <div className="space-y-1.5">
                      <div className="font-semibold font-['Inter'] text-[15px]">
                        How can we identify this person?*
                      </div>
                      <input
                        type="text"
                        className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${ error.idError !== "" ? "ring-red-500" : "ring-gray-300" }`}
                        placeholder="Blue Shirt"
                        ref={idRef}
                        onChange={handleIDChange}
                      />
                      {error.idError && (
                        <div className="inline-flex items-center">
                          <img src={errorImg} className="w-3 h-3" />
                          <p className="text-red-600 text-xs">{error.idError}</p>
                        </div>
                      )}
                    </div>
                    
                  </div>
                  <div className="inline-flex gap-2 items-center mt-6">
                    <input type="checkbox"></input>
                    <div>
                      <span className="text-black text-sm font-normal font-['Open Sans'] leading-tight">
                        Post to{" "}
                      </span>
                      <span className="text-black text-sm font-bold font-['Open Sans'] leading-tight">
                        Community Hub
                      </span>
                      <span className="text-black text-sm font-normal font-['Open Sans'] leading-tight">
                        {" "}
                        anonymously
                      </span>
                    </div>
                  </div>
                  <div className="space-y-16 space-x-[15px]">
                    <button
                      type="button"
                      className="px-8 py-4 border border-[#5F35D5] rounded-full text-violet-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-8 py-4 border rounded-full bg-violet-700 text-[#F8F9F0]"
                    >
                      Publish
                    </button>
                  </div>
                  {success && (
                    <div className="justify-start items-start gap-4 inline-flex">
                      <div className="justify-start items-start gap-4 flex">
                        Success!
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default HelpRequestForm;
