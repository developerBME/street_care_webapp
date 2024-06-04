import React, { useRef, useState, useEffect } from "react";

import Chip from "../Community/Chip";
import arrowDown from "../../images/arrowDown.png";
import { doc, updateDoc, addDoc, collection, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import errorImg from "../../images/error.png";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Timestamp } from "firebase/firestore";
import { checkString, checkNumber } from "../helper/validator";
import { UpdateDisabledRounded } from "@mui/icons-material";
import CreateOutreachModal from "./CreateOutreachModal";
import { fetchHelpReqById } from "../HelpRequestService";
import { emailConfirmation } from "../EmailService";
import { Link } from "react-router-dom";

const chipList = [
  "Childcare",
  "Counseling and Support",
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

let autoComplete;

export const GOOGLE_PLACES_API_KEY = "AIzaSyBpaLVj2EjhjCeHbTUXfcBhBoaQLVathvE";

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readystate === "loaded" || script.readyState === "complete") {
      }
    };
  } else {
    script.onload = () => callback();
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const Form = (hrid) => {
  // console.log(hrid.hrid);
  const [success, setSuccess] = useState(false);
  const nameRef = useRef("");
  const descRef = useRef("");
  const maxCapRef = useRef("");
  const streetRef = useRef("");
  const cityRef = useRef("");
  const stateRef = useRef("");
  const zipcodeRef = useRef("");
  const helpRef = useRef("");
  const startTimeRef = useRef("");
  const endTimeRef = useRef("");
  const [helpType, setHelpType] = useState([]);
  const [clear, setClear] = useState(false);
  const [stateList, setStateList] = useState({});
  const [stateNames, setStateNames] = useState([]);
  const [cityNames, setCityNames] = useState([]);
  // const [state, setState] = useState("");
  // const [city, setCity] = useState("");
  const [helpBool, setHelpBool] = useState(false);
  const [helpDetails, setHelpDetails] = useState({});
  const [helpReqError, setHelpReqError] = useState(false);

  const [error, setError] = useState({
    nameError: "",
    streetError: "",
    cityError: "",
    stateError: "",
    zipError: "",
    dateError: "",
    stimeError: "",
    etimeError: "",
    helpError: "",
    descError: "",
    maxCapError: "",
    idError: "",
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
    //dateRef.current.value = "";
    setStartDate(null);
    setEndDate(null);
    stateRef.current.value = "";
    nameRef.current.value = "";
    descRef.current.value = "";
    maxCapRef.current.value = "";
    streetRef.current.value = "";
    cityRef.current.value = "";
    zipcodeRef.current.value = "";
    helpRef.current.value = "";
    setHelpType([]);
    setClear(true);
  };

  // This function is drilled to child component: Chips
  function handleHelpTypeArray(val, checked) {
    if (checked) {
      setHelpType((helpType) => [...helpType, val]);
    } else {
      setHelpType(helpType.filter((item) => item !== val));
    }
  }
  const [shouldSubmit, setShouldSubmit] = useState(false);

  useEffect(() => {
    if (hrid.hrid) {
      setHelpBool(true);
      const getHelpDetails = async () => {
        try {
          const helpData = await fetchHelpReqById(hrid.hrid);
          setHelpDetails(helpData);
        } catch (e) {
          setHelpReqError(true);
        }
      };
      getHelpDetails();
    } else {
      setHelpBool(false);
    }
  }, [hrid.hrid]);

  useEffect(() => {
    if (helpDetails.title) {
      nameRef.current.value = helpDetails.title;
    }
    if (helpDetails?.location?.street) {
      streetRef.current.value = helpDetails?.location?.street;
    }
    if (helpDetails?.location?.zipcode) {
      zipcodeRef.current.value = helpDetails?.location?.zipcode;
    }
    if (helpDetails?.location?.state && stateRef.current) {
      stateRef.current.value = helpDetails?.location?.state;
    }
    if (helpDetails?.location?.city && cityRef.current) {
      cityRef.current.value = helpDetails?.location?.city;
    }
  }, [helpDetails]);

  useEffect(() => {
    const submitForm = async () => {
      const hasErrors = Object.values(error).some(
        (errorMessage) => errorMessage !== ""
      );

      if (hasErrors) {
        console.log("There are errors in the form");
        setShouldSubmit(false); // Reset the submission flag
      } else {
        // Proceed with form submission logic

        // is this help request flow?
        // true if redirected from help request and false for organic outreach event.
        const isHelpReqFlow = !(typeof hrid.hrid == "undefined");
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
            helpType: helpRef.current.value,
            skills: helpType,
            createdAt: Date(),
            interests: 0,
            participants: [],
            approved: false,
            helpRequest: isHelpReqFlow ? [hrid.hrid] : [],
          };

          // Insert doc in outreach event
          const eventRef = collection(db, "outreachEvents");

          async function postDoc(ref, obj) {
            const docRef = await addDoc(ref, obj);
            return docRef.id;
          }
          const ack = await postDoc(eventRef, obj);

          // check if flow comes from help request
          if (isHelpReqFlow) {
            const helpRequestRef = doc(db, "helpRequests", hrid.hrid);
            const helpData = await fetchHelpReqById(hrid.hrid);
            let outreachEvent = helpData.outreachEvent || [];
            outreachEvent.push(ack);
            const updateRef = await updateDoc(helpRequestRef, {
              status: "Help on the way",
              outreachEvent: outreachEvent,
            });
          }

          const emailHTML = `<div style="border-radius: 30px;background: #F1EEFE; padding: 20px 50px"><h1>Thank you for creating the outreach</h1><p>Your outreach <b>${nameRef.current.value}</b> has been successfully created and you can view it in your profile.</p>
          <p>Here are some of the details:</p>
          <ul>
          <li>Description: ${descRef.current.value}</li>
          <li>Location: ${streetRef.current.value}, ${cityRef.current.value}, ${stateRef.current.value}, ${zipcodeRef.current.value}</li>
          <li>Help Type: ${helpRef.current.value}</li>
          </ul>
          </div>`;
          // Successful if outreach event is updated
          if (ack) {
            setSuccess(true);
            emailConfirmation(
              fAuth.currentUser.email,
              fAuth.currentUser.displayName,
              nameRef.current.value,
              emailHTML
            );
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

  useEffect(() => {
    console.log(helpType);
  }, [helpType]);

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
    // setState(e.target.value);
    setCityNames(filteredData);
    updateErrorState("stateError", "");
    updateErrorState("cityError", "");
  }

  const handleNameChange = (e) => {
    updateErrorState("nameError", "");
  };
  const handleStreetChange = (e) => {
    setStreet(e.target.value);
    updateErrorState("streetError", "");
  };
  const handleCityChange = (e) => {
    setCityName(e.target.value);
    updateErrorState("cityError", "");
  };
  const handleDescChange = (e) => {
    updateErrorState("descError", "");
  };
  const handleCapChange = (e) => {
    updateErrorState("maxCapError", "");
  };
  const handleStateChange = (e) => {
    updateErrorState("stateError", "");
  };
  const handleZipChange = (e) => {
    setPostCode(e.target.value);
    updateErrorState("zipError", "");
  };
  const handleHelpChange = (e) => {
    updateErrorState("helpError", "");
  };
  const handleStimeChange = (e) => {
    updateErrorState("stimeError", "");
  };
  const handleEtimeChange = (e) => {
    updateErrorState("etimeError", "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShouldSubmit(true);

    // Form Validation Start
    if (!nameRef.current.value) {
      updateErrorState("nameError", "Name is required");
    } else {
      try {
        checkString(nameRef.current.value, "Event Name");
        updateErrorState("nameError", "");
      } catch (e) {
        updateErrorState(
          "nameError",
          "Description should consist only characters"
        );
      }
    }

    if (!descRef.current.value) {
      updateErrorState("descError", "Description is required");
    } else {
      try {
        checkString(descRef.current.value, "Event Name");
        updateErrorState("descError", "");
      } catch (e) {
        updateErrorState("descError", "Should consist only characters");
      }
    }

    try {
      checkNumber(maxCapRef.current.value, "Event Name");
      updateErrorState("maxCapError", "");
    } catch (e) {
      updateErrorState("maxCapError", "Should consist only Numbers");
    }

    if (!streetRef.current.value) {
      updateErrorState("streetError", "Street is required");
    } else {
      try {
        checkString(streetRef.current.value, "Event Name");
        updateErrorState("streetError", "");
      } catch (e) {
        updateErrorState(
          "streetError",
          "Street should consist only characters"
        );
      }
    }

    if (!cityRef.current.value) {
      updateErrorState("cityError", "City is required");
    } else {
      try {
        checkString(cityRef.current.value, "Event Name");
        updateErrorState("cityError", "");
      } catch (e) {
        updateErrorState(
          "cityError",
          "Description should consist only characters"
        );
      }
    }

    if (!stateRef.current.value) {
      updateErrorState("stateError", "State is required");
    } else {
      try {
        checkString(stateRef.current.value, "Event Name");
        updateErrorState("stateError", "");
      } catch (e) {
        updateErrorState(
          "stateError",
          "Description should consist only characters"
        );
      }
    }

    if (!zipcodeRef.current.value) {
      updateErrorState("zipError", "Zipcode is required");
    } else {
      try {
        checkNumber(zipcodeRef.current.value, "Event Name");
        updateErrorState("zipError", "");
      } catch (e) {
        updateErrorState("zipError", "Should consist only Numbers");
      }
    }

    if (startDate && endDate && startDate >= endDate) {
      updateErrorState(
        "stimeError",
        "Start DateTime should be before End DateTime"
      );
    } else {
      updateErrorState("stimeError", "");
    }

    if (!startDate) {
      updateErrorState("stimeError", "Start DateTime is required");
    } else {
      updateErrorState("stimeError", "");
    }

    if (!endDate) {
      updateErrorState("etimeError", "End DateTime is required");
    } else {
      updateErrorState("etimeError", "");
    }

    if (!helpRef.current.value) {
      updateErrorState("helpError", "Help Type is required");
    } else {
      try {
        checkString(helpRef.current.value, "Event Name");
        updateErrorState("helpError", "");
      } catch (e) {
        updateErrorState(
          "helpError",
          "This field should consist only characters"
        );
      }
    }
  };

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  //Address Autocomplete functionality
  const [query, setQuery] = useState();
  const autoCompleteRef = useRef(null);
  const [street, setStreet] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [postcode, setPostCode] = useState("");

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        types: ["address"],
        componentRestrictions: { country: ["us"] },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();
    console.log("addressObject: ", addressObject);

    const query = addressObject.formatted_address;
    updateQuery(query);

    let street = "";
    let postcode = "";
    let city = "";
    let state = "";

    for (const component of addressObject.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case "street_number": {
          street = `${component.long_name} ${street}`;
          break;
        }
        case "route": {
          street += component.long_name;
          break;
        }
        case "postal_code": {
          postcode = `${component.long_name}${postcode}`;
          break;
        }
        case "postal_code_suffix": {
          postcode = `${postcode}-${component.long_name}`;
          break;
        }
        case "sublocality_level_1":
        case "locality": {
          city = component.long_name;
          break;
        }
        case "administrative_area_level_1": {
          state = component.long_name;
          break;
        }
        default:
          break;
      }
    }

    setStreet(street);
    setCityName(city);
    setStateName(state);
    setPostCode(postcode);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div>
      <form className="space-y-6 " onSubmit={handleSubmit}>
        <div className="md:p-12 lg:p-0">
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
                className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  ${
                  error.nameError !== "" ? "ring-red-500" : "ring-gray-300"
                }`}
                placeholder="Use Location by default for group meetup"
                id="event-name"
                disabled={helpBool}
                ref={nameRef}
                onChange={handleNameChange}
              />
              {error.nameError && (
                <div className="inline-flex items-center">
                  <img alt="" src={errorImg} className="w-3 h-3" />
                  <p className="text-red-600 text-xs mx-1">{error.nameError}</p>
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <p className="font-semibold font-['Inter'] text-[15px]">
                Event Description*
              </p>
              <input
                type="text"
                className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  ${
                  error.descError !== "" ? "ring-red-500" : "ring-gray-300"
                }`}
                placeholder="Details"
                id="event-desc"
                ref={descRef}
                onChange={handleDescChange}
              />
              {error.descError && (
                <div className="inline-flex items-center">
                  <img alt="" src={errorImg} className="w-3 h-3" />
                  <p className="text-red-600 text-xs mx-1">{error.descError}</p>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <p className="font-semibold font-['Inter'] text-[15px]">
                Maximum capacity of participants allowed*
              </p>
              <input
                type="text"
                className="h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 "
                id="max-cap"
                ref={maxCapRef}
                onChange={handleCapChange}
              />
              {/* <p className="font-normal font-['Inter'] text-xs">
                Please provide a numerical value
              </p> */}
              {error.maxCapError && (
                <div className="inline-flex items-center">
                  <img alt="" src={errorImg} className="w-3 h-3" />
                  <p className="text-red-600 text-xs mx-1">
                    {error.maxCapError}
                  </p>
                </div>
              )}
            </div>
            <div className="text-[22px] font-semibold font-bricolage">
              Meet up Details
            </div>
            <div className="space-y-1.5">
              <div className="font-semibold font-['Inter'] text-[15px]">
                Enter Address*
              </div>
              <input
                type="text"
                ref={autoCompleteRef}
                onChange={(event) => setQuery(event.target.value)}
                value={query}
                placeholder="Enter Address"
                className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                  error.idError !== "" ? "ring-red-500" : "ring-gray-300"
                }`}
              />
              {error.idError && (
                <div className="inline-flex items-center">
                  <img alt="" src={errorImg} className="w-3 h-3" />
                  <p className="text-red-600 text-xs mx-1">{error.idError}</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 space-x-4 ">
              <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  Street*
                </p>
                <input
                  className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    error.streetError !== "" ? "ring-red-500" : "ring-gray-300"
                  }`}
                  placeholder="Street"
                  ref={streetRef}
                  id="street-address"
                  name="street-address"
                  value={street}
                  onChange={handleStreetChange}
                />
                {error.streetError && (
                  <div className="inline-flex items-center">
                    <img alt="" src={errorImg} className="w-3 h-3" />
                    <p className="text-red-600 text-xs mx-1">
                      {error.streetError}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  City*
                </p>
                <input
                  type="text"
                  className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    error.cityError !== "" ? "ring-red-500" : "ring-gray-300"
                  }`}
                  placeholder="City"
                  ref={cityRef}
                  onChange={handleCityChange}
                  value={cityName}
                />
                {error.cityError && (
                  <div className="inline-flex items-center">
                    <img alt="" src={errorImg} className="w-3 h-3" />
                    <p className="text-red-600 text-xs mx-1">
                      {error.cityError}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className=" grid grid-cols-2 space-x-4">
              <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  State*
                </p>
                <input
                  type="text"
                  className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    error.stateError !== "" ? "ring-red-500" : "ring-gray-300"
                  }`}
                  placeholder="State"
                  ref={stateRef}
                  onChange={handleStateChange}
                  value={stateName}
                />
                {error.stateError && (
                  <div className="inline-flex items-center">
                    <img alt="" src={errorImg} className="w-3 h-3" />
                    <p className="text-red-600 text-xs mx-1">
                      {error.stateError}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  Zipcode*
                </p>
                <input
                  type="text"
                  className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                    error.zipError !== "" ? "ring-red-500" : "ring-gray-300"
                  }`}
                  placeholder="Zipcode"
                  ref={zipcodeRef}
                  onChange={handleZipChange}
                  value={postcode}
                />
                {error.zipError && (
                  <div className="inline-flex items-center">
                    <img alt="" src={errorImg} className="w-3 h-3" />
                    <p className="text-red-600 text-xs mx-1">
                      {error.zipError}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Old Form Fields Start */}

            {/* <p className="font-semibold font-['Inter'] text-[15px]">
                Street*
              </p>
              <input
                type="text"
                className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                  error.streetError !== "" ? "ring-red-500" : "ring-gray-300"
                }`}
                placeholder="Street"
                id="street"
                disabled={helpBool}
                ref={streetRef}
                onChange={handleStreetChange}
              />
              {error.streetError && (
                <div className="inline-flex items-center">
                  <img alt="" src={errorImg} className="w-3 h-3" />
                  <p className="text-red-600 text-xs">{error.streetError}</p>
                </div>
              )} */}
            {/*<div className="space-y-1.5">
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
                  <img alt="" src={errorImg} className="w-3 h-3" />
                  <p className="text-red-600 text-xs">{error.cityError}</p>
                </div>
              )}
              </div>*/}

            {/* <div className="space-y-1.5">
              <p className="font-semibold font-['Inter'] text-[15px]">State*</p>
              {helpBool && (
                <input
                  className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300`}
                  ref={stateRef}
                  disabled={true}
                ></input>
              )}
              {!helpBool && (
                <select
                  className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                    error.stateError !== "" ? "ring-red-500" : "ring-gray-300"
                  }`}
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
              )}
              {error.stateError && (
                <div className="inline-flex items-center">
                  <img alt="" src={errorImg} className="w-3 h-3" />
                  <p className="text-red-600 text-xs">{error.stateError}</p>
                </div>
              )}
            </div> */}

            {/* <div className="inline-flex grid grid-cols-2 space-x-4"> */}
            {/*<div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  State*
                </p>
                <input
                  type="text"
                  className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                    error.stateError !== "" ? "ring-red-500" : "ring-gray-300"
                  }`}
                  placeholder="New York"
                  id="state"
                  ref={stateRef}
                  onChange={handleStateChange}
                />
                {error.stateError && (
                  <div className="inline-flex items-center">
                    <img alt="" src={errorImg} className="w-3 h-3" />
                    <p className="text-red-600 text-xs">{error.stateError}</p>
                  </div>
                )}
                </div>*/}

            {/* <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  City*
                </p>
                {helpBool && (
                  <input
                    className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300`}
                    ref={cityRef}
                    disabled={true}
                  ></input>
                )}
                {!helpBool && (
                  <select
                    className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                      error.cityError !== "" ? "ring-red-500" : "ring-gray-300"
                    }`}
                    defaultValue=""
                    disabled={!cityNames}
                    ref={cityRef}
                    // onChange={(e) => {
                    //   setCity(e.target.value);
                    // }}
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
                )}
                {error.cityError && (
                  <div className="inline-flex items-center">
                    <img alt="" src={errorImg} className="w-3 h-3" />
                    <p className="text-red-600 text-xs">{error.cityError}</p>
                  </div>
                )}
              </div> */}

            {/* <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  Zipcode*
                </p>
                <input
                  type="text"
                  className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                    error.zipError !== "" ? "ring-red-500" : "ring-gray-300"
                  }`}
                  placeholder="11201"
                  id="zipcode"
                  disabled={helpBool}
                  ref={zipcodeRef}
                  onChange={handleZipChange}
                />
                {error.zipError && (
                  <div className="inline-flex items-center">
                    <img alt="" src={errorImg} className="w-3 h-3" />
                    <p className="text-red-600 text-xs">{error.zipError}</p>
                  </div>
                )}
              </div> */}
            {/* </div> */}

            {/* Old Form Fields End */}

            <div className="grid grid-cols-2 space-x-4">
              <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  Start DateTime*
                </p>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    handleStimeChange(date);
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="Pp"
                  customInput={
                    <CustomInput
                      id="date"
                      className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                        error.stimeError !== ""
                          ? "ring-red-500"
                          : "ring-gray-300"
                      }`}
                      ref={startTimeRef}
                    />
                  }
                />
                {error.stimeError && (
                  <div className="inline-flex items-center">
                    <img alt="" src={errorImg} className="w-3 h-3" />
                    <p className="text-red-600 text-xs mx-1">
                      {error.stimeError}
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <p className="font-semibold font-['Inter'] text-[15px]">
                  End DateTime*
                </p>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    handleEtimeChange(date);
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="Pp"
                  customInput={
                    <CustomInput
                      id="date"
                      className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                        error.etimeError !== ""
                          ? "ring-red-500"
                          : "ring-gray-300"
                      }`}
                      ref={endTimeRef}
                    />
                  }
                />
                {error.etimeError && (
                  <div className="inline-flex items-center">
                    <img alt="" src={errorImg} className="w-3 h-3" />
                    <p className="text-red-600 text-xs mx-1">
                      {error.etimeError}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div className="space-y-6 md:px-12 lg:px-0">
          <div className="font-semibold font-bricolage text-[22px]">
            What kind of help they need?
          </div>
          <div className="space-y-1.5 relative">
            {/* <p className="font-semibold font-['Inter'] text-[15px]">
              Is this Event related to any Help Request?
            </p>
            <select
              className="h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring focus:ring-indigo-400 appearance-none"
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
              <img alt="" src={arrowDown} />
            </div> */}
            <p className="font-semibold font-['Inter'] text-[15px]">
              Help Type Required*
            </p>
            <input
              type="text"
              className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  ${
                error.helpError !== "" ? "ring-red-500" : "ring-gray-300"
              }`}
              placeholder="Eg. Children Specialist Needed"
              id="help-type"
              ref={helpRef}
              onChange={handleHelpChange}
            />
            {error.helpError && (
              <div className="inline-flex items-center">
                <img alt="" src={errorImg} className="w-3 h-3" />
                <p className="text-red-600 text-xs mx-1">{error.helpError}</p>
              </div>
            )}
          </div>
          <div className="font-semibold font-bricolage text-[15px]">
            Select skills it would require to provide the help
          </div>
          <div className=" space-y-2">
            {chipList.map((value, index) => (
              <Chip
                keyName={"chip-" + index}
                val={value}
                setter={handleHelpTypeArray}
                clear={clear}
                autofillBool={helpDetails.skills?.includes(value)}
              />
            ))}
          </div>
        </div>
        <div className="space-y-16 space-x-[15px] md:px-12 md:pb-12 lg:px-0 lg:pb-0">
          <Link to="/profile">
            <button
              type="button"
              className="px-8 py-4 border border-[#5F35D5] rounded-full text-violet-700"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="px-8 py-4 border rounded-full bg-violet-700 text-[#F8F9F0]"
          >
            Publish
          </button>

          {success && <CreateOutreachModal isOpen={true} />}
        </div>
      </form>
    </div>
  );
};

export default Form;
