import "../App.css";
import React, { useState, useEffect, useRef } from "react";

import Avatar from "@mui/material/Avatar";

import { FaBars, FaTimes } from "react-icons/fa";
import {
  RiAccountCircleFill,
  RiUserSettingsLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { GiGraduateCap } from "react-icons/gi";

import { AiFillHome } from "react-icons/ai";
import communityicon from "../images/communityicon.png";

import { Link, useNavigate, NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import defaultImage from "../images/default_avatar.svg";

const NavBar = (props) => {
  const [nav, setNav] = useState(false);
  const fAuth = getAuth();
  const fireBaseSignOut = async () => {
    signOut(fAuth)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };
  useEffect(() => {
    console.log(props);
  }, []);
  const links = [
    // {
    //   id: 1,
    //   label: "About",
    //   link: "about",
    // },
    {
      id: 2,
      label: "How to help",
      link: "Howtohelp",
    },
    {
      id: 3,
      label: "Community",
      link: "community",
    },
    {
      id: 4,
      label: "Contact",
      link: "contact",
    },
  ];

  const sideNavLinks = [
    {
      id: 1,
      label: "About",
      link: "about",
    },

    {
      id: 2,
      label: "Contact",
      link: "contact",
    },
  ];

  const dropdownitems = [
    {
      id: 1,
      label: "My Profile",
      link: "/profile",
      icons: RiAccountCircleFill,
    },
    {
      id: 2,
      label: "Account Settings",
      link: "/profile/accsetting",
      icons: RiUserSettingsLine,
    },
    {
      id: 3,
      label: "Log out",
      fireBaseSignOut,
      icons: RiLogoutBoxRLine,
    },
  ];

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef]);

  return (
    <div className="h-full w-full">
      <div className=" z-50 flex justify-between items-center w-full h-[85px]  text-white fixed bg-nav px-2">
        <div onClick={() => navigate("/")} className=" cursor-pointer">
          <h1 className=" text-[28px]  ml-4 font-bricolage font-medium leading-9">
            Street Care
          </h1>
        </div>
        <ul className="hidden items-center md:flex px-2    leading-6">
          {links.map(({ id, link, label }) => (
            <li
              key={id}
              className=" px-6 py-3 text-lg  font-inter font-medium cursor-pointer  
        text-white hover:scale-105 duration-200"
            >
              <Link to={link}>{label}</Link>
            </li>
          ))}
          {/* <li>
            <button class="bg-white hover:bg-yellow-300 text-black text-lg font-inter font-bold py-3 px-6 rounded-full">
              Donate
            </button>
          </li> */}
          {!props.loggedIn && (
            <li
              className=" px-6 py-3 text-lg font-inter font-medium cursor-pointer  
        text-white hover:scale-105 duration-200"
              onClick={() => navigate("/login")}
            >
              Login
            </li>
          )}
          {/*  */}

          {/*  */}
          {props.loggedIn && (
            <li>
              {/*  */}
              <div className="" ref={menuRef}>
                <Avatar
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className="ml-4 mr-4 cursor-pointer"
                  alt="S"
                  src={props.photoUrl || defaultImage}
                  sx={{ width: 58, height: 56 }}
                />

                <div
                  className={`  absolute top-20 right-7 py-4 bg-neutral-100 rounded-2xl  ${
                    open ? " visible " : " invisible"
                  } text-black`}
                >
                  <ul className=" ">
                    {dropdownitems.map((e, i) => {
                      const Icon = e.icons;

                      return (
                        <>
                          <li className=" px-3 cursor-pointer hover:bg-slate-200">
                            <Link
                              to={e.link}
                              onClick={() => {
                                e.fireBaseSignOut();
                              }}
                              className=" w-[200px] h-10 inline-flex font-inter text-base font-normal leading-6 tracking-wide gap-3  items-center"
                            >
                              <Icon size={24} />
                              {e.label}
                            </Link>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/*  */}
            </li>
          )}
        </ul>
        {/* <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div> */}

        {nav && (
          <ul
            className="flex flex-col justify-center items-center
      absolute top-0 left-0 w-full h-screen bg-nav text-white "
          >
            {sideNavLinks.map(({ id, link }) => (
              <li
                key={id}
                className="px-4 cursor-pointer capitalize text-lg font-inter font-medium py-6
        text-white hover:scale-105 duration-200"
              >
                <Link onClick={() => setNav(!nav)} to={link}>
                  {link}
                </Link>
              </li>
            ))}
            <li>
              {/* <button class=" items-stretch bg-white hover:bg-yellow-300 text-black font-inter text-xl font-bold py-3 px-7 rounded-full">
              Donate
            </button> */}
              <div className="w-[328px] h-14 px-8 py-4 bg-white rounded-[100px] border border-white justify-center items-center gap-2.5 inline-flex">
                <div className="text-center text-black text-lg font-bold font-inter leading-normal">
                  Donate
                </div>
              </div>
            </li>
          </ul>
        )}
      </div>
      <div className=" fixed  w-full  block md:hidden z-40 bottom-0">
        <div className="  w-full h-20 px-2 bg-neutral-100 justify-start items-start gap-2 inline-flex mt-auto ">
          <div className="grow shrink basis-0 pt-3 pb-4 flex-col justify-center items-center gap-1 inline-flex">
            <NavLink
              to="/"
              className="aria-[current=page]:bg-purple-200 w-16 h-8 rounded-2xl justify-center py-1 px-5 items-center inline-flex"
            >
              <AiFillHome className="w-6 h-6 text-[#1F0A58]" />
            </NavLink>
            <div className="self-stretch text-center text-zinc-900 text-xs font-semibold font-roboto leading-none tracking-wide">
              Home
            </div>
          </div>
          <div className="grow shrink basis-0 pt-3 pb-4 flex-col justify-center items-center gap-1 inline-flex">
            <NavLink
              to="/community"
              className="aria-[current=page]:bg-purple-200 w-16 h-8 rounded-2xl justify-center py-1 px-5 items-center inline-flex"
            >
              <img src={communityicon} className="w-6 h-6 " />
            </NavLink>
            <div className="self-stretch text-center text-zinc-700 text-xs font-medium font-roboto leading-none tracking-wide">
              Community
            </div>
          </div>
          <div className="grow shrink basis-0 pt-3 pb-4 flex-col justify-center items-center gap-1 inline-flex">
            <NavLink
              to="/howtohelp"
              className="aria-[current=page]:bg-purple-200 w-16 h-8 rounded-2xl justify-center py-1 px-5 items-center inline-flex"
            >
              <GiGraduateCap className="w-6 h-6  text-[#1F0A58]" />
            </NavLink>
            <div className="self-stretch text-center text-zinc-700 text-xs font-medium font-roboto leading-none tracking-wide">
              How to help
            </div>
          </div>
          <div className="grow shrink basis-0 pt-3 pb-4 flex-col justify-center items-center gap-1 inline-flex">
            <NavLink
              to="/profile"
              className="aria-[current=page]:bg-purple-200 w-16 h-8 rounded-2xl justify-center py-1 px-5 items-center inline-flex"
            >
              <RiAccountCircleFill className="w-6 h-6  text-[#1F0A58]" />
            </NavLink>

            <div className="self-stretch text-center text-zinc-700 text-xs font-medium font-roboto leading-none tracking-wide">
              Me
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
