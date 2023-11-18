import React from "react";
import { useParams } from "react-router-dom";
import { NewsCardData } from "../../NewsData";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Readmorenews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedNews = NewsCardData.find((news) => news.id === id);

  if (!selectedNews) {
    return <div>Past Events not found</div>; // Handle case where news article with the provided ID is not found
  }

  const { NewsTitle, NewsDate, NewsContent } = selectedNews;

  return (
    <div className="relative flex flex-col items-center ">
      <div className=" w-fit mx-2 mb-16 lg:mx-40 mt-48 rounded-2xl bg-white text-black ">
        {/*  */}
        <div
          className=" absolute flex mt-[-50px] items-center cursor-pointer "
          onClick={() => {
            navigate(-1, { preventScrollReset: true });
          }}
        >
          <IoIosArrowBack className=" w-6 h-6" />{" "}
          <p className=" font-bricolage text-xl font-bold leading-7">
            Return to Past Events
          </p>
        </div>
        {/*  */}

        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-fit rounded-2xl bg-[#F7F7F7] ">
          <p className=" text-[25px] lg:text-[45px] font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
            {" "}
            Past Events
          </p>

          <div className="w-full h-fit pt-9 gap-5">
            <article className="flex max-w-fit flex-col items-start justify-normal border-t-4 border-[#6840E0] bg-white h-full ">
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
  );
};

export default Readmorenews;
