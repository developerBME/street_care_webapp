import React, { useState, useEffect, useRef } from "react";
import CustomButton from "../Buttons/CustomButton";
import errorImg from "../../images/error.png";
import {getAuth, onAuthStateChanged} from "firebase/auth";

function AccSetting() {
  const [newUsername, setNewUsername] = useState('');
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [error, setError] = useState("");
  const username = useRef("");
  const imgRef = useRef("");
  const user = getAuth();

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProfileImage(file);
    setError("");
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Form Validation Start
    if (!username.current.value && !imgRef.current.value) {
        setError("Please provide username or user image to update!");
      } else {
        setError("");
      }
  };

  const clearFields = (e) => {
    e.preventDefault();
    username.current.value = "";
    setNewUsername('');
    imgRef.current.value = "";
    setNewProfileImage(null)
  }

    return (
        <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
          <div className="relative flex flex-col items-center ">
            {/*  */}
            <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mt-24  lg:mx-40 lg:mt-32 rounded-2xl bg-white text-black ">
                <div className="xl:px-24 xl:py-12">
                    <p className="text-[#212121] pl-4 pt-4 text-3xl md:pl-8 md:pt-0 xl:pl-0 xl:pt-0 sm:text-4xl font-medium font-dmsans leading-9 mb-4">Update Your Profile</p>
                    <form>
                        <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-600 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={newUsername}
                            ref={username}
                            onChange={handleUsernameChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-400"
                        />
                        </div>
                        <div className="mb-4">
                        <label htmlFor="profileImage" className="block text-gray-600 mb-2">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            ref={imgRef}
                            onChange={handleImageChange}
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-400"
                        />
                        {newProfileImage && (
                            <img
                            src={URL.createObjectURL(newProfileImage)}
                            alt="Selected Image"
                            className="mt-2 max-w-full h-auto"
                            />
                        )}
                        </div>
                        {error && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs">
                              {error}
                            </p>
                          </div>
                        )}
                        <div className="space-y-16 space-x-[15px]">
                            <CustomButton
                                label="Cancel"
                                name="buttonborder"
                                onClick={clearFields}
                            />
                            <CustomButton
                                label="Update Profile"
                                name="buttondefault"
                                onClick={handleSubmit}
                            />
                        </div>
                    </form>
                </div>
            </div>
          </div>
        </div>
      );
}

export default AccSetting;