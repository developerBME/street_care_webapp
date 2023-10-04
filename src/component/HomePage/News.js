import CustomButton from "../Buttons/CustomButton";

const News = () => {
  return (
    <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
      <p className="font-bricolage font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#1F0A58]">
        News
      </p>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 mt-6 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <article
          key="123"
          className="flex max-w-2xl flex-col items-start justify-normal border-t-4 border-violet-600  bg-white h-full "
        >
          <div className=" h-full">
            <h1 className="text-black text-xl pt-4 pb-2 px-2 font-bricolage">
              Military Families event for Street Care on Giving Tuesday, 12/1!
            </h1>
            <h3 className="text-black text-xs py-1 px-2 font-bricolage">
              Published Sep 1, 2022
            </h3>

            <p className="mt-2 line-clamp-4 text-sm leading-6 text-gray-600 px-2 font-inter">
              Teams of military families will make care kits for us.
            </p>
          </div>
          <div className="flex flex-col h-full ml-2 mt-6 justify-end">
            <a className="  text-sm font-inter underline pb-2 cursor-pointer ">
              Read More
            </a>
          </div>
        </article>
        <article
          key="123"
          className="flex max-w-2xl flex-col items-start justify-normal border-t-4 border-violet-600 bg-white h-full"
        >
          <div className=" h-full">
            <h1 className="text-black text-xl pt-4 pb-2 px-2 font-bricolage">
              Thank You to Maryland Team who helps Street Care Monthly!
            </h1>
            <h3 className="text-black text-xs py-1 px-2 font-bricolage">
              Published Jan 18, 2022
            </h3>

            <p className="mt-2 line-clamp-4 text-sm leading-6 text-gray-600 px-2 font-inter">
              Our Maryland Team is out on the streets in the greater Baltimore
              area monthly helping those homeless in need
            </p>
          </div>
          <div className="flex flex-col h-full ml-2 mt-6 justify-end">
            <a className="text-sm font-inter underline pb-2 cursor-pointer">
              Read More
            </a>
          </div>
        </article>
        <article
          key="123"
          className="flex max-w-2xl flex-col items-start justify-normal border-t-4 border-violet-600 bg-white h-full"
        >
          <div className=" h-full">
            <h1 className="text-black text-xl pt-4 pb-2 px-2 font-bricolage">
              Thank You to the United Methodist Church for Grant!
            </h1>
            <h3 className="text-black text-xs py-1 px-2 font-bricolage">
              Published Jan 18, 2022
            </h3>

            <p className="mt-2 text-sm line-clamp-4 leading-6 text-gray-600 px-2 font-inter">
              Thank You to the United Methodist church (Baltimore-Washington DC)
              for rewarding BME Maryland partners with a grant for SC
            </p>
          </div>
          <div className="flex flex-col h-full ml-2 mt-6 justify-end">
            <a className="mt-5 px-2 text-sm font-inter underline pb-2 cursor-pointer">
              Read More
            </a>
          </div>
        </article>
      </div>
      <div className="mt-16">
        <CustomButton label="More News" name="buttondefault" />
      </div>
    </div>
  );
};

export default News;
