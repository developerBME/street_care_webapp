import React, { useState, useEffect } from "react";
import News from "../HomePage/News";

const Newscard =  () => {
  const NewsCardData = [
    {
      NewsTitle:
        "Military Families event for Street Care on Giving Tuesday, 12/1!",
      NewsDate: "Sep 1,2022",
      NewsContent: "Teams of military families will make care kits for us.",
    },
    {
      NewsTitle: "Thank You to Maryland Team who helps Street Care Monthly!",
      NewsDate: "Jan 18,2022",
      NewsContent:
        "Our Maryland Team is out on the streets in the greater Baltimore area monthly helping those homeless in need",
    },
    {
      NewsTitle: "Thank You to the United Methodist Church for Grant!",
      NewsDate: "Jan 18,2022",
      NewsContent:
        "Thank You to the United Methodist church (Baltimore-Washington DC) for rewarding BME Maryland partners with a grant for SC",
    },
    {
      NewsTitle:
        "Military Families event for Street Care on Giving Tuesday, 12/1!",
      NewsDate: "Sep 1,2022",
      NewsContent: "Teams of military families will make care kits for us.",
    },
    {
      NewsTitle: "Thank You to Maryland Team who helps Street Care Monthly!",
      NewsDate: "Jan 18,2022",
      NewsContent:
        "Our Maryland Team is out on the streets in the greater Baltimore area monthly helping those homeless in need",
    },
    {
      NewsTitle: "Thank You to the United Methodist Church for Grant!",
      NewsDate: "Jan 18,2022",
      NewsContent:
        "Thank You to the United Methodist church (Baltimore-Washington DC) for rewarding BME Maryland partners with a grant for SC",
    },
    {
      NewsTitle:
        "Military Families event for Street Care on Giving Tuesday, 12/1!",
      NewsDate: "Sep 1,2022",
      NewsContent: "Teams of military families will make care kits for us.",
    },
    {
      NewsTitle: "Thank You to Maryland Team who helps Street Care Monthly!",
      NewsDate: "Jan 18,2022",
      NewsContent:
        "Our Maryland Team is out on the streets in the greater Baltimore area monthly helping those homeless in need",
    },
    {
      NewsTitle: "Thank You to the United Methodist Church for Grant!",
      NewsDate: "Jan 18,2022",
      NewsContent:
        "Thank You to the United Methodist church (Baltimore-Washington DC) for rewarding BME Maryland partners with a grant for SC",
    },
    
  ];
  const [newsevents, setnewsevents] = useState([]);

  useEffect(() => {

  const fetchnewsData = async () => {
    
    const eventsData = NewsCardData;
    setnewsevents(eventsData);
    };

    fetchnewsData();
  }, []);  

  

  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-4 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {" "}
          <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
            
            <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          {/*<News />*/}

          <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
            <p className="font-dmsans font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#212121]">
              News
            </p>
            <div className=" grid grid-cols-1 gap-x-8 gap-y-8 mt-6 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {newsevents.map((eventData) => (
                <News key={eventData.id} NewsCardData={eventData} />
              ))}
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newscard;
