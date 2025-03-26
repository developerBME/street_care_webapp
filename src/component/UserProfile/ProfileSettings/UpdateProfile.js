import React, { useState, useRef, useEffect } from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CustomButton from "../../Buttons/CustomButton";
import Avatar from "@mui/material/Avatar";
import defaultImage from "../../../images/default_avatar.svg";
import errorImg from "../../../images/error.png";
import successImg from "../../../images/verified.png";
import edit from "../../../images/edit.png";
import removeIcon from "../../../images/delete.svg";
import arrowBack from "../../../images/arrowBack.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ImageRounded } from "@mui/icons-material";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "@firebase/firestore";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import imageCompression from "browser-image-compression";

const USERS_COLLECTION = "users";

async function uploadProfileImage(
  file,
  currentUser,
  setLoading,
  setSuccess,
  setPhotoUrl,
  setAvatarLoading
) {
  const fAuth = getAuth();
  const fileRef = ref(storage, "webappUserImages/" + fAuth.currentUser.uid);
  setAvatarLoading(true);

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
    setPhotoUrl(photoUrl);
    setAvatarLoading(false);
  } catch (error) {
    setLoading(false);
    console.error("Error uploading image:", error);
    setAvatarLoading(false);
  }
}

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState("EDIT_PROFILE");
  const [newUsername, setNewUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [newCity, setNewCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [newState, setNewState] = useState("");
  const [stateError, setStateError] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [userimageError, setUserimageError] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");
  const [isImageRemoved, setIsImageRemoved] = useState(false);

  const username = useRef("");
  const city = useRef("");
  const state = useRef("");
  const country = useRef("");
  const imgRef = useRef();
  const fAuth = getAuth();

  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState(defaultImage);
  const [dateCreated, setDateCreated] = useState("");

  const [errormsg, setErrors] = useState({
    ProfileNameError: "",
    CityError:"",
    StateError:"",
    CountryError:""

    
  });

  const handleEditProfile = () => {
    setCurrentStep("EDIT_FORM");
  };

  const handleBack = () => {
    setCurrentStep("EDIT_PROFILE");
  };

  const getUserData = async () => {
    try {
      const userRef = query(
        collection(db, "users"),
        where("uid", "==", fAuth?.currentUser?.uid)
      );
      const data = await getDocs(userRef);
      if (data.docs[0]) {
        const userData = data.docs[0].data();
        setPhotoUrl(userData.photoUrl || defaultImage);
        setDisplayName(userData.username);
        setNewUsername(userData.username); // Pre-fill the profile name field
        setNewCity(userData.city || "");    // Pre-fill the city field
        setNewState(userData.state || "");  // Pre-fill the state field
        setNewCountry(userData.country || ""); // Pre-fill the country field
        setDateCreated(
          userData.dateCreated.toDate().getMonth() +
            1 +
            "/" +
            userData.dateCreated.toDate().getDate() +
            "/" +
            userData.dateCreated.toDate().getFullYear()
        );
      }
      // if (data.docs[0]) {
      //   setPhotoUrl(data.docs[0].data().photoUrl || defaultImage);
      //   setDisplayName(data.docs[0].data().username);
      //   setDateCreated(
      //     data.docs[0].data().dateCreated.toDate().getMonth() +
      //       1 +
      //       "/" +
      //       data.docs[0].data().dateCreated.toDate().getDate() +
      //       "/" +
      //       data.docs[0].data().dateCreated.toDate().getFullYear()
      //   );
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fAuth, (user) => {
      if (!user) {
        navigate("../login");
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

  const handleCityChange = (e) => {
    setNewCity(e.target.value);
    setError("");
    setSuccess("");
  };
  const handleStateChange = (e) => {
    setNewState(e.target.value);
    setError("");
    setSuccess("");
  };
  const handleCountryChange = (e) => {
    setNewCountry(e.target.value);
    setError("");
    setSuccess("");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarLoading(true);

      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/svg+xml"
      ) {
        setUserimageError("Please select a valid PNG, JPG, or SVG image.");
        setAvatarLoading(false);
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
      setAvatarLoading(false);
    }
  };
  const handleRemoveImage = () => {
    setNewProfileImage(null); // Remove from local state
    setUserimageError("");
    setPhotoUrl(""); // Remove preview
    setIsImageRemoved(true); // Track that image was removed
  };
  const handleSubmitProfileUpdate = async (e) => {
    e.preventDefault();
    
    if (!username.current.value || !city.current.value || !state.current.value || !country.current.value) {
      setError("Please provide details to update.");
      setSuccess("");
      return;
    }
  
    try {
      const fAuth = getAuth();
      const userQuery = query(
        collection(db, USERS_COLLECTION),
        where("uid", "==", fAuth.currentUser.uid)
      );
      const userDocRef = await getDocs(userQuery);
  
      if (userDocRef.empty) {
        setError("User not found.");
        return;
      }
  
      const userDocID = userDocRef.docs[0].id;
      const userRef = doc(db, USERS_COLLECTION, userDocID);
  
      // Prepare data for update
      const updatedData = {
        username: username.current.value,
        city: city.current.value,
        state: state.current.value,
        country: country.current.value,
      };
  
      // Check if user removed the image
      if (isImageRemoved) {
        updatedData.photoUrl = ""; // Remove from Firestore
      } else if (newProfileImage) {
        // If new image is selected, upload it
        setUserimageError("");
        await uploadProfileImage(
          newProfileImage,
          fAuth.currentUser,
          setLoading,
          setSuccess,
          setPhotoUrl,
          setAvatarLoading
        );
        setNewProfileImage(null);
      }
  
      // Update Firestore in a single call
      await updateDoc(userRef, updatedData);
      
      setSuccess("Successfully updated the profile.");
      setIsImageRemoved(false); // Reset flag
    } catch (error) {
      setError("Error updating profile.");
      console.error("Error updating profile:", error);
    }
  };
  
  
  // const handleSubmitProfileUpdate = async (e) => {
  //   e.preventDefault();
  //   if (!username.current.value ||!city.current.value || !state.current.value || !country.current.value) {
  //     setError("Please provide a display name and profile image and  location details to update");
  //     setSuccess("");
  //   } else {
  //     if (username.current.value !== "") {
  //       setUsernameError("");
  //       const userQuery = query(
  //         collection(db, USERS_COLLECTION),
  //         where("uid", "==", fAuth.currentUser.uid)
  //       );
  //       const userDocRef = await getDocs(userQuery);
  //       const userDocID = userDocRef.docs[0].id;
  //       const userRef = doc(db, USERS_COLLECTION, userDocID);
  //       await updateDoc(userRef, {
  //         username: username.current.value,
  //       });
  //     } 
  //     if (imgRef.current.value !== "") {
  //       setUserimageError("");
  //       uploadProfileImage(
  //         newProfileImage,
  //         fAuth.currentUser,
  //         setLoading,
  //         setSuccess,
  //         setPhotoUrl,
  //         setAvatarLoading
  //       );
  //       imgRef.current.value = "";
  //       setNewProfileImage(null);
  //     }
  //     if (city.current.value !== "") {
  //       setCityError("");
  //       const userQuery = query(
  //         collection(db, USERS_COLLECTION),
  //         where("uid", "==", fAuth.currentUser.uid)
  //       );
  //       const userDocRef = await getDocs(userQuery);
  //       const userDocID = userDocRef.docs[0].id;
  //       const userRef = doc(db, USERS_COLLECTION, userDocID);
  //       await updateDoc(userRef, {
  //         city: city.current.value,
  //       });
  //     }
  //     if (state.current.value !== "") {
  //       setStateError("");
  //       const userQuery = query(
  //         collection(db, USERS_COLLECTION),
  //         where("uid", "==", fAuth.currentUser.uid)
  //       );
  //       const userDocRef = await getDocs(userQuery);
  //       const userDocID = userDocRef.docs[0].id;
  //       const userRef = doc(db, USERS_COLLECTION, userDocID);
  //       await updateDoc(userRef, {
  //         state: state.current.value,
  //       });
  //     }
  //     if (country.current.value !== "") {
  //       setCountryError("");
  //       const userQuery = query(
  //         collection(db, USERS_COLLECTION),
  //         where("uid", "==", fAuth.currentUser.uid)
  //       );
  //       const userDocRef = await getDocs(userQuery);
  //       const userDocID = userDocRef.docs[0].id;
  //       const userRef = doc(db, USERS_COLLECTION, userDocID);
  //       await updateDoc(userRef, {
  //         country: country.current.value,
  //       });
  //     }
  //     setSuccess("Successfully updated the data"); 
  //   }
    
  // };

  const handleEditClick = () => {
    imgRef.current.click();
  };

  const updateErrorState = (key, value) => {
    setErrors((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center gap-8 ">
        <div className="w-[95%] md:w-[90%] lg:w-[100%] lg:max-w-[864px] xl:max-w-[1120px] mx-2 lg:mx-40 mt-32 mb-16 rounded-2xl bg-[#f7f7f7] text-black flex flex-row">
          <div className="w-full h-full px-4 py-6 md:p-12 lg:p-16 flex-col justify-start items-start gap-6 inline-flex">
            <div className="flex flex-col gap-2">
              {currentStep === "EDIT_FORM" && (
                <div>
                  <Link to="/profile/profilesettings/updateprofile">
                    <div className="inline-flex cursor-pointer">
                      {/* removed pl-3 xl:px-16 xl:pt-16 from this div*/}
                      <img alt="" src={arrowBack} onClick={handleBack} />
                    </div>
                  </Link>
                </div>
              )}
              <div className="font-dmsans text-base">
                <Breadcrumbs
                  aria-label="breadcrumb"
                  separator={<NavigateNextIcon />}
                >
                  <Link
                    underline="hover"
                    href="/Profile"
                    className="font-dmsans"
                  >
                    Profile
                  </Link>
                  <Link
                    underline="hover"
                    href="../ProfileSettings"
                    className="font-dmsans"
                  >
                    Account Settings
                  </Link>
                  <Typography>Update your profile</Typography>
                </Breadcrumbs>
              </div>
              <div className="text-black text-4xl md:text-[32px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
                Update your profile
              </div>
            </div>
            <div className="bg-[#FFFFFF] rounded-2xl h-full w-full">
              <div className="flex flex-row justify-between items-center p-10">
                {currentStep === "EDIT_PROFILE" ? (
                  <div className="flex flex-row gap-6 items-center">
                    <div className="rounded-full border-2 border-violet-600">
                      <Avatar
                        src={photoUrl || defaultImage}
                        alt="User Avatar"
                        sx={{ width: 100, height: 100 }}
                      />
                    </div>
                    <div className="flex-col font-dmsans">
                      <div className="text-2xl font-bold">{displayName}</div>
                      <div className="text-base font-medium">
                        Member Since: {dateCreated}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row gap-6 items-center">
                    <div className="relative">
                      <div className="rounded-full border-2 border-violet-600">
                        <Avatar
                          src={photoUrl || defaultImage}
                          alt="User Avatar"
                          sx={{ width: 100, height: 100 }}
                        />
                      </div>

                      <div className="absolute right-0 bottom-0 ml-4 mb-2 md:ml-0 md:mb-0 bg-[#CEBFFC] rounded-full p-1">
                        <CustomButton
                          label=""
                          name="buttonicon8small"
                          icon={edit}
                          onClick={handleEditClick}
                        />
                      </div>
                      {photoUrl && photoUrl !== defaultImage && (
                        <div className="absolute left-0 bottom-0 ml-4 mb-2 md:ml-0 md:mb-0 bg-[#CEBFFC] rounded-full p-1">
                          <CustomButton
                            label=""
                            name="buttonicon8small"
                            icon={removeIcon} // Add remove icon here
                            onClick={handleRemoveImage} // Handle remove image
                          />
                        </div>
                      )}
                      {avatarLoading && (
                        <div className="absolute rounded-full text-center inset-0 flex items-center justify-center bg-black bg-capacity-50 p-2 m-0">
                          <div className="text-white text-sm">Updating</div>
                        </div>
                      )}
                    </div>
                    <div className="flex-col font-dmsans">
                      <form
                        className="gap-6 flex flex-col w-full"
                        id="profile-update-form"
                      >
                        <div className="self-stretch h-fit flex-col justify-start items-start gap-4 flex">
                          <div className="self-stretch rounded-tl rounded-tr flex-col justify-start items-start gap-1.5 flex mb-2">
                            <div className="self-stretch text-zinc-700 text-[15px] font-medium font-inter leading-tight">
                              Profile Name
                            </div>
                            <div className="self-stretch border-stone-300 justify-start items-center gap-2 inline-flex">
                              <div className="grow shrink basis-0 h-10 flex-col rounded-md border-0 justify-center items-start inline-flex">
                                <input
                                  type="text"
                                  id="username"
                                  value={newUsername}
                                  ref={username}
                                  placeholder="Eg. John Doe"
                                  maxLength="20"
                                  className={`text-zinc-700 w-full h-full px-4 rounded-md border-0 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
                                    errormsg.ProfileNameError !== ""
                                      ? "ring-red-500"
                                      : "ring-gray-300"
                                  }`}
                                  onChange={handleUsernameChange}
                                ></input>
                              </div>
                              
                            </div>
                            <div className="self-stretch text-zinc-700 text-[15px] font-medium font-inter leading-tight">
                              City
                            </div>
                            <div className="self-stretch border-stone-300 justify-start items-center gap-2 inline-flex">
                              <div className="grow shrink basis-0 h-10 flex-col rounded-md border-0 justify-center items-start inline-flex">
                                <input
                                  type="text"
                                  id="city"
                                  value={newCity}
                                  ref={city}
                                  placeholder="Eg. Indianapolis"
                                  maxLength="20"
                                  className={`text-zinc-700 w-full h-full px-4 rounded-md border-0 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
                                    errormsg.CityError !== ""
                                      ? "ring-red-500"
                                      : "ring-gray-300"
                                  }`}
                                  onChange={handleCityChange}
                                ></input>
                              </div>
                              
                            </div>
                            <div className="self-stretch text-zinc-700 text-[15px] font-medium font-inter leading-tight">
                              State
                            </div>
                            <div className="self-stretch border-stone-300 justify-start items-center gap-2 inline-flex">
                              <div className="grow shrink basis-0 h-10 flex-col rounded-md border-0 justify-center items-start inline-flex">
                                <input
                                  type="text"
                                  id="state"
                                  value={newState}
                                  ref={state}
                                  placeholder="Eg. Indiana"
                                  maxLength="20"
                                  className={`text-zinc-700 w-full h-full px-4 rounded-md border-0 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
                                    errormsg.StateError !== ""
                                      ? "ring-red-500"
                                      : "ring-gray-300"
                                  }`}
                                  onChange={handleStateChange}
                                ></input>
                              </div>
                              
                            </div>
                            <div className="self-stretch text-zinc-700 text-[15px] font-medium font-inter leading-tight">
                              Country
                            </div>
                            <div className="self-stretch border-stone-300 justify-start items-center gap-2 inline-flex">
                              <div className="grow shrink basis-0 h-10 flex-col rounded-md border-0 justify-center items-start inline-flex">
                                <input
                                  type="text"
                                  id="country"
                                  value={newCountry}
                                  ref={country}
                                  placeholder="Eg. United States"
                                  maxLength="20"
                                  className={`text-zinc-700 w-full h-full px-4 rounded-md border-0 text-[15px] font-normal font-inter leading-snug tracking-wide ring-1 ring-inset ${
                                    errormsg.CountryError !== ""
                                      ? "ring-red-500"
                                      : "ring-gray-300"
                                  }`}
                                  onChange={handleCountryChange}
                                ></input>
                              </div>
                              
                            </div>
                            {errormsg.ProfileNameError && (
                              <div className="inline-flex items-center gap-1.5">
                                <img
                                  alt=""
                                  src={errorImg}
                                  className="w-3 h-3"
                                />
                                <div className="text-red-700 font-dmsans">
                                  {errormsg.ProfileNameError}
                                </div>
                              </div>
                            )}
                            {errormsg.CityError && (
                              <div className="inline-flex items-center gap-1.5">
                                <img
                                  alt=""
                                  src={errorImg}
                                  className="w-3 h-3"
                                />
                                <div className="text-red-700 font-dmsans">
                                  {errormsg.CityError}
                                </div>
                              </div>
                            )}
                            {errormsg.StateError && (
                              <div className="inline-flex items-center gap-1.5">
                                <img
                                  alt=""
                                  src={errorImg}
                                  className="w-3 h-3"
                                />
                                <div className="text-red-700 font-dmsans">
                                  {errormsg.StateError}
                                </div>
                              </div>
                            )}
                            {errormsg.CountryError && (
                              <div className="inline-flex items-center gap-1.5">
                                <img
                                  alt=""
                                  src={errorImg}
                                  className="w-3 h-3"
                                />
                                <div className="text-red-700 font-dmsans">
                                  {errormsg.CountryError}
                                </div>
                              </div>
                            )}
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
                                <p className="text-red-600 text-xs">
                                  {userimageError}
                                </p>
                              </div>
                            )}
                          </div>
                          {error && (
                            <div className="inline-flex items-center">
                              <img src={errorImg} className="w-3 h-3 px-16" />
                              <p className="text-red-600 text-xs">{error}</p>
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {currentStep === "EDIT_PROFILE" ? (
                  <div>
                    <CustomButton
                      name="editButton"
                      label="Edit"
                      onClick={handleEditProfile}
                    />
                  </div>
                ) : (
                  <div>
                    <div>
                      <CustomButton
                        name="buttondefault"
                        label="Save"
                        type="submit"
                        className={`w-full text-[14px] font-medium py-[10px] px-[24px] rounded-full transition ease-in-out delay-300 ${
                          avatarLoading !== true
                            ? "text-white bg-[#6840E0] hover:bg-[#504279]"
                            : "text-[#a7a7a7] bg-[#d8d8d8] cursor-not-allowed"
                        }`}
                        onClick={(e) => handleSubmitProfileUpdate(e)}
                      />
                    </div>
                    {success && (
                      <div className="inline-flex items-center">
                        <img src={successImg} className="w-3 h-3" />
                        <p className="text-red-600 text-xs">{success}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;