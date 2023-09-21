const Process = () => {
  return (
    <div className="  items-center justify-center px-4 py-8  lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7] ">
      <p className="font-bricolage font-medium md:text-[30px] text-[25px] lg:text-[45px] text-[#1F0A58]">
        What is the overall process?
      </p>
      <div className="  grid grid-cols-1 gap-8 mt-6 sm:pt-4  lg:max-w-none lg:grid-cols-4 mx-auto">
        <article
          key="4"
          className="flex max-w-2xl flex-col items-start justify-normal border-t-4 border-violet-600 bg-white h-full"
        >
          <h1 className="text-black text-xl pt-4 px-4 font-bricolage font-medium">
            Sign Up/Initiate Group Outreach
          </h1>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 px-4 pb-2 font-inter">
            Teams of military families will make care kits for us. Stay tuned.
          </p>
        </article>
        <article
          key="2"
          className="flex max-w-2xl flex-col items-start justify-normal border-t-4 border-violet-600  bg-white h-fit"
        >
          <h1 className="text-black text-xl pt-4 px-4 font-bricolage font-medium">
            Pack the care bag
          </h1>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 px-4 pb-2 font-inter">
            Teams of military families will make care kits for us. Stay tuned.
          </p>
        </article>{" "}
        <article
          key="2"
          className="flex max-w-2xl flex-col items-start justify-normal border-t-4 border-violet-600  bg-white h-fit"
        >
          <h1 className="text-black text-xl pt-4 px-4 font-bricolage font-medium">
            Go to the outreach
          </h1>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 px-4 pb-2 font-inter">
            Teams of military families will make care kits for us. Stay tuned.
          </p>
        </article>
        <article
          key="4"
          className="flex max-w-2xl flex-col items-start justify-normal border-t-4 border-violet-600 bg-white h-full"
        >
          <h1 className="text-black text-xl pt-4 px-4 font-bricolage font-medium">
            Document your experience
          </h1>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 px-4 pb-2 font-inter">
            Teams of military families will make care kits for us. Stay tuned.
          </p>
        </article>
      </div>
    </div>
  );
};

export default Process;
