import React, { useState, useEffect, useRef } from "react";
import CustomButton from "../Buttons/CustomButton";
import errorImg from "../../images/error.png";
import successImg from "../../images/verified.png";
import {getAuth, onAuthStateChanged, updateProfile} from "firebase/auth";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import imageCompression from 'browser-image-compression';

const USERS_COLLECTION = "users";
async function uploadProfileImage(file,currentUser,setLoading){
  const fAuth = getAuth();
  const fileRef = ref(storage, "webappUserImages/" + fAuth.currentUser.uid);
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);
  const photoUrl = await getDownloadURL(fileRef);
  console.log(photoUrl)

  const userQuery = query(
    collection(db, USERS_COLLECTION),
    where("uid", "==", fAuth.currentUser.uid)
  );
  const userDocRef = await getDocs(userQuery);
  const userDocID = userDocRef.docs[0].id;
  // reference for the userdoc
  const userRef = doc(db, USERS_COLLECTION, userDocID);
  await updateDoc(userRef, {
    photoUrl: photoUrl,
  });
  // updateProfile(currentUser,{photoURL:photoUrl})
  setLoading(false);
  alert("File Uploaded successfully")
}



function AccSetting() {
  const [newUsername, setNewUsername] = useState('');
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [usernameError, setUsernameError] = useState("");
  const [userimageError, setUserimageError] = useState("");
  const [success, setSuccess] = useState("");
  const username = useRef("");
  const imgRef = useRef("");
  const fAuth = getAuth();
  const [loading, setLoading] = useState(false)

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check the file format
      if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/svg+xml') {
        setUserimageError('Please select a valid PNG, JPG, or SVG image.');
        return;
      }

      // Original image size
      console.log('Original Image Size:', file.size, 'bytes');

      try {
        const options = {
          maxSizeMB: 0.05,
        };

        const compressedFile = await imageCompression(file, options);
        // Compressed image size
        console.log('Compressed Image Size:', compressedFile.size, 'bytes');
        setNewProfileImage(compressedFile);
        setUserimageError('');
      } catch (error) {
        setUserimageError('Image compression failed. Please select a smaller image.');
      }
    }
  };

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    if (!username.current.value){
      setUsernameError("Please provide a display name");
    } else {
      setUsernameError("");
      const userQuery = query(
        collection(db, USERS_COLLECTION),
        where("uid", "==", fAuth.currentUser.uid)
      );
      const userDocRef = await getDocs(userQuery);
      const userDocID = userDocRef.docs[0].id;
      // reference for the userdoc
      const userRef = doc(db, USERS_COLLECTION, userDocID);
      // const userDoc = await getDoc(userRef);
      await updateDoc(userRef, {
        username: username.current.value,
      });
      setNewUsername("")
      setSuccess("Successful name change")
    }
    };
    
  const handleUpdateImage = async (e) => {
    e.preventDefault();
    if (!imgRef.current.value) {
        setUserimageError("Please provide an image to update!");
      } else {
        setUserimageError("");
        uploadProfileImage(newProfileImage,fAuth.currentUser,setLoading)
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
            <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mt-24  lg:mx-40 lg:mt-32 lg:mb-12 rounded-2xl bg-white text-black ">
                <div className="xl:px-24 xl:py-12">
                    <p className="text-[#212121] pl-4 pt-4 text-3xl md:pl-8 md:pt-0 xl:pl-0 xl:pt-0 sm:text-4xl font-medium font-dmsans leading-9 mb-4">Update Your Profile </p>
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
                            onChange={(e) => setNewUsername(e.target.value)}
                            className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-400"
                        />
                        </div>
                        {usernameError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs">
                              {usernameError}
                            </p>
                          </div>
                        )}
                        <CustomButton
                                label="Update username"
                                name="buttondefault"
                                onClick={handleUpdateUsername}
                            />
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
                        {userimageError && (
                          <div className="inline-flex items-center">
                            <img src={errorImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs">
                              {userimageError}
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
                                label="Update image"
                                name="buttondefault"
                                onClick={handleUpdateImage}
                                // disabled = {loading || !newProfileImage}
                            />
                        </div>
                        {success && (
                          <div className="inline-flex items-center">
                            <img src={successImg} className="w-3 h-3" />
                            <p className="text-red-600 text-xs">
                              {success}
                            </p>
                          </div>
                        )}
                    </form>
                </div>
            </div>
          </div>
        </div>
      );
}

export default AccSetting;