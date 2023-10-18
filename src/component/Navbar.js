import "../App.css";
import React, { useState, useEffect, useRef } from "react";

import Avatar from "@mui/material/Avatar";

import { FaBars, FaTimes } from "react-icons/fa";
import {
  RiAccountCircleFill,
  RiUserSettingsLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";

import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

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
    {
      id: 1,
      label: "About",
      link: "about",
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
      link: "/profile",
      icons: RiUserSettingsLine,
    },
    {
      id: 3,
      label: "Log out",
      signOut: fireBaseSignOut,
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
        console.log(menuRef.current);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef]);

  return (
    <div className=" z-10 flex justify-between items-center w-full h-[85px]  text-white fixed bg-nav px-2">
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
        <li>
          <button class="bg-white hover:bg-yellow-300 text-black text-lg font-inter font-bold py-3 px-6 rounded-full">
            Donate
          </button>
        </li>
        {!props.loggedIn && (
          <li
            className=" px-6 py-3 text-lg font-inter font-medium cursor-pointer  
        text-white hover:scale-105 duration-200"
            onClick={() => navigate("/login")}
          >
                <Link to="/login">Login</Link> {/* Test Code - To be removed */}
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
                src="avatar.jpg"
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
                              e.signOut();
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
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul
          className="flex flex-col justify-center items-center
      absolute top-0 left-0 w-full h-screen bg-nav text-white "
        >
          {links.map(({ id, link }) => (
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
  );
};

export default NavBar;
