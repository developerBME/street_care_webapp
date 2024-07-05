import React, { useRef, useState } from "react";
import Landing from "../HomePage/Landing";
import { checkString } from "../helper/validator";
import { addDoc, collection } from "firebase/firestore";
import errorImg from "../../images/error.png";
import { emailConfirmation } from "../EmailService";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";

function Contact() {
  const [success, setSuccess] = useState(false);
  const firstNameRef = useRef(null);
  const lastfirstNameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const [clear, setClear] = useState(false);
  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError:"",
    messageError:""
  });

  const fAuth = getAuth();

  const updateErrorState = (key, value) => {
    setError((prevState) => ({
      ...prevState, // Clone the current state
      [key]: value, // Update the specific key with the new value
    }));
  };

  const clearFields = () => {
    firstNameRef.current.value = "";
    lastfirstNameRef.current.value = "";
    emailRef.current.value="";
    messageRef.current.value="";
    setClear(true);
  };

  const handleFirstNameChange = (e) => {
    updateErrorState("firstNameError", "");
  };

  const handleLastNameChange = (e) => {
    updateErrorState("lastNameError", "");
  };

  const handleEmailChange = (e) => {
    updateErrorState("emailError", "");
  };

  const handleMessageChange = (e) => {
    updateErrorState("messageError", "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = true;

    if (!firstNameRef.current.value) {
      updateErrorState("firstNameError", "First Name is required");
      success = false;
    } else {
      try {
        checkString(firstNameRef.current.value, "First Name");
        updateErrorState("firstNameError", "");
      } catch (e) {
        updateErrorState("firstNameError", "First Name should consist only characters");
      }
    }

    if (!lastfirstNameRef.current.value) {
      updateErrorState("lastNameError", "Last Name is required");
      success = false;
    } else {
      try {
        checkString(lastfirstNameRef.current.value, "Last Name");
        updateErrorState("lastNameError", "");
      } catch (e) {
        updateErrorState("lastNameError", "Last Name should consist only characters");
      }
    }

    if (!emailRef.current.value) {
      updateErrorState("emailError", "Email is required");
      success = false;
    } else {
      updateErrorState("emailError", "");
    }

    if (!messageRef.current.value) {
      updateErrorState("messageError", "Message is required");
      success = false;
    } else {
      updateErrorState("messageError", "");
    }

    if (success) {
      const emailHTML = `<div style="border-radius: 30px;background: #F1EEFE; padding: 20px 50px"><h1>Thank you for reaching out!!</h1><p>Someone from our team will reach out to you shortly.</p></div>`;

      let obj = {
        firstName: firstNameRef.current.value,
        lastName: lastfirstNameRef.current.value,
        email: emailRef.current.value,
        message: messageRef.current.value,
        createdAt: Date()
      };

      try {
        const reqRef = collection(db, "contacts");
        console.log(obj);
        const docRef = await addDoc(reqRef, obj);
        if (docRef.id) {
          console.log(docRef.id);
          setSuccess(true);
          emailConfirmation(obj.email, obj.firstName + " " + obj.lastName, "Contact Us Feedback", emailHTML);
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
              <div className="text-neutral-900 text-3xl md:text-[45px] mb-[32px] font-medium font-dmsans leading-[52px]">
                Have Something for us?
              </div>
              <div className="text-neutral-900 text-base mb-[24px] font-normal font-dmsans leading-normal tracking-wide">
                We are constantly looking for ways to help our cause and
                support. If you have any concerns, queries or feedback for us,
                you can :{" "}
              </div>
              <div className="sm:flex sm:justify-between space-y-4 md:space-y-0 mb-[24px]">
                <div className="space-y-1.5">
                  <div className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">
                    Email us:
                  </div>
                  <div>streetcare@brightmindenrichment.org</div>
                </div>
                <div className="space-y-1.5">
                  <div className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">
                    Call us
                  </div>
                  <div>(702) 907-7390</div>
                </div>
              </div>
            </div>
            <div className="flex items-center mb-[24px]">
              <div className="flex-1 border-t border-neutral-200"></div>
              <div className="mx-4 text-neutral-900 text-sm font-normal font-dmsans leading-snug">
                or
              </div>
              <div className="flex-1 border-t border-neutral-200"></div>
            </div>
            <div>
              <div className="text-neutral-900 text-base font-normal font-dmsans leading-normal tracking-wide mb-6">
                You can share your thoughts by filling this form below.
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <p className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">
                      First Name*
                    </p>
                    <input
                      type="text"
                      className={`w-full h-12 px-4 py-1 rounded border ${
                        error.firstNameError !== ""
                          ? "border-red-500"
                          : "border-stone-300"
                      }`}
                      placeholder="Enter your first name"
                      ref={firstNameRef}
                      onChange={handleFirstNameChange}
                    />
                    {error.firstNameError && (
                      <div className="inline-flex items-center">
                        <img src={errorImg} className="w-3 h-3" />
                        <p className="text-red-600 text-xs">
                          {error.firstNameError}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">
                      Last Name
                    </p>
                    <input
                      type="text"
                      className={`w-full h-12 px-4 py-1 rounded border ${
                        error.lastNameError !== ""
                          ? "border-red-500"
                          : "border-stone-300"
                      } justify-start items-center gap-2 inline-flex`}
                      placeholder="Enter your last name"
                      ref={lastfirstNameRef}
                      onChange={handleLastNameChange}
                    />
                    {error.lastNameError && (
                      <div className="inline-flex items-center">
                        <img src={errorImg} className="w-3 h-3" />
                        <p className="text-red-600 text-xs">
                          {error.lastNameError}
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
                    Message*
                  </p>
                  <textarea
                    type="text"
                    className={`w-full p-4 rounded border font-dmsans border-stone-300 justify-start items-center gap-2 inline-flex ${
                      error.emailError !== ""
                        ? "border-red-500"
                        : "border-stone-300"
                    }`}
                    placeholder="What would you like to share with us?"
                    ref={messageRef}
                    onChange={handleMessageChange}
                  ></textarea>
                  {error.messageError && (
                    <div className="inline-flex items-center">
                      <img src={errorImg} className="w-3 h-3" />
                      <p className="text-red-600 text-xs">
                        {error.messageError}
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

export default Contact;
