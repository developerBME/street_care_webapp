import React from "react";
import { useState, useRef, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CustomButton from "../Buttons/CustomButton";
import errorImg from "../../images/error.png";
import ConfirmationModal from "./ConfirmationModal";
import { emailConfirmation } from "../EmailService";
import { checkNumber } from "../helper/validator";
import { fetchPersonalVisitLogById } from "../VisitLogCardService";
import UpdateVisitLogConfirmationModal from "./UpdateVisitLogConfirmationModal";
import DatePicker from "react-datepicker";
import { Timestamp } from "firebase/firestore";
import InfoIcon from "@mui/icons-material/Info";
// import { IconButton } from "@mui/material";
import { Tooltip, IconButton } from "@mui/material";
import { fetchUserTypeDetails } from "../EventCardService";

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

let autoComplete;

export const GOOGLE_PLACES_API_KEY = "AIzaSyBpaLVj2EjhjCeHbTUXfcBhBoaQLVathvE";

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function PersonalOutForm() {
  const navigate = useNavigate();
  // const ratingChanged = (newRating) => {
  //   console.log(newRating);
  // };
  const dateTimeRef = useRef(null);
  const date = useRef("");
  const time = useRef("");
  const cityRef = useRef("");
  const stateRef = useRef("");
  const streetRef = useRef("");
  const zipcodeRef = useRef("");
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
  const [isPublic, setIsPublic] = useState(true);
  const infoShareCheckbox = useRef(null);
  const [showOptionalQuestions, setShowOptionalQuestions] = useState(false);
  const optDesc = useRef("");
  const optLandmark = useRef("");
  const today = new Date();
  //////STATES FOR OPTIONAL PART OF THE FORM
  // const furtherHelpDescription = useRef("");
  // const furtherHelpLocation = useRef("");
  // const [otherInfo, setOtherInfo] = useState("");
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
    dateTimeError: "",
    optDescError: "",
    optLandmarkError: "",
    infoShareCheckboxError: "",
    idError: "",
    streetError: "",
    zipError: "",
  });

  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");

  const { id } = useParams();
  const [logData, setLogData] = useState(null);

  const handleOtherCheck = () => {
    setIsOtherChecked(!isOtherChecked);
  };

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

  const handleDateTimeChange = (date) => {
    updateErrorState("dateTimeError", "");
    console.log("Selected date:", date);
  };

  const handleCityChange = (e) => {
    setCityName(e.target.value);
    updateErrorState("cityError", "");
  };
  const handleStateChange = (e) => {
    updateErrorState("stateError", "");
  };
  const handleZipChange = (e) => {
    setPostcode(e.target.value);
    updateErrorState("zipError", "");
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
  /* Firebase */
  const fAuth = getAuth();
  onAuthStateChanged(fAuth, (user) => {
    if (user) {
      console.log("Found user");
    } else {
      console.log("USER NOT FOUND!");
      // navigate("/login");
    }
  });

  // useEffect(()=>{},[])
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

    const getData = async () => {
      try {
        const logResult = await fetchPersonalVisitLogById(id);
        setLogData(logResult);
        setNumberhelped(logResult.numberPeopleHelped);
        setDescriptionHelped(logResult.description);
        logResult.whatGiven.map((a) => {
          if (itemArray.indexOf(a) === -1) {
            itemArray.push(a);
          }
        });

        const checkboxvalues = [];
        checkboxes.current.map((x) => {
          checkboxvalues.push(x.value);
        });

        const hasOtherValues = logResult.whatGiven.filter(
          (a) => !checkboxvalues.includes(a)
        );
        if (hasOtherValues.length > 0) {
          setIsOtherChecked(hasOtherValues.length > 0);
          setOtherInputValue(hasOtherValues[0]);
        }

        checkboxes.current.map((x) => {
          const res = logResult.whatGiven.filter((a) => a === x.value);
          if (res.length !== 0) {
            x.checked = true;
            setItemArray(itemArray, x.value);
          }
          if (x.value === "Other" && hasOtherValues.length > 0) {
            x.checked = true;
          }
        });

        setItemQty(logResult.itemQty);
        setRating(logResult.rating);
        setStreet(logResult.street);
        setCityName(logResult.city);
        setStateName(logResult.state);
        setPostcode(logResult.zipcode);
        //date.current.value = logResult.date ;
        //time.current.value = logResult.time ;
        setDateTime(logResult.dateTime.toDate());
      } catch (error) {
        console.error(error.message);
      }
    };

    getStates();
    if (id !== undefined) {
      getData();
    }
  }, []);

  async function getCities(e) {
    const stateCode = stateList.filter((x) => x.name === e.target.value)[0]
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
    let setOtherBool = true;
    let whatGivenArr = [...itemArray];
    e.preventDefault();
    // Form Validation Start
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
    if (!numberHelped) {
      updateErrorState("numberHelpedError", "Number is required");
      setReturn = true;
    } else {
      updateErrorState("numberHelpedError", "");
    }
    // console.log("object");
    // console.log(whatGivenArr);
    if (whatGivenArr == [] || !setOtherBool) {
      updateErrorState(
        "checkboxesError",
        "Please provide the kind of help provided"
      );
      setReturn = true;
    } else {
      updateErrorState("checkboxesError", "");
    }

    if (!stateRef.current.value) {
      updateErrorState("stateError", "State is required");
      setReturn = true;
    } else {
      updateErrorState("stateError", "");
    }

    if (!cityRef.current.value) {
      updateErrorState("cityError", "City is required");
      setReturn = true;
    } else {
      updateErrorState("cityError", "");
    }

    if (!streetRef.current.value) {
      updateErrorState("streetError", "Street is required");
      setReturn = true;
    } else {
      updateErrorState("streetError", "");
    }

    if (!zipcodeRef.current.value) {
      updateErrorState("zipError", "Zipcode is required");
      setReturn = true;
    } else {
      try {
        checkNumber(zipcodeRef.current.value, "Event Name");
        updateErrorState("zipError", "");
      } catch (e) {
        updateErrorState("zipError", "Should consist of only Numbers");
      }
    }

    if (!dateTime) {
      updateErrorState("dateTimeError", "DateTime is required");
      console.log();
      setReturn = true;
    } else {
      updateErrorState("dateTimeError", "");
    }

    // if (!date.current.value) {
    //   updateErrorState("dateError", "Enter a date");
    //   setReturn = true;
    // } else {
    //   updateErrorState("dateError", "");
    // }

    // if (!time.current.value) {
    //   updateErrorState("timeError", "Enter a time");
    //   setReturn = true;
    // } else {
    //   updateErrorState("timeError", "");
    // }

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

    const userDetails = await fetchUserTypeDetails(fAuth.currentUser.uid);
    let statusValue = "pending";
    if (
      userDetails.type == "Chapter Leader" ||
      userDetails.type == "Streetcare Hub Leader"
    ) {
      statusValue = "approved";
    }

    let obj = {
      uid: fAuth.currentUser.uid,
      description: descriptionHelped,
      numberPeopleHelped: numberHelped,
      whatGiven: whatGivenArr,
      itemQty: itemQty,
      //date: date.current.value,
      //time: time.current.value,
      state: stateName,
      stateAbbv: stateAbbv,
      city: cityName,
      rating: rating,
      zipcode: postcode,
      street: street,
      dateTime: Timestamp.fromDate(dateTime),
      public: isPublic,
      status: statusValue,
    };
    console.log(obj);

    const emailHTML = `<div style="border-radius: 30px;background: #F1EEFE; padding: 20px 50px">
      <h1>Thank you for creating the outreach</h1>
      <p>Your Personal Outreach Form has been successfully created and you can view it in your profile.</p>
      <p>Here are some of the details:</p>
      <ul>
        <li>Number of People Helped: ${numberHelped}</li>
        <li>Location: ${state}, ${city}</li>
        <li>Item Quantity: ${itemQty}</li>
        <li>Date: ${date.current.value}</li>
      </ul>
    </div>`;

    try {
      console.log("Sending email...");
      const logRef = collection(db, "personalVisitLog");
      const docRef = await addDoc(logRef, obj);
      if (docRef.id) {
        console.log(docRef.id);

        const userQuery = query(
          collection(db, USERS_COLLECTION),
          where("uid", "==", fAuth?.currentUser?.uid)
        );
        const userDocRef = await getDocs(userQuery);
        console.log(userDocRef);
        const userDocID = userDocRef.docs[0].id;
        // reference for the userdoc
        const userRef = doc(db, USERS_COLLECTION, userDocID);
        // outreach event collection
        const docSnap = await getDoc(userRef);
        let personalVisitLogs = docSnap.data().personalVisitLogs || [];
        personalVisitLogs.push(docRef.id);
        const updateRef = await updateDoc(userRef, {
          personalVisitLogs: personalVisitLogs,
        });

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
    // date.current.value = "";
    setNumberhelped("");
    setItemQty("");
    setItemArray([]);
    checkboxes.current.forEach((x) => {
      x.checked = false;
    });
    // time.current.value = "";
    setRating(0);
    setState("");
    setCity("");
    cityRef.current.value = "";
    stateRef.current.value = "";
    zipcodeRef.current.value = "";
    streetRef.current.value = "";
    setDateTime(null);
  };

  //Address autocomplete functionality
  const [AddQuery, setAddQuery] = useState();
  const autoCompleteRef = useRef(null);
  const [street, setStreet] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [stateAbbv, setStateAbbv] = useState("");
  const [postcode, setPostcode] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

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
    const AddQuery = addressObject.formatted_address;
    updateQuery(AddQuery);

    let street = "";
    let postcode = "";
    let city = "";
    let state = "";
    let state_abbv = "";

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
          state_abbv = component.short_name;
          break;
        }
        default:
          break;
      }
    }
    setStreet(street);
    setCityName(city);
    setStateName(state);
    setStateAbbv(state_abbv);
    setPostcode(postcode);
  };

  const handleUpdateVisitLog = async (e) => {
    let setReturn = false;
    let setOtherBool = true;
    let whatGivenArr = [...itemArray];

    e.preventDefault();
    const checkboxvalues = [];
    checkboxes.current.map((x) => {
      checkboxvalues.push(x.value);
    });

    const hasOtherValues = whatGivenArr.filter(
      (a) => !checkboxvalues.includes(a)
    );
    if (hasOtherValues.length > 0) {
      whatGivenArr = whatGivenArr.filter((a) => a !== hasOtherValues[0]);
    }

    // Form Validation Start
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

    if (!stateRef.current.value) {
      updateErrorState("stateError", "State is required");
      setReturn = true;
    } else {
      updateErrorState("stateError", "");
    }

    if (!cityRef.current.value) {
      updateErrorState("cityError", "City is required");
      setReturn = true;
    } else {
      updateErrorState("cityError", "");
    }

    if (!streetRef.current.value) {
      updateErrorState("streetError", "Street is required");
      setReturn = true;
    } else {
      updateErrorState("streetError", "");
    }

    if (!zipcodeRef.current.value) {
      updateErrorState("zipError", "Zipcode is required");
      setReturn = true;
    } else {
      try {
        checkNumber(zipcodeRef.current.value, "Event Name");
        updateErrorState("zipError", "");
      } catch (e) {
        updateErrorState("zipError", "Should consist of only Numbers");
      }
    }

    // if (!date.current.value) {
    //   updateErrorState("dateError", "Enter a date");
    //   setReturn = true;
    // } else {
    //   updateErrorState("dateError", "");
    // }

    // if (!time.current.value) {
    //   updateErrorState("timeError", "Enter a time");
    //   setReturn = true;
    // } else {
    //   updateErrorState("timeError", "");
    // }

    if (!dateTime) {
      updateErrorState("dateTimeError", "DateTime is required");
      console.log();
      setReturn = true;
    } else {
      updateErrorState("dateTimeError", "");
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
      description: descriptionHelped,
      numberPeopleHelped: numberHelped,
      whatGiven: whatGivenArr,
      itemQty: itemQty,
      //date: date.current.value,
      //time: time.current.value,
      state: stateName,
      city: cityName,
      rating: rating,
      zipcode: postcode,
      street: street,
      dateTime: Timestamp.fromDate(dateTime),
    };

    try {
      const logRef = doc(db, "personalVisitLog", id);
      await updateDoc(logRef, obj);
      setSuccess(true);
      clearFields();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`,
      () => handleScriptLoad(setAddQuery, autoCompleteRef)
    );
  }, []);

  const toolTipContent = (
    <div>
      Mention here the total quantity of items like 5, 12, 20..
      <ul className="list-disc list-inside">
        <li>
          Item: A single, standalone object. Count those individually (e.g., a
          book, a shirt, a toy, a food can).{" "}
        </li>
        <li>
          Collection: Multiple similar items grouped together that cannot be
          counted. Count them as 1 item (e.g. 1 bag of toys, 1 bag of Legos, 1
          box of pins).{" "}
        </li>
        <li>
          Bulk Materials: For materials like fabric, yarn, or crafting supplies,
          note the number of pieces (e.g., 1 piece of 5 yards of fabric, 1 roll
          of wool).{" "}
        </li>
      </ul>
    </div>
  );

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
              <div className="flex-col justify-start items-start gap-4 md:gap-16 flex px-4 py-4 md:px-0 md:py-0">
                <div className="w-fit text-neutral-800 md:text-[57px] font-medium font-bricolage md:leading-[64px] text-[32px] leading-[40px]">
                  Tell us more about who you helped!
                </div>
                <div className="self-stretch h-fit flex-col justify-center items-start gap-[24px] flex">
                  <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                    <div className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7">
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
                              <img alt="" src={errorImg} className="w-3 h-3" />
                              <p className="text-red-600 text-xs ml-1">
                                {error.numberHelpedError}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* {error.numberHelpedError && (
                      <div className="inline-flex items-center">
                        <img alt="" src={errorImg} className="w-3 h-3" />
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
                    <div className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7">
                      What kind of help did you provide?
                    </div>

                    <div className="self-stretch w-full h-fit grid md:grid-cols-4 grid-cols-2 gap-2 ">
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
                          value="Medical Help"
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
                        <img alt="" src={errorImg} className="w-3 h-3" />
                        <p className="text-red-600 text-xs ml-1">
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
                    </div>
                  )}

                  {/*  */}
                  <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                    <div className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7">
                      Where did you see a person in need?*
                    </div>
                    {/*  */}

                    <div className="self-stretch w-full h-fit flex-col  flex gap-4">
                      <div className="space-y-1.5">
                        <div className="font-semibold font-['Inter'] text-[15px]">
                          Enter Address*
                        </div>
                        <input
                          type="text"
                          ref={autoCompleteRef}
                          onChange={(event) => setAddQuery(event.target.value)}
                          value={AddQuery}
                          placeholder="Enter Address"
                          className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                            error.idError !== ""
                              ? "ring-red-500"
                              : "ring-gray-300"
                          }`}
                        />
                        {error.idError && (
                          <div className="inline-flex items-center">
                            <img alt="" src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs">
                              {error.idError}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 md:space-x-4 space-y-3 md:space-y-0">
                        <div className="space-y-1.5">
                          <p className="font-semibold font-['Inter'] text-[15px]">
                            Street*
                          </p>
                          <input
                            className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                              error.streetError !== ""
                                ? "ring-red-500"
                                : "ring-gray-300"
                            }`}
                            placeholder="Street"
                            ref={streetRef}
                            id="street-address"
                            name="street-address"
                            value={street}
                          />
                          {error.streetError && (
                            <div className="inline-flex items-center">
                              <img alt="" src={errorImg} className="w-3 h-3" />
                              <p className="text-red-600 text-xs">
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
                              error.cityError !== ""
                                ? "ring-red-500"
                                : "ring-gray-300"
                            }`}
                            placeholder="City"
                            ref={cityRef}
                            onChange={handleCityChange}
                            value={cityName}
                          />
                          {error.cityError && (
                            <div className="inline-flex items-center">
                              <img alt="" src={errorImg} className="w-3 h-3" />
                              <p className="text-red-600 text-xs">
                                {error.cityError}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 md:space-x-4 space-y-3 md:space-y-0">
                        <div className="space-y-1.5">
                          <p className="font-semibold font-['Inter'] text-[15px]">
                            State*
                          </p>
                          <input
                            type="text"
                            className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${
                              error.stateError !== ""
                                ? "ring-red-500"
                                : "ring-gray-300"
                            }`}
                            placeholder="State"
                            ref={stateRef}
                            onChange={handleStateChange}
                            value={stateName}
                          />
                          {error.stateError && (
                            <div className="inline-flex items-center">
                              <img alt="" src={errorImg} className="w-3 h-3" />
                              <p className="text-red-600 text-xs">
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
                              error.zipError !== ""
                                ? "ring-red-500"
                                : "ring-gray-300"
                            }`}
                            placeholder="Zipcode"
                            ref={zipcodeRef}
                            onChange={handleZipChange}
                            value={postcode}
                          />
                          {error.zipError && (
                            <div className="inline-flex items-center">
                              <img alt="" src={errorImg} className="w-3 h-3" />
                              <p className="text-red-600 text-xs">
                                {error.zipError}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Old form fields start */}

                      {/* <div className=" absolute w-fit bg-white ml-3 mt-[-5px]  px-1 justify-start items-center inline-flex">
                        <div className="text-zinc-700 text-xs font-normal font-roboto leading-none">
                          State
                        </div>
                      </div> */}
                      {/* <div className="self-stretch h-fit border-collapse">
                        <div className="h-14 inline-flex w-full">
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
                            <img alt="" src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs ml-1">
                              {error.stateError}
                            </p>
                          </div>
                        )}
                      </div> */}
                    </div>
                    {/* <div className="self-stretch w-full h-fit flex-col  flex ">
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
                            <img alt=""
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
                    </div> */}
                  </div>

                  {/* Old form fields end */}

                  <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                    {/* Grid 2 */}

                    <div className="w-full h-full grid md:grid-cols-2 gap-4 ">
                      <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
                        <div className="space-y-1.5">
                          <div className="font-semibold font-['Inter'] text-[15px]">
                            Date *
                          </div>
                        </div>
                        <div className="self-stretch h-fit  border-collapse     ">
                          <div className=" h-14  justify-center items-start ">
                            {/* <input
                              type="date"
                              id="-itemnumber"
                              placeholder="Number"
                              className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-base  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ring-gray-300`}
                              ref={date}
                              onChange={handleDateChange}
                            ></input> */}

                            <DatePicker
                              selected={dateTime}
                              onChange={(date) => {
                                setDateTime(date);
                                handleDateTimeChange(date);
                              }}
                              showTimeSelect={false} // Remove time selection
                              dateFormat="dd/MM/yyyy" // Adjust format as needed
                              maxDate={today} // Prevent selecting dates after today
                              wrapperClassName="w-full"
                              customInput={
                                <CustomInput
                                  id="date"
                                  className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                                    error.dateTimeError !== ""
                                      ? "ring-red-500"
                                      : "ring-gray-300"
                                  }`}
                                  ref={dateTimeRef}
                                />
                              }
                            />

                            {error.dateTimeError && (
                              <div className="inline-flex items-center">
                                <img
                                  alt=""
                                  src={errorImg}
                                  className="w-3 h-3"
                                />
                                <p className="text-red-600 text-xs mx-1">
                                  {error.dateTimeError}
                                </p>
                              </div>
                            )}

                            {/* {error.dateError && (
                            <div className="inline-flex items-center">
                              <img alt=""
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
                      {/* <div className="self-stretch w-full h-fit flex-col justify-start items-start flex ">
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
                              <img alt="" src={errorImg} className="w-3 h-3" />
                              <p className="text-red-600 text-xs ml-1">
                                {error.timeError}
                              </p>
                            </div>
                          )}
                          </div>
                        </div>
                      </div> */}
                    </div>
                    {/**/}
                    <div className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7">
                      Total number of items donated by you?*
                      <Tooltip title={toolTipContent} placement="right" arrow>
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
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
                              <img alt="" src={errorImg} className="w-3 h-3" />
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
                  <div className="self-stretch text-center text-black text-[16px] md:text-[22px] font-bold font-bricolage leading-7">
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
                        className="text-[#6840E0]"
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
                        <div className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7">
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
                                  <img
                                    alt=""
                                    src={errorImg}
                                    className="w-3 h-3"
                                  />
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
                            <img alt="" src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs ml-1">
                              {error.furtherHelpDescriptionError}
                            </p>
                          </div>
                        )} */}
                      </div>
                      <div className="self-stretch h-fit flex-col justify-center items-start gap-[18px] flex">
                        <div className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7">
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
                                  <img
                                    alt=""
                                    src={errorImg}
                                    className="w-3 h-3"
                                  />
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
                        <div className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7">
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
                        <div className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7">
                          What further help is needed?
                        </div>

                        <div className="self-stretch w-full h-fit grid md:grid-cols-4 grid-cols-2 gap-2 ">
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
                          <img alt="" src={errorImg} className="w-3 h-3" />
                          <p className="text-red-600 text-xs ml-1">
                            {error.checkboxesError}
                          </p>
                        </div>
                      )} */}
                      </div>

                      <div className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7">
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
                            {/* <input
                              id="furtherHelpFollowUp"
                              placeholder="2023-01-01"
                              className={`text-zinc-900 w-full h-full pl-4 rounded-[4px] text-[15px]  font-normal font-roboto leading-normal tracking-wide ring-1 ring-inset ring-gray-300`}
                              required=""
                            ></input> */}
                            <DatePicker
                              selected={dateTime}
                              onChange={(date) => {
                                setDateTime(date);
                                handleDateTimeChange(date);
                              }}
                              showTimeSelect
                              timeFormat="HH:mm" // Adjust time format as needed
                              dateFormat="dd/MM/yyyy HH:mm" // Adjust date format to include time
                              minDate={
                                new Date(
                                  new Date().getTime() + 24 * 60 * 60 * 1000
                                )
                              }
                              wrapperClassName="w-full"
                              customInput={
                                <CustomInput
                                  id="date"
                                  className={`h-12 px-4 w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ${
                                    error.dateTimeError !== ""
                                      ? "ring-red-500"
                                      : "ring-gray-300"
                                  }`}
                                  ref={dateTimeRef}
                                />
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7">
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

                      <div className="self-stretch h-fit flex-col justify-center  items-center md:items-start gap-[18px] flex">
                        <div className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7">
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
                            <img alt="" src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs ml-1">
                              {error.infoShareCheckboxError}
                            </p>
                          </div>
                        )}
                      </div>
                      {/*  */}

                      <div>
                        <div className="self-stretch text-neutral-800 text-[16px] md:text-[22px] font-bold font-bricolage leading-7">
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
                {/* Toggle public form */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={isPublic}
                    onClick={() => setIsPublic((prev) => !prev)}
                    className="w-[18px] h-[18px] bg-violet-700 rounded-sm cursor-pointer"
                  />
                  <span className="self-stretch font-bricolage text-[18px] ml-2">
                    Make this visit log public?
                  </span>
                </div>
                {/* Toggle public form end */}
                <div className="justify-start items-start gap-4 inline-flex">
                  <div className="justify-start items-start gap-4 flex">
                    {id === undefined ? (
                      <CustomButton
                        label="Done"
                        name="buttondefault"
                        onClick={handleSubmit}
                      />
                    ) : (
                      <div>
                        <CustomButton
                          label="Update"
                          name="buttondefault"
                          onClick={handleUpdateVisitLog}
                        />{" "}
                        &nbsp;&nbsp;
                        <CustomButton
                          label="Cancel"
                          name="buttondefault"
                          onClick={() => {
                            navigate(-1);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/*  */}
                {success && id === undefined && (
                  // <div className="justify-start items-start gap-4 inline-flex">
                  //   <div className="justify-start items-start gap-4 flex">
                  //     Success!
                  //   </div>
                  // </div>
                  <ConfirmationModal isOpen={true} />
                )}
                {success && id !== undefined && (
                  <UpdateVisitLogConfirmationModal isOpen={true} />
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
