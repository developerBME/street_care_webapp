import "../App.css";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";

import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      label: "About",
      link: "About",
    },
    {
      id: 2,
      label: "How to help",
      link: "Howtohelp",
    },
    {
      id: 3,
      label: "Community",
      link: "Community",
    },
    {
      id: 4,
      label: "Contact",
      link: "Contact",
    },
  ];

  // Login state
  const [Loggedin, setLoggedin] = useState(false);
  const navigate = useNavigate();

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
        {!Loggedin && (
          <li
            className=" px-6 py-3 text-lg font-inter font-medium cursor-pointer  
        text-white hover:scale-105 duration-200"
            onClick={() => navigate("/login2")}
          >
            Login
          </li>
        )}
        {Loggedin && (
          <li>
            <Avatar
              className="ml-4 mr-4 "
              alt="S"
              src="avatar.jpg"
              sx={{ width: 58, height: 56 }}
            />
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
