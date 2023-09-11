const News = () => {
  return (
    <div className="mx-auto max-w-8xl px-6 sm:py-10 lg:px-8 p-20 bg-gray-100 rounded-lg h-[550px]">
      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl font-bricolage">
        News
      </h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <article
          key="123"
          className="flex max-w-xl flex-col items-start justify-between border-t-4 border-violet-600 bg-white"
        >
          <h1 className="text-black text-2xl py-4 px-2 font-bricolage">
            News Description
          </h1>
          <h3 className="text-black text-xs py-2 px-2 font-bricolage">
            Published Sep 1, 2022
          </h3>

          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 px-2 font-inter">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
          </p>
          <a className="mt-5 px-2 text-sm font-inter underline pb-2 cursor-pointer">
            Read More
          </a>
        </article>
        <article
          key="123"
          className="flex max-w-xl flex-col items-start justify-between border-t-4 border-violet-600  bg-white"
        >
          <h1 className="text-black text-2xl py-4 px-2 font-bricolage">
            News Description
          </h1>
          <h3 className="text-black text-xs py-2 px-2 font-bricolage">
            Published Sep 1, 2022
          </h3>

          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 px-2 font-inter">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
          </p>
          <a className="mt-5 px-2 text-sm font-inter underline pb-2 cursor-pointer">
            Read More
          </a>
        </article>{" "}
        <article
          key="123"
          className="flex max-w-xl flex-col items-start justify-between border-t-4 border-violet-600  bg-white"
        >
          <h1 className="text-black text-2xl py-4 px-2 font-bricolage">
            News Description
          </h1>
          <h3 className="text-black text-xs py-2 px-2 font-bricolage">
            Published Sep 1, 2022
          </h3>

          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 px-2 font-inter">
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
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
