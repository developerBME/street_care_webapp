import React from "react";
import Landing from "../HomePage/Landing";

function Contact() {
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className="sm:w-[768px] m-3 lg:mx-40 mt-32 mb-8 rounded-2xl bg-white text-black ">
          {" "}
          <div className="p-4 md:py-[100px] md:px-[128px] ">
            <div>
              <div className="text-neutral-900 text-3xl md:text-[45px] mb-[32px] font-medium font-dmsans leading-[52px]">Have Something for us?</div>
              <div className="text-neutral-900 text-base mb-[24px] font-normal font-dmsans leading-normal tracking-wide">We are constantly looking for ways to help our cause and support. If you have any concerns, queries or feedback for us, you can : </div>
              <div className="sm:flex sm:justify-between space-y-4 md:space-y-0 mb-[24px]">
                <div className="space-y-1.5">
                  <div className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">Email us:</div>
                  <div>streetcare@brightmindenrichment.org</div>
                </div>
                <div className="space-y-1.5">
                  <div className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">Call us</div>
                  <div>(702) 907-7390</div>
                </div>
              </div>
            </div>
            <div className="flex items-center mb-[24px]">
              <div className="flex-1 border-t border-neutral-200"></div>
              <div className="mx-4 text-neutral-900 text-sm font-normal font-dmsans leading-snug">or</div>
              <div className="flex-1 border-t border-neutral-200"></div>
            </div>
            <div>
              <div className="text-neutral-900 text-base font-normal font-dmsans leading-normal tracking-wide mb-6">You can share your thoughts by filling this form below.</div>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <p className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">First Name*</p>
                    <input type="text" className="w-full h-12 px-4 py-1 rounded border border-stone-300 justify-start items-center gap-2 inline-flex" placeholder="Enter your first name"/>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">Last Name</p>
                    <input type="text" className="w-full h-12 px-4 py-1 rounded border border-stone-300 justify-start items-center gap-2 inline-flex" placeholder="Enter your last name"/>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">Email Address*</p>
                  <input type='email' className="w-full h-12 px-4 py-1 rounded border border-stone-300 justify-start items-center gap-2 inline-flex" placeholder="name@email.com"/>
                </div>
                <div className="space-y-1.5">
                  <p className="text-zinc-700 text-sm font-medium font-dmsans leading-tight">Message*</p>
                  <textarea type="text" className="w-full p-4 rounded border font-dmsans border-stone-300 justify-start items-center gap-2 inline-flex" placeholder="What would you like to share with us?"></textarea>
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 border rounded-full bg-violet-700 text-[#F8F9F0]"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
