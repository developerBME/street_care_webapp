import React, { useState, useEffect, useRef } from "react";
import CustomButton from "../Buttons/CustomButton";
import errorImg from "../../images/error.png";
import successImg from "../../images/verified.png";
import { onAuthStateChanged, getAuth } from "firebase/auth";
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
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../images/default_avatar.svg";
import Avatar from "@mui/material/Avatar";
import edit from "../../images/edit.png";

const USERS_COLLECTION = "users";

async function uploadProfileImage(
  file,
  currentUser,
  setLoading,
  setSuccess,
  setAvatarLoading
) {
  const fAuth = getAuth();
  const fileRef = ref(storage, "webappUserImages/" + fAuth.currentUser.uid);

  setAvatarLoading(true); // Set avatar loading to true when starting the upload

  try {
    const snapshot = await uploadBytes(fileRef, file);
    const photoUrl = await getDownloadURL(fileRef);

    const userQuery = query(
      collection(db, USERS_COLLECTION),
      where("uid", "==", fAuth.currentUser.uid)
    );
    const userDocRef = await getDocs(userQuery);
    const userDocID = userDocRef.docs[0].id;
    const userRef = doc(db, USERS_COLLECTION, userDocID);
    await updateDoc(userRef, {
      photoUrl: photoUrl,
    });

    setLoading(false);
    setSuccess("File Uploaded successfully");

    setAvatarLoading(false); // Set avatar loading to false when upload is complete
  } catch (error) {
    setLoading(false);
    console.error("Error uploading image:", error);
    setAvatarLoading(false); // Set avatar loading to false on error
  }
}

function AccSetting() {
  const navigate = useNavigate();
  const [newUsername, setNewUsername] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [usernameError, setUsernameError] = useState("");
  const [userimageError, setUserimageError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [avatarLoading, setAvatarLoading] = useState(false);
  const username = useRef("");
  const imgRef = useRef("");
  const fAuth = getAuth();
  const [loading, setLoading] = useState(false);

  const [photoUrl, setPhotoUrl] = useState("");

  const getUserData = async () => {
    try {
      const userRef = query(
        collection(db, "users"),
        where("uid", "==", fAuth?.currentUser?.uid)
      );
      const data = await getDocs(userRef);

      if (data.docs[0]) {
        setPhotoUrl(data.docs[0].data().photoUrl || defaultImage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fAuth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });

    getUserData();

    return () => unsubscribe();
  }, [fAuth.currentUser]);

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
    setError("");
    setSuccess("");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarLoading(true); // Set avatar loading to true when the user selects an image
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/svg+xml"
      ) {
        setUserimageError("Please select a valid PNG, JPG, or SVG image.");
        setAvatarLoading(false); // Set avatar loading to false since the image type is invalid
        return;
      }

      try {
        const options = {
          maxSizeMB: 0.05,
        };

        const compressedFile = await imageCompression(file, options);
        setNewProfileImage(compressedFile);
        setUserimageError("");

        const imageUrl = URL.createObjectURL(compressedFile);
        setPhotoUrl(imageUrl);
      } catch (error) {
        setUserimageError(
          "Image compression failed. Please select a smaller image."
        );
      }
      setError("");
      setSuccess("");
      setAvatarLoading(false); // Set avatar loading to false when the image processing is complete
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.current.value && !imgRef.current.value) {
      setError("Please provide a display name or profile image to update");
      setSuccess("");
    } else if (username.current.value !== "") {
      setUsernameError("");
      const userQuery = query(
        collection(db, USERS_COLLECTION),
        where("uid", "==", fAuth.currentUser.uid)
      );
      const userDocRef = await getDocs(userQuery);
      const userDocID = userDocRef.docs[0].id;
      const userRef = doc(db, USERS_COLLECTION, userDocID);
      await updateDoc(userRef, {
        username: username.current.value,
      });
      setNewUsername("");
      setSuccess("Successfully updated display name");
    } else if (imgRef.current.value !== "") {
      setUserimageError("");
      uploadProfileImage(
        newProfileImage,
        fAuth.currentUser,
        setLoading,
        setSuccess,
        setAvatarLoading
      );
      setSuccess("Successfully updated profile image");
      imgRef.current.value = "";
      setNewProfileImage(null);
    }
  };

  const handleCancel = (e) => {
    navigate("/profile");
  };

  const clearFields = (e) => {
    e.preventDefault();
    username.current.value = "";
    setNewUsername("");
    imgRef.current.value = "";
    setNewProfileImage(null);
    setError("");
    setUserimageError("");
    setUsernameError("");
    setSuccess("");
  };

  const handleEditClick = () => {
    imgRef.current.click();
  };

  return (
    <div className="relative flex flex-col items-center ">
      <div className="w-full px-10 md:px-0 h-screen flex items-center justify-center">
        <div className="bg-white mt-[64px] border border-gray-200 flex flex-col items-center justify-center px-4 md:px-[128px] py-[100px] rounded-[30px] shadow-2xl">
          <p className="text-[#212121] text-3xl sm:text-[45px] font-medium font-dmsans leading-9 mb-[32px]">
            Update Your Profile{" "}
          </p>
          <div className="relative">
            <div className="relative inline-block rounded-full border border-violet-600">
              <Avatar
                src={photoUrl || defaultImage}
                alt="User Avatar"
                sx={{ width: 100, height: 100 }}
              />
              <div className="absolute bottom-5 right-5 transform translate-x-1/2 translate-y-1/2 -mb-2 -mr-2 cursor-pointer bg-white rounded-full">
                <CustomButton
                  label=""
                  name="buttonicon8"
                  icon={edit}
                  className="w-8 h-8"
                  onClick={handleEditClick}
                />
              </div>
              {avatarLoading && (
                <div className="absolute rounded-full text-center inset-0 flex items-center justify-center bg-black bg-opacity-50 p-2 m-0">
                  <div className="text-white text-sm">Updating</div>
                </div>
              )}
            </div>
          </div>
          <form className="md:w-[360px] mt-[24px]">
            <div className="mb-4 space-y-1.5">
              <label
                htmlFor="username"
                className="text-zinc-700 text-sm font-medium font-dmsans leading-tight"
              >
                Profile Name
              </label>
              <input
                type="text"
                id="username"
                value={newUsername}
                ref={username}
                onChange={handleUsernameChange}
                className="w-full h-12 px-4 py-1 rounded border border-stone-300 justify-start items-center gap-2 inline-flex focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="mb-4 space-y-1.5 hidden">
              <label
                htmlFor="profileImage"
                className="text-zinc-700 text-sm font-medium font-dmsans leading-tight"
              >
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                ref={imgRef}
                onChange={handleImageChange}
                className="w-full h-12 px-4 py-2 rounded border border-stone-300 justify-start items-center gap-2 inline-flex focus:outline-none focus:ring focus:ring-blue-400"
              />
              {newProfileImage && (
                <img
                  src={URL.createObjectURL(newProfileImage)}
                  alt="Selected Image"
                  className="mt-2 max-w-full h-auto"
                />
              )}
              {userimageError && (
                <div className="inline-flex items-center">
                  <img src={errorImg} className="w-3 h-3" />
                  <p className="text-red-600 text-xs">{userimageError}</p>
                </div>
              )}
            </div>
            {error && (
              <div className="inline-flex items-center">
                <img src={errorImg} className="w-3 h-3 px-16" />
                <p className="text-red-600 text-xs">{error}</p>
              </div>
            )}
            <div className="mt-[32px] space-y-2 md:space-y-8 md:space-x-[15px] space-x-[5px]">
            <button
            onClick={(e) => handleSubmit(e)}
            className={`w-full text-[14px] font-medium py-[10px] px-[24px] rounded-full transition ease-in-out delay-300 ${
              avatarLoading !== true
                ? "text-white bg-[#6840E0] hover:bg-[#504279]"
                : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
            }`}
          >
            Update Profile
          </button>
          
            </div>
            {success && (
              <div className="inline-flex items-center">
                <img src={successImg} className="w-3 h-3" />
                <p className="text-red-600 text-xs">{success}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccSetting;
