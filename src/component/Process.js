const Process = () => {
  return (
    // <div className="mx-auto max-w-8xl px-6 py-20 sm:py-10 lg:px-32 lg:py-24 bg-gray-100 rounded-lg h-[ful]">
    <div className="items-center justify-center px-4 py-8 lg:p-28 h-full w-full rounded-2xl bg-[#F7F7F7]">
      <p className="font-bricolage text-4xl text-[#1F0A58]">
        What is the overall process?
      </p>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 mt-9 sm:pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-4">
        <article
          key="1"
          className="flex max-w-xl flex-col items-start justify-normal border-t-4 border-violet-600 bg-white"
        >
          <h1 className="text-black text-2xl pt-4 px-2 font-bricolage">
            Sign Up/Initiate Group Outreach
          </h1>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 px-2 font-inter">
            Teams of military families will make care kits for us. Stay tuned.
          </p>
        </article>
        <article
          key="2"
          className="flex max-w-xl flex-col items-start justify-normal border-t-4 border-violet-600  bg-white"
        >
          <h1 className="text-black text-2xl pt-4 px-2 font-bricolage">
            Pack the care bag.
          </h1>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 px-2 pb-2 font-inter">
            Teams of military families will make care kits for us. Stay tuned.
          </p>
        </article>{" "}
        <article
          key="3"
          className="flex max-w-xl flex-col items-start justify-normal border-t-4 border-violet-600  bg-white"
        >
          <h1 className="text-black text-2xl pt-4 px-2 font-bricolage">
            Go to the outreach
          </h1>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 px-2 font-inter">
            Teams of military families will make care kits for us. Stay tuned.
          </p>
        </article>
        <article
          key="4"
          className="flex max-w-xl flex-col items-start justify-normal border-t-4 border-violet-600 bg-white"
        >
          <h1 className="text-black text-2xl pt-4 px-2 font-bricolage">
            Document your experience
          </h1>

          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600 px-2 pb-2 font-inter">
            Teams of military families will make care kits for us. Stay tuned.
          </p>
        </article>
      </div>
    </div>
  );
};

export default Process;
