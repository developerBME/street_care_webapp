import React from "react";
import bmeLogo from "../../images/bme_logo.png";
import streetCareLogo from "../../images/steet_care_logo.png";
import donation from "../../images/donation.png";
import share from "../../images/share.png";

function About() {
  return (
    <div className="bg-gradient-to-tr from-[#E4EEEA] from-10% via-[#E4EEEA] via-60% to-[#EAEEB5] to-90% bg-fixed">
      <div className="relative flex flex-col items-center ">
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl bg-white text-black ">
          {/* Start */}
          <div className="w-full h-full px-4 py-6 md:p-16 bg-white rounded-[32px] flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="flex-col lg:flex-row justify-start items-center gap-8 md:gap-12 lg:gap-y-[172px] lg:gap-x-[90px] inline-flex">
              <div className="flex-col justify-start items-start gap-5 md:gap-8 inline-flex">
                <div className="text-black text-4xl md:text-[45px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
                  What is Street Care?
                </div>
                <div className="w-full text-[#181818] text-base font-normal font-dmsans leading-normal tracking-wide">
                  Street Care - a platform — built by homelessness and wellness
                  experts — is full of clear, simple tutorials and guidance.{" "}
                  <br />
                  <br />
                  Street Care is an initiative of Bright Mind, a 501(c)(3)
                  nonprofit organization. We are a wellness-based education
                  organization working to foster well-being, tenacity,
                  curiosity, and creativity through community education.
                  Utilizing tech for good, we create programs to help as many
                  people as possible.{" "}
                </div>
              </div>
              <div className="w-full h-fit justify-center lg:justify-end items-center flex">
                <div className="justify-center items-center flex -space-x-5">
                  <img
                    className="w-[150px] h-[150px] rounded-[100px]"
                    src={bmeLogo}
                  />
                  <img
                    className="w-[150px] h-[150px] rounded-[100px]"
                    src={streetCareLogo}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* End */}
        </div>
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          {/* Start */}
          <div className="w-full h-full px-4 py-6 md:p-16 bg-white rounded-[32px] flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="flex-col lg:flex-row justify-start items-center gap-8 md:gap-12 lg:gap-y-[172px] lg:gap-x-[40px] inline-flex">
              <div className="flex-col justify-start items-start gap-5 md:gap-8 inline-flex">
                <div className="text-black text-4xl md:text-[45px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
                  How does Street Care help?
                </div>
                <div className="w-full text-[#181818] text-base font-normal font-dmsans leading-normal tracking-wide">
                  With our expanding series of informational materials and
                  instructional videos, and our mobile app, you and other Street
                  Care volunteers can create meaningful connections with the
                  homeless people in your area. For Street Care, wellness
                  encompasses caring for the physical, emotional, social, and
                  intellectual health of a person.
                  <br />
                  <br />
                  Our team has decades of experience working with homeless
                  people.
                  <br />
                  <br />
                  We work extremely hard to help you and those on the streets,
                  offering (and creating!) the most up-to-date tools along with
                  the most tried-and-true ones.
                </div>
              </div>
              <div className="justify-start items-start gap-4 inline-flex">
                <div className="flex-col justify-start items-start gap-4 inline-flex">
                  {/* <div className="w-[162px] h-[140px] bg-[#F3F3F3] rounded-2xl" />
                  <div className="w-[162px] h-[140px] bg-[#F3F3F3] rounded-2xl" /> */}
                  <div className="w-[162px] h-[140px] lg:w-[142px] lg:h-[140px] bg-[#F3F3F3] rounded-2xl" />
                  <div className="w-[162px] h-[140px] lg:w-[142px] lg:h-[140px] bg-[#F3F3F3] rounded-2xl" />
                </div>
                {/* <div className="w-[164px] h-[296px] bg-[#F3F3F3] rounded-2xl" /> */}
                <div className="w-[164px] h-[296px] lg:w-[144px] lg:h-[296px] bg-[#F3F3F3] rounded-2xl" />
              </div>
            </div>
          </div>
          {/* End */}
        </div>
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          {/* Start */}
          <div className="w-full h-full px-4 py-6 md:p-16 bg-white rounded-[32px] flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="w-full flex-col justify-start items-start gap-8 flex">
              <div className="w-full text-black text-4xl md:text-[45px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
                With Street Care you can make a deep impact on the lives of
                those in need, in the following ways:
              </div>

              {/* Grid Start*/}
              <div className="w-full h-full justify-start items-start">
                {/*  */}

                <div className="w-full h-fit justify start items-start grid grid-cols-2 font-bricolage">
                  <div className="grow items-start h-full lg:items-center xl:items-start flex-col rounded-tr-none rounded-tl-2xl shrink basis-0  px-8 py-4 bg-gradient-to-br from-purple-300 to-zinc-200 gap-6 flex">
                    <div className="w-full h-fit justify-start items-start xl:items-center gap-3 xl:gap-6 inline-flex flex-col xl:flex-row">
                      <div className="xl:w-[140px] xl:h-[140px] xl:relative">
                        <div className="xl:w-[140px] xl:h-[140px] xl:left-0 xl:top-0 xl:absolute xl:bg-white xl:rounded-full" />
                        <img
                          className="w-12 h-12 left-0 top-0 rounded-full bg-white xl:w-16 xl:h-16 xl:left-[38px] xl:top-[38px] xl:absolute"
                          src={donation}
                        />
                      </div>

                      <div className="w-fit xl:w-[370px] flex-col justify-start items-start gap-2 flex xl:gap-4 xl:inline-flex">
                        <div className="text-violet-950 text-4xl font-medium font-dmsans leading-[44px]">
                          Give
                        </div>
                        <div className="w-fit text-violet-950 text-base font-normal font-dmsans leading-normal tracking-wide">
                          need-based care items based on our team’s longstanding
                          experience.
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}

                  <div className="grow items-start h-full lg:items-center xl:items-start flex-col rounded-tr-2xl rounded-bl-none shrink basis-0 px-8 py-4 bg-gradient-to-br from-emerald-100 to-neutral-200 justify-start  gap-6 flex">
                    <div className="w-full h-fit justify-start items-start xl:items-center gap-3 xl:gap-6 inline-flex flex-col xl:flex-row">
                      <div className="xl:w-[140px] xl:h-[140px] xl:relative">
                        <div className="xl:w-[140px] xl:h-[140px] xl:left-0 xl:top-0 xl:absolute xl:bg-white xl:rounded-full" />
                        <img
                          className="w-12 h-12 left-0 top-0 rounded-full bg-white xl:w-16 xl:h-16 xl:left-[38px] xl:top-[38px] xl:absolute"
                          src={donation}
                        />
                      </div>

                      <div className="w-fit xl:w-[370px] flex-col justify-start items-start gap-2 flex xl:gap-4 xl:inline-flex">
                        <div className="text-violet-950 text-4xl font-medium font-dmsans leading-[44px]">
                          Help
                        </div>
                        <div className="w-fit text-violet-950 text-base font-normal font-dmsans leading-normal tracking-wide">
                          with Goal Reinforcement (crucial for bringing about
                          transformation)
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                </div>

                <div className="w-full h-fit justify start items-start grid grid-cols-2 font-bricolage">
                  <div className="grow items-start h-full lg:items-center xl:items-start flex-col rounded-tr-none rounded-bl-2xl shrink basis-0 px-8 py-4 bg-gradient-to-br from-red-200 to-neutral-200 justify-start gap-6 flex">
                    <div className="w-full h-fit justify-start items-start xl:items-center gap-3 xl:gap-6 inline-flex flex-col xl:flex-row">
                      <div className="xl:w-[140px] xl:h-[140px] xl:relative">
                        <div className="xl:w-[140px] xl:h-[140px] xl:left-0 xl:top-0 xl:absolute xl:bg-white xl:rounded-full" />
                        <img
                          className="w-12 h-12 left-0 top-0 rounded-full bg-white xl:w-16 xl:h-16 xl:left-[38px] xl:top-[38px] xl:absolute"
                          src={share}
                        />
                      </div>

                      <div className="w-fit xl:w-[370px] flex-col justify-start items-start gap-2 flex xl:gap-4 xl:inline-flex">
                        <div className="text-violet-950 text-4xl font-medium font-dmsans leading-[44px]">
                          Share
                        </div>
                        <div className="w-fit text-violet-950 text-base font-normal font-dmsans leading-normal tracking-wide">
                          wellness and health tips that were created with
                          homeless individuals in mind
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grow items-start h-full lg:items-center xl:items-start flex-col rounded-tr-none rounded-br-2xl shrink basis-0 px-8 py-4 bg-gradient-to-br from-sky-200 to-neutral-200 justify-start  gap-6 flex">
                    <div className="w-full h-fit justify-start items-start xl:items-center gap-3 xl:gap-6 inline-flex flex-col xl:flex-row">
                      <div className="xl:w-[140px] xl:h-[140px] xl:relative">
                        <div className="xl:w-[140px] xl:h-[140px] xl:left-0 xl:top-0 xl:absolute xl:bg-white xl:rounded-full" />
                        <img
                          className="w-12 h-12 left-0 top-0 rounded-full bg-white xl:w-16 xl:h-16 xl:left-[38px] xl:top-[38px] xl:absolute"
                          src={donation}
                        />
                      </div>

                      <div className="w-fit xl:w-[370px] flex-col justify-start items-start gap-2 flex xl:gap-4 xl:inline-flex">
                        <div className="text-violet-950 text-4xl font-medium font-dmsans leading-[44px]">
                          Build
                        </div>
                        <div className="w-fit text-violet-950 text-base font-normal font-dmsans leading-normal tracking-wide">
                          community among volunteers and homeless people,
                          through our interactive framework.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Grid End */}
            </div>
          </div>
          {/* End */}
        </div>
      </div>
    </div>
  );
}

export default About;
