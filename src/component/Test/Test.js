import React, { useRef, useState } from "react";
import Landing from "../HomePage/Landing";
import { checkString } from "../helper/validator";
import { addDoc, collection } from "firebase/firestore";
import errorImg from "../../images/error.png";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

import collectionMapping from "../../utils/firestoreCollections";

const testUser_collection = collectionMapping.testUser;

function TestUser() {
  const [success, setSuccess] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const contactRef = useRef(null);
  const [clear, setClear] = useState(false);
  const [error, setError] = useState({
    nameError: "",
    emailError:"",
    contactError:""
  });

  const fAuth = getAuth();

  const updateErrorState = (key, value) => {
    setError((prevState) => ({
      ...prevState, // Clone the current state
      [key]: value, // Update the specific key with the new value
    }));
  };

  const clearFields = () => {
    nameRef.current.value = "";
    emailRef.current.value="";
    contactRef.current.value="";
    setClear(true);
  };

  const handleNameChange = (e) => {
    updateErrorState("NameError", "");
  };

  const handleEmailChange = (e) => {
    updateErrorState("emailError", "");
  };

  const handleContactChange = (e) => {
    updateErrorState("contactError", "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = true;

    console.log("submit called");

    if (!nameRef.current.value) {
      updateErrorState("nameError", "User Name is required");
      success = false;
    } else {
      try {
        checkString(nameRef.current.value, "Name");
        updateErrorState("nameError", "");
      } catch (e) {
        updateErrorState("nameError", "User Name should consist only characters");
      }
    }

    if (!emailRef.current.value) {
      updateErrorState("emailError", "Email is required");
      success = false;
    } else {
      updateErrorState("emailError", "");
    }

    if (!contactRef.current.value) {
      updateErrorState("contactError", "contact is required");
      success = false;
    } else {
      updateErrorState("contactError", "");
    }

    if (success) {
      const emailHTML = `<div style="border-radius: 30px;background: #F1EEFE; padding: 20px 50px"><h1>Thank you for reaching out!!</h1><p>Someone from our team will reach out to you shortly.</p></div>`;

      let obj = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        contact: contactRef.current.value,
        createdAt: Date()
      };

      try {
        const reqRef = collection(db, testUser_collection);
        console.log(obj);
        const docRef = await addDoc(reqRef, obj);
        if (docRef.id) {
          console.log(docRef.id);
          setSuccess(true);
          alert("User added successfully");
          clearFields();
        }
      } catch (e) {
        console.log(e);
      }
    }

  };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className="sm:w-[768px] m-3 lg:mx-40 mt-32 mb-8 rounded-2xl bg-white text-black ">
          {" "}
          <div className="p-4 md:py-[100px] md:px-[128px] ">
            <div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <p className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">
                    Name*
                    </p>
                    <input
                      type="text"
                      className={`w-full h-12 px-4 py-1 rounded border ${
                        error.contactError !== ""
                          ? "border-red-500"
                          : "border-stone-300"
                      }`}
                      placeholder="Enter your name"
                      ref={nameRef}
                      onChange={handleNameChange}
                    />
                    {error.nameError && (
                      <div className="inline-flex items-center">
                        <img src={errorImg} className="w-3 h-3" />
                        <p className="text-red-600 text-xs">
                          {error.nameError}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">
                    Email Address*
                  </p>
                  <input
                    type="email"
                    className={`w-full h-12 px-4 py-1 rounded border ${
                      error.emailError !== ""
                        ? "border-red-500"
                        : "border-stone-300"
                    }`}
                    placeholder="name@email.com"
                    ref={emailRef}
                    onChange={handleEmailChange}
                  />
                  {error.emailError && (
                    <div className="inline-flex items-center">
                      <img src={errorImg} className="w-3 h-3" />
                      <p className="text-red-600 text-xs">
                        {error.emailError}
                      </p>
                    </div>
                  )}
                </div>
                <div className="space-y-1.5">
                  <p className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">
                    Contact*
                  </p>
                  <input
                      type="text"
                      className={`w-full h-12 px-4 py-1 rounded border ${
                        error.contactError !== ""
                          ? "border-red-500"
                          : "border-stone-300"
                      }`}
                      placeholder="Enter your contact"
                      ref={contactRef}
                      onChange={handleContactChange}
                    />
                  {error.contactError && (
                    <div className="inline-flex items-center">
                      <img src={errorImg} className="w-3 h-3" />
                      <p className="text-red-600 text-xs">
                        {error.contactError}
                      </p>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 border rounded-full bg-violet-700 text-[#F8F9F0]"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestUser;