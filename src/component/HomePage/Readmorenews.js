import React from "react";
import { useParams } from 'react-router-dom';
import { NewsCardData } from "../../NewsData";

const Readmorenews = () => {  

  const { id } = useParams();
  const selectedNews = NewsCardData.find((news) => news.id === id);

  if (!selectedNews) {
    return <div>News not found</div>; // Handle case where news article with the provided ID is not found
  }

  const { NewsTitle, NewsDate, NewsContent } = selectedNews;
  
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
    <div className="relative flex flex-col items-center ">
      <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-4 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
        {" "}
        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
          
          <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 rounded-2xl bg-white text-black ">
                                                       {/*<News />*/}
               
              <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
                <div className="flex justify-start mb-4">
                    <img src="/static/media/streetcare-logo.c20bde781e4752881baa.png" alt="Logo" class="object-cover w-20 h-20 rounded-full"></img>
                    {/* <p className="font-dmsans justify-center font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#212121]">
                    News 
                    </p>  */}
                </div>
                          <article
                              className="flex max-w-4xl flex-col items-start justify-normal border-t-4 border-[#6840E0] bg-white h-full ">
                              <div className="h-full">
                                    <h1 className="text-[#1f1e1e] text-4xl pt-4 pb-2 px-2 font-bricolage font-medium">
                                      {NewsTitle}
                                    </h1>
                                    <h3 className="text-[#212121] text-4xs py-1 px-2 font-opensans font-normal">
                                      Published {NewsDate}
                                    </h3>
                                    <p className="mt-2 line-clamp-4 text-4sm leading-6 text-[#212121] px-2 font-opensans font-normal">
                                      {NewsContent}
                                    </p>
                              </div>
                          </article>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>

  );
};

export default Readmorenews;
