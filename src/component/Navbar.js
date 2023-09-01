import "../App.css";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";

import { Link } from "react-router-dom";
import App from "../App";

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
      link: "How to help",
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

  return (
    <div className=" z-10 flex justify-between items-center w-full h-28  text-white fixed bg-nav px-4">
      <div>
        <h1 className="text-3xl  ml-8 ">Street Care</h1>
      </div>
      <ul className="hidden items-center md:flex px-2">
        {links.map(({ id, link, label }) => (
          <li
            key={id}
            className=" px-6 py-3 text-xl cursor-pointer capitalize 
        text-white hover:scale-105 duration-200"
          >
            <Link to={link}>{label}</Link>
          </li>
        ))}
        <li>
          <button class="bg-white hover:bg-yellow-300 text-black text-xl font-bold py-4 px-8 rounded-full">
            Donate
          </button>
        </li>
        <li>
          <Avatar
            className="ml-4 mr-4 "
            alt="S"
            src="avatar.jpg"
            sx={{ width: 58, height: 56 }}
          />
        </li>
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
              className="px-4 cursor-pointer capitalize text-4xl font-medium py-6
        text-white hover:scale-105 duration-200"
            >
              <Link onClick={() => setNav(!nav)} to={link}>
                {link}
              </Link>
            </li>
          ))}
          <li>
            <button class="bg-white hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-full">
              Donate
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
