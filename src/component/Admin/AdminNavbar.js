import "../App.css";
import React, { useState, useEffect, useRef } from "react";

import Avatar from "@mui/material/Avatar";

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
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import CustomButton from "../component/Buttons/CustomButton";

const AdminNavbar = (props) => {
  const [nav, setNav] = useState(false);
  const fAuth = getAuth();
  const navigate = useNavigate();
  const fireBaseSignOut = async () => {
    signOut(fAuth)
      .then(() => {
        console.log("success");
        props.setUser(null);
        navigate("/login");
        props.setLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  const links = [
    {
      id: 1,
      label: "About",
      link: "/",
    },
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
      link: "/profile/profilesettings",
      icons: RiUserSettingsLine,
    },
    {
      id: 3,
      label: "Log out",
      fireBaseSignOut,
      icons: RiLogoutBoxRLine,
    },
  ];

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
     <div className="h-full w-fit font-dmsans">
       <div className="z-30 w-full flex fixed justify-between items-center h-[80px] text-white  bg-[#1F0A58] px-4">
        <div onClick={() => navigate("/")} className="cursor-pointer flex-nowrap">
          <h1 className="text-[28px] ml-4 font-medium leading-9">Street Care</h1>
        </div>
        {props.loggedIn && (
          <NavLink
            to="/profile"
            className="invisible aria-[current=page]:visible md:aria-[current=page]:hidden md:hidden mx-6 my-3 text-lg font-medium text-white hover:scale-105 hover:text-[#1FCFF0] duration-200"
            onClick={() => {
              fireBaseSignOut();
            }}
            end
          >
            Logout
          </NavLink>
        )}
        <ul className="hidden items-center md:flex px-2 leading-6">
          {links.map(({ id, link, label }) => (
            <li
              key={id}
              className="mx-6 my-3 text-lg font-medium text-white hover:scale-105 hover:text-[#1FCFF0] duration-200"
            >
              <Link to={link}>{label}</Link>
            </li>
          ))}
          <div className="text-purple-800 px-4 py-2 rounded-full text-sm font-medium leading-5 text-center">
            <CustomButton
              label="Donate"
              name="buttondefault"
              onClick={() => {}}
            />
          </div>
          {!props.loggedIn && (
            <li
              className="mx-6 my-3 text-lg font-medium cursor-pointer text-white hover:scale-105 hover:text-[#1FCFF0] duration-200"
              onClick={() => navigate("/login")}
            >
              Login
            </li>
          )}
          {props.loggedIn && (
            <li>
              <div ref={menuRef}>
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
                  className={`absolute top-20 right-7 py-4 bg-neutral-100 rounded-2xl ${open ? "visible" : "invisible"} text-black`}
                >
                  <ul>
                    {dropdownitems.map((e, i) => {
                      const Icon = e.icons;
                      return (
                        <React.Fragment key={e.id}>
                          <li
                            className="px-3 cursor-pointer hover:bg-slate-200"
                            onClick={() => setOpen(false)}
                          >
                            <Link
                              to={e.link}
                              onClick={() => {
                                if (e.id === 3) {
                                  e.fireBaseSignOut();
                                }
                              }}
                              className="w-[200px] h-10 inline-flex text-base font-normal leading-6 tracking-wide gap-3 items-center"
                            >
                              <Icon size={24} />
                              {e.label}
                            </Link>
                          </li>
                        </React.Fragment>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
      <div>
        {nav && (
          <div className="flex flex-col fixed z-40 justify-center items-center w-full h-screen bg-purple-800 text-white">
            <ul>
              {sideNavLinks.map(({ id, link }) => (
                <li
                  key={id}
                  className="px-4 cursor-pointer capitalize text-lg font-medium py-6 text-center text-white hover:scale-105 duration-200"
                >
                  <Link onClick={() => setNav(!nav)} to={link}>
                    {link}
                  </Link>
                </li>
              ))}
              <li>
                <div className="w-[328px] h-14 px-8 py-4 bg-white rounded-full border border-white justify-center items-center inline-flex">
                  <div className="text-center text-black text-lg font-bold leading-normal">
                    Donate
                  </div>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="fixed w-full block md:hidden z-40 bottom-0">
        <div className="w-full h-20 px-2 bg-neutral-100 justify-start items-start gap-2 inline-flex">
          <div className="grow shrink basis-0 pt-3 pb-4 flex-col justify-center items-center gap-1 inline-flex">
            <NavLink
              to="/about"
              className="aria-[current=page]:bg-purple-200 w-16 h-8 rounded-2xl justify-center py-1 px-5 items-center inline-flex"
            >
              <AiFillHome className="w-6 h-6 text-[#1F0A58]" />
            </NavLink>
            <div className="self-stretch text-center text-zinc-900 text-xs font-semibold leading-none tracking-wide">
              About
            </div>
          </div>
          <div className="grow shrink basis-0 pt-3 pb-4 flex-col justify-center items-center gap-1 inline-flex">
            <NavLink
              to="/community"
              className="aria-[current=page]:bg-purple-200 w-16 h-8 rounded-2xl justify-center py-1 px-5 items-center inline-flex"
            >
              <img src={communityicon} className="w-6 h-6" />
            </NavLink>
            <div className="self-stretch text-center text-zinc-700 text-xs font-medium leading-none tracking-wide">
              Community
            </div>
          </div>
          <div className="grow shrink basis-0 pt-3 pb-4 flex-col justify-center items-center gap-1 inline-flex">
            <NavLink
              to="/howtohelp"
              className="aria-[current=page]:bg-purple-200 w-16 h-8 rounded-2xl justify-center py-1 px-5 items-center inline-flex"
            >
              <GiGraduateCap className="w-6 h-6 text-[#1F0A58]" />
            </NavLink>
            <div className="self-stretch text-center text-zinc-700 text-xs font-medium leading-none tracking-wide">
              How to help
            </div>
          </div>
          <div className="grow shrink basis-0 pt-3 pb-4 flex-col justify-center items-center gap-1 inline-flex">
            <NavLink
              to="/contact"
              className="aria-[current=page]:bg-purple-200 w-16 h-8 rounded-2xl justify-center py-1 px-5 items-center inline-flex"
            >
              <AiFillHome className="w-6 h-6 text-[#1F0A58]" />
            </NavLink>
            <div className="self-stretch text-center text-zinc-900 text-xs font-semibold leading-none tracking-wide">
              Contact
            </div>
          </div>
          <div className="grow shrink basis-0 pt-3 pb-4 flex-col justify-center items-center gap-1 inline-flex">
            <NavLink
              to="/profile"
              className="aria-[current=page]:bg-purple-200 w-16 h-8 rounded-2xl justify-center py-1 px-5 items-center inline-flex"
            >
              <RiAccountCircleFill className="w-6 h-6 text-[#1F0A58]" />
            </NavLink>
            <div className="self-stretch text-center text-zinc-700 text-xs font-medium leading-none tracking-wide">
              Me
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
