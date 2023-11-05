import React, { useState, useEffect } from "react";
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

function HomePage() {
  const navigate = useNavigate();
  const fAuth = getAuth();
  useEffect(() => {}, []);
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

  const NewsCardData = [
    {
      NewsTitle:
        "Military Families event for Street Care on Giving Tuesday, 12/1!",
      NewsDate: "Published Sep 1, 2022",
      NewsContent: "Teams of military families will make care kits for us.",
    },
    {
      NewsTitle: "Thank You to Maryland Team who helps Street Care Monthly!",
      NewsDate: "Published Jan 18, 2022",
      NewsContent:
        "Our Maryland Team is out on the streets in the greater Baltimore area monthly helping those homeless in need",
    },
    {
      NewsTitle: "Thank You to the United Methodist Church for Grant!",
      NewsDate: "Published Jan 18, 2022",
      NewsContent:
        "Thank You to the United Methodist church (Baltimore-Washington DC) for rewarding BME Maryland partners with a grant for SC",
    },
  ];

  const [events, setEvents] = useState([]);
  const [offevents, setOffevents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();

      // Sort events in place based on their date
      // eventsData.sort((a, b) => a.eventDate - b.eventDate);

      // setEvents(eventsData);

      // Display 3 upcoming events
      eventsData.sort((a, b) => a.eventDate - b.eventDate);
      let limitedData = eventsData.slice(0, 3);
      setEvents(limitedData);
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

    fetchData();
    fetchOfficialData();
  }, []);

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {" "}
          <Landing />
        </div>
        <div className="  w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          <Success />
        </div>
        <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
              {" "}
              Upcoming outreach events
            </p>
            {/*<div className=" w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              <Eventcard />
              <Eventcard />
              <div className=" md:col-span-2 lg:col-span-1">
                <Eventcard />
              </div>
  </div> */}
            <div className="w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              {events.map((eventData) => (
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
        {/* Vishnu */}
        {/* BME Official Gathering  */}
        {/* <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
              {" "}
              Upcoming outreach events
            </p>
            <div className=" w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              <BMEcard />
              <BMEcard />
              <div className=" md:col-span-2 lg:col-span-1">
                <BMEcard />
              </div>
            </div>
          </div>
        </div> */}
        {/*Vedant*/} {/*BME OFFCIIAL GATHERING BLOCK START*/}
        <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black">
          <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            <p className=" font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
              {" "}
              BME Official Gathering
            </p>
            <div className=" w-full h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-9 gap-5">
              {/* {BMEcardData.map(BMEData => (
                        <BMEcardnew key={BMEData.x} BMEcardData={BMEData} />
                      ))} */}
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
        {/*Vedant*/} {/*BME OFFCIIAL GATHERING BLOCK END*/}
        {/* Aniket */}
        <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8  rounded-2xl bg-white text-black ">
          <Process />
        </div>
        {/* Meet */}
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
            <p className="font-dmsans font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#212121]">
              News
            </p>
            <div className=" grid grid-cols-1 gap-x-8 gap-y-8 mt-6 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {NewsCardData.map((NewsData) => (
                <News key={NewsData.id} NewsCardData={NewsData} />
              ))}
              <div className="mt-16">
                <CustomButton label="More News" name="buttondefault" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 mb-16 rounded-2xl bg-white text-black ">
          <FAQs />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
