import React, { useState, useEffect, useRef } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import FAQs from "./HomePage/FAQs";
import Eventcard from "./HomePage/Eventcard";
import BMEcard from "./HomePage/BMEcard";
import BMEcardnew from "./HomePage/BMEofficialCard";
import Landing from "./HomePage/Landing";
import Success from "./HomePage/Success";
import News from "./HomePage/News";
import Map from "./HomePage/Map";
import Process from "./HomePage/Process";
import MoreAboutUs from "./HomePage/MoreAboutUs";
import Navbar from "./Navbar";
import OutreachEventCard from "./Community/OutreachEventCard";
import {
  formatDate,
  fetchEvents,
  fetchOfficialEvents,
} from "./EventCardService";

import BMEcardimg1 from "../images/BMEofficialcardimg1.png";
import BMEcardimg2 from "../images/BMEofficialcardimg2.png";
import BMEcardimg3 from "../images/BMEofficialcardimg3.png";
import CustomButton from "../component/Buttons/CustomButton";
import { NewsCardData } from "../NewsData";
import EventCardSkeleton from "./Skeletons/EventCardSkeleton";
import PastOutreachEventCardSkeleton from "./Skeletons/PastOutreachEventCardSkeleton";
import { PanoramaWideAngleSelectRounded } from "@mui/icons-material";
import { collection, doc, setDoc, getDoc,updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

function HomePage() {
  const navigate = useNavigate();
  const fAuth = getAuth();

  onAuthStateChanged(fAuth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log(user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const cardData = [
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238",
      },
      helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5,
    },
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238",
      },
      helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5,
    },
    {
      userName: "William Smith",
      title: "BK Fort Green Outreach",
      eventDate: "Sept 9, 2023 SAT 5:00pm",
      location: {
        street: "200 Eastern Pkwy",
        city: "Brooklyn",
        state: "NY",
        zipcode: "11238",
      },
      helpType: "Childcare Specialist needed",
      totalSlots: 20,
      interests: 5,
    },
  ];

  const BMEcardData = [
    {
      title: "Community Connection Night",
      eventDate: "Oct 12,2023 THU 5:30pm",
      location: {
        street: "One Place Plaza,",
        city: "West 2nd Fl,",
        state: "NY,",
        zipcode: "10038",
      },
      totalSlots: 100,
      interests: 61,
      img: BMEcardimg1,
    },
    {
      title: "Volunteer November Meetup",
      eventDate: "Nov 1,2023 THU 6:00pm",
      location: {
        street: "Online",
      },
      totalSlots: "Unlimited",
      interests: "Unlimited",
      img: BMEcardimg2,
    },
    {
      title: "Volunteer December Meetup",
      eventDate: "Oct 12,2023 THU 5:30pm",
      location: {
        street: "Online",
      },
      totalSlots: "Unlimited",
      interests: "Unlimited",
      img: BMEcardimg3,
    },
  ];

  const [events, setEvents] = useState([]);
  const [offevents, setOffevents] = useState([]);
  const [newsevents, setnewsevents] = useState([]);
  const [eventsDisplay, setEventsDisplay] = useState([]);


//Kedar changes
  const [user, setUser] = useState([]);
  const [fname, setNamef] = useState('');
  const [lname, setNamel] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const firstName = form.fname.value;
    const lastName = form.lname.value;
    const addressValue = form.address.value;

    setNamef(firstName);
    setNamel(lastName);
    setAddress(addressValue);

    const userData = {
      firName:firstName,
      lasName:lastName,
      addValue:addressValue,
    };

    // Modify handleSubmit to only update changed fields
  

    const id = "0010";
    const userRef = doc(db, "test_kb",id);
    await setDoc(userRef, userData);
    const docSnap = await getDoc(userRef);


    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
}
const newData = { lastLogin: new Date() }; // Example of new data to update

await updateDoc(userRef, newData); // Updates only the fields in newData

  };
  const clickUpdate = async () => {
    const userRef = doc(db, "test_kb", "0010");
    const updatedData = {
      firName: fname,
      lasName: lname,
      addValue: address,
  };

  try {
    await updateDoc(userRef, updatedData);
    console.log("Document successfully updated");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};
const clickDelete = async () => {
  const userRef = doc(db, "test_kb", "0010");
  

try {
  await deleteDoc(userRef);
  console.log("Document successfully deleted");
} catch (error) {
  console.error("Error deleting document: ", error);
}
};


  useEffect(()=> {
    const getUsers = async ()=> {

    }
  },[])

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();

      // Sort events in place based on their date
      // eventsData.sort((a, b) => a.eventDate - b.eventDate);

      // setEvents(eventsData);

      // Display 3 upcoming events
      eventsData.sort((a, b) => a.eventDate - b.eventDate);
      setEvents(eventsData);
    };
    const fetchOfficialData = async () => {
      const eventsData = await fetchOfficialEvents();
      // Sort events in place based on their date
      // eventsData.sort((a, b) => a.eventDate - b.eventDate);
      // setOffevents(eventsData);

      // Display 3 upcoming events
      eventsData.sort((a, b) => a.eventDate - b.eventDate);
      let limitedData = eventsData.slice(0, 3);
      setOffevents(limitedData);
    };

    const fetchnewsData = async () => {
      // Display 3 news initially
      let limitedData = NewsCardData.slice(0, 3);
      setnewsevents(limitedData);
    };

    fetchData();
    fetchOfficialData();
    fetchnewsData();
  }, []);

  useEffect(() => {
    setEventsDisplay(events);
    // searchRef.current = "";
  }, [events]);

  useEffect(() => {
    if (eventsDisplay.length > 0) {
      setIsLoading(false);
    }
  }, [eventsDisplay]);

  const outreachRef = useRef();

  const handleOutreachRef = () => {
    outreachRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Filter events to get only past events
  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.eventDate.seconds * 1000);
      return eventDate >= new Date(); // Check if the event date is before the current date
    })
    .slice(0, 3);

  // Filter events to get only past events
  const pastEvents = events
    .filter((event) => {
      const eventDate = new Date(event.eventDate.seconds * 1000);
      return eventDate < new Date(); // Check if the event date is before the current date
    })
    .slice(0, 3);

  useEffect(() => {
    document.title = "Home - Street Care";
  }, []);

  return (
    // <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
    <div className="relative flex flex-col items-center ">
      <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl text-black ">
        {" "}
        <Landing scorllFuntion={handleOutreachRef} />
      </div>
      <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
        <Success />
      </div>
      <div
        id="outreach"
        className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black"
      >
        <div
          className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] scroll-m-24"
          ref={outreachRef}
        >
          <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
            {" "}
            Upcoming Outreach Events:
          </p>

          {isLoading ? (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : (
            <>
              {upcomingEvents.length == 0 ? (
                <div className="text-md font-medium font-dmsans text-[#181818] mt-6">
                  No upcoming events
                </div>
              ) : (
                <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
                  {upcomingEvents.map((eventData) => (
                    <OutreachEventCard
                      key={eventData.id}
                      cardData={{
                        ...eventData,
                        eventDate: formatDate(
                          new Date(eventData.eventDate.seconds * 1000)
                        ),
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
          <div className="mt-16">
            <CustomButton
              label="More Outreach Events"
              name="buttondefault"
              onClick={() => {
                navigate("/allOutreachEvents");
              }}
            />
          </div>
        </div>
      </div>
      {/* DIV BLOCK FOR ALL PAST OUTREACH EVENTS*/}
      <div
        id="pastoutreach"
        className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black"
      >
        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] scroll-m-16">
          <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
            {" "}
            Past Outreach Events:
          </p>

          {isLoading ? (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              <PastOutreachEventCardSkeleton />
              <PastOutreachEventCardSkeleton />
              <PastOutreachEventCardSkeleton />
            </div>
          ) : (
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              {pastEvents.map((eventData) => (
                <OutreachEventCard
                  isPastEvent={true}
                  key={eventData.id}
                  cardData={{
                    ...eventData,
                    eventDate: formatDate(
                      new Date(eventData.eventDate.seconds * 1000)
                    ),
                  }}
                />
              ))}
            </div>
          )}
          <div className="mt-16">
            <CustomButton
              label="More Outreach Events"
              name="buttondefault"
              onClick={() => {
                navigate("/allPastOutreachEvents");
              }}
            />
          </div>
        </div>
      </div>
      {/*Vedant*/} {/*BME OFFCIIAL GATHERING BLOCK START*/}
      {/* 
     <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
          <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
            {" "}
            BME Official Gathering
          </p>
          <div className=" w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
          
            {offevents.map((eventData) => (
              <BMEcardnew
                key={eventData.id}
                BMEcardData={{
                  ...eventData,
                  eventDate: formatDate(
                    new Date(eventData.eventDate.seconds * 1000)
                  ),
                }}
              />
            ))}
          </div>
        </div>
      </div> 

      */}
      {/* Aniket */}
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8  rounded-2xl bg-white text-black ">
        <Process />
      </div>
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black">
        <MoreAboutUs />
      </div>
      {/* Aniket */}
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
        <Map />
      </div>
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
        {/*<News />*/}

        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
          <p className=" text-[25px] lg:text-[45px] font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
            Past Events
          </p>
          <div className=" grid grid-cols-1 gap-x-8 gap-y-8 mt-6 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {newsevents.map((eventData) => (
              <News key={eventData.id} NewsCardData={eventData} />
            ))}
            <div className="mt-16">
              <CustomButton
                label="Load More News"
                name="buttondefault"
                onClick={() => {
                  navigate("/allnews");
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 mb-16 rounded-2xl bg-white text-black ">
        <FAQs />
      </div>

      <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="fname">First name:</label><br/>
      <input type="text" id="fname" name="fname" onChange={(e) => setNamef(e.target.value)} value={fname}/>
      <button type="button" onClick={clickUpdate}>Update</button>
      <br/>
      <label htmlFor="lname"> Last name: </label><br/>
      <input type="text" id="lname" name="lname" onChange={(e) => setNamel(e.target.value)} value={lname}/>
      <button type="button">Update</button>
      <br/>
      <label htmlFor="address">Address:</label><br/>
      <input type="text" id="address" name="address" onChange={(e) => setAddress(e.target.value)} value={address}/>
      <button type="button">Update</button>
      <br/>
      <button type="submit">Submit</button>
      <br/>
      <button type="button" onClick={clickDelete}>Delete</button><br/><br/>
    </form>
    
    <br/>
    <div>
      <h3>Submitted Data:</h3>
      <p><strong>First Name:</strong> {fname}</p>
      <p><strong>Last Name:</strong> {lname}</p>
      <p><strong>Address:</strong> {address}</p>
    </div>
  </div>

    </div>

    
  );
}

export default HomePage;
