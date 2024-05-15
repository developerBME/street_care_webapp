import React from "react";

import { ImFacebook } from "react-icons/im";
import { RiTwitterXLine, RiSnapchatLine, RiThreadsLine } from "react-icons/ri";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";

const iconLinks = [
  {
    id: 1,
    icon: ImFacebook,
    label: "Facebook",
    link: "https://www.facebook.com/StreetCareOrg/",
  },
  {
    id: 2,
    icon: RiTwitterXLine,
    label: "X- Twitter",
    link: "https://twitter.com/StreetCareOrg",
  },
  {
    id: 3,
    icon: BsInstagram,
    label: "Instagram",
    link: "https://www.instagram.com/streetcareorg/",
  },
  {
    id: 4,
    icon: BsYoutube,
    label: "Youtube",
    link: "https://www.youtube.com/channel/UCwWJ049jsblta2leA80IZ7g",
  },
  {
    id: 5,
    icon: AiOutlineLinkedin,
    label: "Linkedin",
    link: "https://www.linkedin.com/company/streetcareorg",
  },
  {
    id: 6,
    icon: FaTiktok,
    label: "Tiktok",
    link: "https://www.tiktok.com/@street_care",
  },
  {
    id: 7,
    icon: RiSnapchatLine,
    label: "Snapchat",
    link: "https://www.snapchat.com/add/street_care",
  },
  {
    id: 8,
    icon: RiThreadsLine,
    label: "Threads",
    link: "https://www.threads.net/@streetcareorg",
  },
];

function Footer() {
  return (
    <footer class="bg-nav mb-20 md:mb-0">
      <div class=" lg:mx-auto  h-fit w-full max-w-screen-xl">
        <div class=" pt-14 pb-6 px-4 grid mx-7 grid-cols-2 gap-y-7 lg:gap-20 items-center lg:grid-cols-5">
          <div className=" col-span-2">
            <h2 class="mb-6 font-bricolage text-6xl text-white dark:text-white">
              Street Care
            </h2>
            <ul class="text-white font-medium">
              <li class="mb-4">
                <div class="flex mt-4 space-x-2 md:mt-0">
                  {iconLinks.map((e, i) => {
                    const Icon = e.icon;
                    return (
                      <React.Fragment key={e.id}>
                        <a
                          key={e.id}
                          href={e.link}
                          class="text-[#36295e] bg-white p-1 rounded-lg hover:scale-125 transition duration-200 "
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Icon size={24} />
                        </a>
                      </React.Fragment>
                    );
                  })}
                </div>
              </li>
              <li class="mb-4">
                <p class=" font-inter text-xs">
                  (c) Bright Mind Enrichment and Schooling 2023 Street Care is a
                  community wellness initiative of Bright Mind, a 501(c)(3)
                  nonprofit organization recipient of GuideStar's Gold, Silver
                  and Bronze Seals of Transparency, plus recognized by Vanguard
                  Charitable. Powered by{" "}
                  <a
                    href="https://www.interserver.net/"
                    className=" hover:underline font-bold   "
                  >
                    interserver.net
                  </a>
                </p>
              </li>
            </ul>
          </div>

          <div className=" col-span-3">
            <div className="grid grid-cols-3">
              <div>
                {/* <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Contact
            </h2> */}
                <ul class="text-white font-medium">
                  {/* <li class="mb-4">
                    <a href="" class="hover:underline">
                      Contact
                    </a>
                  </li> */}
                  <li class="mb-4">
                    <p class="">
                      Location: New York, Florida, Maryland, International
                    </p>
                  </li>
                  <li class="mb-4">
                    <a href="" class="hover:underline">
                      {/* (702) 907 - 7390 */}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                {/* <ul class="text-white font-medium">
                  <li class="mb-4">
                    <a href="#" class="hover:underline">
                      About
                    </a>
                  </li>
                  <li class="mb-4">
                    <a href="#" class="hover:underline">
                      Contact
                    </a>
                  </li>
                  <li class="mb-4">
                    <a href="#" class="hover:underline">
                      Donate
                    </a>
                  </li>
                </ul> */}
              </div>
              <div>
                {/* <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Download
            </h2> */}
                <ul class="text-white font-medium">
                  <li class="mb-4">
                    <a href="/howtohelp" class="hover:underline">
                      How to help
                    </a>
                  </li>
                  <li class="mb-4">
                    <a href="/community" class="hover:underline">
                      Community
                    </a>
                  </li>
                  <li class="mb-4">
                    <a href="/profile" class="hover:underline">
                      My Profile
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr class=" bg-gray-800 mx-4" />
        <div class="px-4 pt-6 pb-12 sm:py-6 bg-nav md:flex md:items-center md:justify-between">
          <span class="text-sm text-gray-300 sm:text-center"></span>
          <div class=" float-right text-white space-x-5 ">Terms & Policies</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
