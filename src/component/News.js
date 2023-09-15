const News = () => {
  return (
    // <div className="mx-auto max-w-8xl px-6 sm:py-10 lg:px-8 p-20 bg-gray-100 rounded-lg h-[550px]">
    <div className="items-center justify-center px-4 py-8 lg:p-28 h-full w-full rounded-2xl bg-[#F7F7F7]">
      <p className="font-bricolage font-medium text-2xl md:text-[45px] text-[#1F0A58]">
        News
      </p>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 mt-6 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <article
          key="123"
          className="flex max-w-2xl flex-col items-start justify-between border-t-4 border-violet-600 bg-white"
        >
          <h1 className="text-black text-xl py-4 px-2 font-bricolage">
            Military Families event for Street Care on Giving Tuesday, 12/1!
          </h1>
          <h3 className="text-black text-xs py-2 px-2 font-bricolage">
            Published Sep 1, 2022
          </h3>

          <p className="mt-5 line-clamp-4 text-sm leading-6 text-gray-600 px-2 font-inter">
            Teams of military families will make care kits for us. Stay tuned.
          </p>
          <a className="mt-5 px-2 text-sm font-inter underline pb-2 cursor-pointer">
            Read More
          </a>
        </article>
        <article
          key="123"
          className="flex max-w-2xl flex-col items-start justify-between border-t-4 border-violet-600  bg-white"
        >
          <h1 className="text-black text-xl py-4 px-2 font-bricolage">
            Thank You to Maryland Team who helps Street Care Monthly!
          </h1>
          <h3 className="text-black text-xs py-2 px-2 font-bricolage">
            Published Jan 18, 2022
          </h3>

          <p className="mt-5 line-clamp-4 text-sm leading-6 text-gray-600 px-2 font-inter">
            Our Maryland Team is out on the streets in the greater Baltimore
            area monthly helping those homeless in need
          </p>
          <a className="mt-5 px-2 text-sm font-inter underline pb-2 cursor-pointer">
            Read More
          </a>
        </article>{" "}
        <article
          key="123"
          className="flex max-w-2xl flex-col items-start justify-between border-t-4 border-violet-600  bg-white"
        >
          <h1 className="text-black text-xl py-4 px-2 font-bricolage">
            Thank You to the United Methodist Church for Grant!
          </h1>
          <h3 className="text-black text-xs py-2 px-2 font-bricolage">
            Published Jan 18, 2022
          </h3>

          <p className="mt-5 text-sm line-clamp-4 leading-6 text-gray-600 px-2 font-inter">
            Thank You to the United Methodist church (Baltimore-Washington DC)
            for rewarding BME Maryland partners with a grant for SC
          </p>
          <a className="mt-5 px-2 text-sm font-inter underline pb-2 cursor-pointer">
            Read More
          </a>
        </article>
      </div>
      <button className="bg-violet-600 rounded-full w-32 px-4 py-3 mt-10 text-white hover:bg-opacity-80 font-inter">
        More News
      </button>
    </div>
  );
};

export default News;
