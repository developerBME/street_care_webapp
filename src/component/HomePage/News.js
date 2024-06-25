import React from "react";
import { Link } from "react-router-dom";

const News = ({ NewsCardData }) => {
  const { id, NewsTitle, NewsDate, NewsContent } = NewsCardData;

  return (
    <article
      key="123"
      className="flex max-w-2xl flex-col items-start justify-normal border-t-4 border-[#6840E0] bg-white h-full "
    >
      <div className="">
        <h1 className="text-[#1f1e1e] text-xl pt-4 pb-2 px-6 font-bricolage font-medium">
          {NewsTitle}
        </h1>
        <h3 className="text-[#212121] text-xs py-1 px-6 font-opensans font-normal">
          Published {NewsDate}
        </h3>
        <p className="mt-2 line-clamp-4 text-sm leading-6 text-[#212121] px-6 font-opensans font-normal">
          {NewsContent}
        </p>
      </div>
      <div className="flex flex-col h-full mt-4 justify-end">
        <div className="pb-8">
          <Link
            to={`/allnews/${id}`}
            className="text-sm font-opensans font-normal text-[#212121] underline pb-2 px-6"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default News;
