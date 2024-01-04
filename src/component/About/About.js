import React from "react";
import bmeLogo from "../../images/bme_logo.png";
import streetCareLogo from "../../images/steet_care_logo.png";
import donation from "../../images/donation.png";
import share from "../../images/share.png";
import bag1 from "../../images/bag1.png";
import bag2 from "../../images/bag2.png";
import tshirt from "../../images/tshirt.png";
import CustomButton from "../Buttons/CustomButton";

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
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          {/* Start */}
          <div className="w-full h-full px-4 py-6 md:p-16 flex-col justify-center items-center gap-6 inline-flex">
            <div className="w-full text-black text-4xl md:text-[45px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
              If this is your first time volunteering, the platform shows you
              how to:{" "}
            </div>
            <div className="justify-start items-start gap-4 grid grid-cols-1 lg:gap-10 lg:grid lg:grid-cols-3">
              <div className="px-4 bg-white rounded-[32px] flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="w-full flex-col justify-start items-start gap-2.5 lg:gap-5 flex">
                  <div className="w-full flex-col justify-start items-start gap-2.5 flex">
                    <div className="w-[100%] h-[164px] bg-gradient-to-br from-purple-300 to-zinc-200 rounded-[32px]">
                      <img
                        className="w-16 h-16 left-[36%] top-[47px] relative"
                        src={donation}
                      />
                    </div>
                  </div>
                  <div className="w-[100%] text-center text-slate-700 text-base font-medium font-dmsans leading-normal">
                    Distribute healthy, hygienic care bags{" "}
                  </div>
                </div>
              </div>
              <div className="px-4 bg-white rounded-[32px] flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="w-full flex-col justify-start items-start gap-2.5 lg:gap-5 flex">
                  <div className="w-full flex-col justify-start items-start gap-2.5 flex">
                    <div className="w-[100%] h-[164px] bg-gradient-to-br from-emerald-100 to-neutral-200 rounded-[32px]">
                      <img
                        className="w-16 h-16 left-[36%] top-[47px] relative"
                        src={donation}
                      />
                    </div>
                  </div>
                  <div className="w-[100%] text-center text-slate-700 text-base font-medium font-dmsans leading-normal">
                    Find areas in your city with the greatest need.
                  </div>
                </div>
              </div>

              <div className="px-4 bg-white rounded-[32px] flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="w-full flex-col justify-start items-start gap-2.5 lg:gap-5 flex">
                  <div className="w-full flex-col justify-start items-start gap-2.5 flex">
                    <div className="w-[100%] h-[164px] bg-gradient-to-br from-sky-200 to-neutral-200 rounded-[32px]">
                      <img
                        className="w-16 h-16 left-[36%] top-[47px] relative"
                        src={donation}
                      />
                    </div>
                  </div>
                  <div className="w-[100%] text-center text-slate-700 text-base font-medium font-dmsans leading-normal">
                    To approach someone in need on the street
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End */}
        </div>
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 rounded-2xl bg-white text-black ">
          {/* Start */}
          <div className="w-full relative rounded-[30px]">
            {/* <div className="h-fit left-[128px] top-[128px] absolute px-4 py-6 md:p-16 flex-col justify-start items-start gap-9 inline-flex"> */}
            <div className="h-fit w-full px-4 py-6 md:p-16 flex-col justify-start items-start gap-9 inline-flex">
              <div className="w-full text-4xl md:text-[45px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
                Meet Our Team
              </div>
              <div className="w-full text-black text-base font-normal font-dmsans leading-normal tracking-wide">
                Street Care is a volunteer-led and community-driven organization
                that supports{" "}
              </div>
              <div className="px-4 pb-4 w-full grid grid-flow-col overflow-x-auto gap-2 xl:grid xl:grid-flow-row xl:grid-cols-3 2xl:grid-cols-4 xl:gap-4">
                {/* <div className="w-full overflow-x-auto justify-start items-start gap-2 inline-flex flex-wrap"> */}
                <div className="w-[260px] flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[340px] relative">
                    <div className="w-[260px] h-[260px] left-0 top-0 absolute bg-slate-900 rounded-tl-[30px] rounded-tr-[30px]" />
                    <div className="w-[260px] h-20 p-4 left-0 top-[260px] absolute bg-gradient-to-br from-purple-300 to-zinc-200 rounded-bl-[30px] rounded-br-[30px] flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="self-stretch text-center text-violet-950 text-xs font-medium font-dmsans leading-[18px] tracking-tight">
                        Executive Director
                      </div>
                      <div className="self-stretch text-center text-violet-950 text-base font-bold font-dmsans leading-normal">
                        Craig Kaufman
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[260px] flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[340px] relative">
                    <div className="w-[260px] h-[260px] left-0 top-0 absolute bg-slate-900 rounded-tl-[30px] rounded-tr-[30px]" />
                    <div className="w-[260px] h-20 p-4 left-0 top-[260px] absolute bg-gradient-to-br from-purple-300 to-zinc-200 rounded-bl-[30px] rounded-br-[30px] flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="self-stretch text-center text-violet-950 text-xs font-medium font-dmsans leading-[18px] tracking-tight">
                        Operation Lead
                      </div>
                      <div className="self-stretch text-center text-violet-950 text-base font-bold font-dmsans leading-normal">
                        Shreyas Shukla
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[260px] flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[340px] relative">
                    <div className="w-[260px] h-[260px] left-0 top-0 absolute bg-slate-900 rounded-tl-[30px] rounded-tr-[30px]" />
                    <div className="w-[260px] h-20 p-4 left-0 top-[260px] absolute bg-gradient-to-br from-purple-300 to-zinc-200 rounded-bl-[30px] rounded-br-[30px] flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="self-stretch text-center text-violet-950 text-xs font-medium font-dmsans leading-[18px] tracking-tight">
                        Developer Lead
                      </div>
                      <div className="self-stretch text-center text-violet-950 text-base font-bold font-dmsans leading-normal">
                        Shreyas Shukla
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[260px] flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[340px] relative">
                    <div className="w-[260px] h-[260px] left-0 top-0 absolute bg-slate-900 rounded-tl-[30px] rounded-tr-[30px]" />
                    <div className="w-[260px] h-20 p-4 left-0 top-[260px] absolute bg-gradient-to-br from-purple-300 to-zinc-200 rounded-bl-[30px] rounded-br-[30px] flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="self-stretch text-center text-violet-950 text-xs font-medium font-dmsans leading-[18px] tracking-tight">
                        UX Design Lead
                      </div>
                      <div className="self-stretch text-center text-violet-950 text-base font-bold font-dmsans leading-normal">
                        May Zhou
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[260px] flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[340px] relative">
                    <div className="w-[260px] h-[260px] left-0 top-0 absolute bg-slate-900 rounded-tl-[30px] rounded-tr-[30px]" />
                    <div className="w-[260px] h-20 p-4 left-0 top-[260px] absolute bg-gradient-to-br from-purple-300 to-zinc-200 rounded-bl-[30px] rounded-br-[30px] flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="self-stretch text-center text-violet-950 text-xs font-medium font-dmsans leading-[18px] tracking-tight">
                        Interaction Design Lead
                      </div>
                      <div className="self-stretch text-center text-violet-950 text-base font-bold font-dmsans leading-normal">
                        Qingyi Li
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[260px] flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[340px] relative">
                    <div className="w-[260px] h-[260px] left-0 top-0 absolute bg-slate-900 rounded-tl-[30px] rounded-tr-[30px]" />
                    <div className="w-[260px] h-20 p-4 left-0 top-[260px] absolute bg-gradient-to-br from-purple-300 to-zinc-200 rounded-bl-[30px] rounded-br-[30px] flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="self-stretch text-center text-violet-950 text-xs font-medium font-dmsans leading-[18px] tracking-tight">
                        Product Manager
                      </div>
                      <div className="self-stretch text-center text-violet-950 text-base font-bold font-dmsans leading-normal">
                        Sachita Shetty
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[260px] flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[340px] relative">
                    <div className="w-[260px] h-[260px] left-0 top-0 absolute bg-slate-900 rounded-tl-[30px] rounded-tr-[30px]" />
                    <div className="w-[260px] h-20 p-4 left-0 top-[260px] absolute bg-gradient-to-br from-purple-300 to-zinc-200 rounded-bl-[30px] rounded-br-[30px] flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="self-stretch text-center text-violet-950 text-xs font-medium font-dmsans leading-[18px] tracking-tight">
                        Front-End Developer Lead
                      </div>
                      <div className="self-stretch text-center text-violet-950 text-base font-bold font-dmsans leading-normal">
                        Nirav Patel
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[260px] flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[340px] relative">
                    <div className="w-[260px] h-[260px] left-0 top-0 absolute bg-slate-900 rounded-tl-[30px] rounded-tr-[30px]" />
                    <div className="w-[260px] h-20 p-4 left-0 top-[260px] absolute bg-gradient-to-br from-purple-300 to-zinc-200 rounded-bl-[30px] rounded-br-[30px] flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="self-stretch text-center text-violet-950 text-xs font-medium font-dmsans leading-[18px] tracking-tight">
                        Front-End Developer
                      </div>
                      <div className="self-stretch text-center text-violet-950 text-base font-bold font-dmsans leading-normal">
                        Vishnu Dut
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[260px] flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[340px] relative">
                    <div className="w-[260px] h-[260px] left-0 top-0 absolute bg-slate-900 rounded-tl-[30px] rounded-tr-[30px]" />
                    <div className="w-[260px] h-20 p-4 left-0 top-[260px] absolute bg-gradient-to-br from-purple-300 to-zinc-200 rounded-bl-[30px] rounded-br-[30px] flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="self-stretch text-center text-violet-950 text-xs font-medium font-dmsans leading-[18px] tracking-tight">
                        Front-End Developer
                      </div>
                      <div className="self-stretch text-center text-violet-950 text-base font-bold font-dmsans leading-normal">
                        Aniket Thumar
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[260px] flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[340px] relative">
                    <div className="w-[260px] h-[260px] left-0 top-0 absolute bg-slate-900 rounded-tl-[30px] rounded-tr-[30px]" />
                    <div className="w-[260px] h-20 p-4 left-0 top-[260px] absolute bg-gradient-to-br from-purple-300 to-zinc-200 rounded-bl-[30px] rounded-br-[30px] flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="self-stretch text-center text-violet-950 text-xs font-medium font-dmsans leading-[18px] tracking-tight">
                        Front-End Developer
                      </div>
                      <div className="self-stretch text-center text-violet-950 text-base font-bold font-dmsans leading-normal">
                        Shivani Pandit
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[260px] flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[340px] relative">
                    <div className="w-[260px] h-[260px] left-0 top-0 absolute bg-slate-900 rounded-tl-[30px] rounded-tr-[30px]" />
                    <div className="w-[260px] h-20 p-4 left-0 top-[260px] absolute bg-gradient-to-br from-purple-300 to-zinc-200 rounded-bl-[30px] rounded-br-[30px] flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="self-stretch text-center text-violet-950 text-xs font-medium font-dmsans leading-[18px] tracking-tight">
                        Front-End Developer
                      </div>
                      <div className="self-stretch text-center text-violet-950 text-base font-bold font-dmsans leading-normal">
                        Vedant Chokshi
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[260px] flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[340px] relative">
                    <div className="w-[260px] h-[260px] left-0 top-0 absolute bg-slate-900 rounded-tl-[30px] rounded-tr-[30px]" />
                    <div className="w-[260px] h-20 p-4 left-0 top-[260px] absolute bg-gradient-to-br from-purple-300 to-zinc-200 rounded-bl-[30px] rounded-br-[30px] flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="self-stretch text-center text-violet-950 text-xs font-medium font-dmsans leading-[18px] tracking-tight">
                        Back-End Developer
                      </div>
                      <div className="self-stretch text-center text-violet-950 text-base font-bold font-dmsans leading-normal">
                        Shailesh Chikne
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[260px] flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[340px] relative">
                    <div className="w-[260px] h-[260px] left-0 top-0 absolute bg-slate-900 rounded-tl-[30px] rounded-tr-[30px]" />
                    <div className="w-[260px] h-20 p-4 left-0 top-[260px] absolute bg-gradient-to-br from-purple-300 to-zinc-200 rounded-bl-[30px] rounded-br-[30px] flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="self-stretch text-center text-violet-950 text-xs font-medium font-dmsans leading-[18px] tracking-tight">
                        Back-End Developer
                      </div>
                      <div className="self-stretch text-center text-violet-950 text-base font-bold font-dmsans leading-normal">
                        Karthik Nautiyal
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[260px] flex-col justify-start items-start inline-flex">
                  <div className="self-stretch h-[340px] relative">
                    <div className="w-[260px] h-[260px] left-0 top-0 absolute bg-slate-900 rounded-tl-[30px] rounded-tr-[30px]" />
                    <div className="w-[260px] h-20 p-4 left-0 top-[260px] absolute bg-gradient-to-br from-purple-300 to-zinc-200 rounded-bl-[30px] rounded-br-[30px] flex-col justify-start items-start gap-1.5 inline-flex">
                      <div className="self-stretch text-center text-violet-950 text-xs font-medium font-dmsans leading-[18px] tracking-tight">
                        Full-Stack Developer
                      </div>
                      <div className="self-stretch text-center text-violet-950 text-base font-bold font-dmsans leading-normal">
                        Samarth Kapuria
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End */}
        </div>
        <div className=" w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-8 mb-8 rounded-2xl bg-white text-black ">
          {/* Start */}
          <div className="w-full h-fit px-4 py-6 md:p-16 bg-white rounded-[32px] flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="w-full flex-col justify-start items-start gap-8 flex">
              <div className="w-full justify-start items-start gap-8 xl:gap-[124px] flex flex-col xl:flex-row">
                <div className="w-[90%] flex-col justify-start items-start gap-8 inline-flex">
                  <div className="text-black text-4xl md:text-[45px] font-medium font-dmsans sm:leading-[44px] md:leading-[52px]">
                    Shop our Merch!{" "}
                  </div>
                  <div className="w-full h-fit text-neutral-900 text-base font-normal font-dmsans leading-normal tracking-wide">
                    Information about how purchasing our merch can support the
                    organization. More information about the merchandise.
                    <br />
                  </div>
                </div>
                {/* <div className="h-fit bg-purple-200 rounded-[100px] flex-col justify-center items-center gap-2 inline-flex">
                  <div className="w-full self-stretch grow shrink basis-0 px-6 py-2.5 justify-center items-center gap-2 inline-flex">
                    <div className="w-full text-center text-neutral-900 text-xs xl:text-sm font-medium font-dmsans leading-tight">
                      Visit the Store
                    </div>
                  </div>
                </div> */}
                <div className="h-fit my-2 flex-col justify-end items-end gap-2 inline-flex">
                  <CustomButton
                    label="Visit the Store"
                    class="w-full text-center text-neutral-900 text-xs xl:text-sm font-medium font-dmsans leading-tight"
                    name="buttonlight"
                    onClick={() => {}}
                  />
                </div>
              </div>
              <div className="px-4 pb-4 w-full grid grid-flow-col overflow-x-auto gap-2 xl:grid xl:grid-flow-row xl:grid-cols-3 xl:gap-4">
                <div className="w-[260px] xl:w-full flex-col justify-start items-start inline-flex">
                  <img className="w-full h-full rounded-[32px]" src={bag1} />
                </div>
                <div className="w-[260px] xl:w-full flex-col justify-start items-start inline-flex">
                  <img className="w-full h-full rounded-[32px]" src={tshirt} />
                </div>
                <div className="w-[260px] xl:w-full flex-col justify-start items-start inline-flex">
                  <img className="w-full h-full rounded-[32px]" src={bag2} />
                </div>
              </div>
            </div>
          </div>
          {/* End */}
        </div>
      </div>
    </div>
  );
}

export default About;
