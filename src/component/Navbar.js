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

const NavBar = (props) => {
    const [nav, setNav] = useState(false);
    const fAuth = getAuth();
    const navigate = useNavigate();

    const fireBaseSignOut = async() => {
        signOut(fAuth)
            .then(() => {
                console.log("success");
                navigate("/login");
                props.setLoggedIn(false);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const links = [{
            id: 1,
            label: "Home",
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
    ];

    const sideNavLinks = [{
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

    const dropdownitems = [{
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
            link: "/login",
            fireBaseSignOut,
            icons: RiLogoutBoxRLine,
        },
    ];

    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handler = (e) => {
            if (!menuRef?.current?.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return ( <
        div className = "h-full w-full" >
        <
        div className = "z-30 w-full flex fixed justify-between items-center h-16 sm:h-20 md:h-[80px] text-white bg-nav px-2 sm:px-4 md:px-4" >
        <
        div onClick = {
            () => navigate("/")
        }
        className = "cursor-pointer flex-nowrap" >
        <
        h1 className = "text-xl sm:text-2xl md:text-[28px] ml-2 sm:ml-4 md:ml-4 font-bricolage font-medium leading-7 sm:leading-8 md:leading-9" >
        Street Care <
        /h1> < /
        div >

        {
            props.loggedIn && ( <
                NavLink to = "/profile"
                className = "visible md:hidden aria-[current=page]:visible md:aria-[current=page]:hidden mx-2 my-2 sm:my-3 text-sm sm:text-base font-inter font-medium text-white hover:scale-105 hover:text-[#1FCFF0] duration-200"
                onClick = {
                    () => {
                        fireBaseSignOut();
                    }
                }
                end >
                Logout <
                /NavLink>
            )
        }

        <
        ul className = "hidden items-center md:flex px-2 leading-6" > {
            links.map(({ id, link, label }) => ( <
                li key = { id }
                className = "mx-4 lg:mx-6 my-3 text-base lg:text-lg font-inter font-medium text-white hover:scale-105 hover:text-[#1FCFF0] duration-200" >
                <
                Link to = { link } > { label } < /Link> < /
                li >
            ))
        }

        {
            !props.loggedIn && ( <
                li className = "mx-4 lg:mx-6 my-3 text-base lg:text-lg font-inter font-medium cursor-pointer text-white hover:scale-105 hover:text-[#1FCFF0] duration-200"
                onClick = {
                    () => navigate("/login")
                } >
                Login <
                /li>
            )
        }

        { /*  */ } { /*  */ } {
            props.loggedIn && ( <
                li > { /*  */ } <
                div className = ""
                ref = { menuRef } >
                <
                Avatar onClick = {
                    () => {
                        setOpen(!open);
                    }
                }
                className = "ml-3 mr-3 lg:ml-4 lg:mr-4 cursor-pointer"
                alt = "S"
                src = { props.photoUrl || defaultImage }
                sx = {
                    { width: 48, height: 48 }
                }
                />

                <
                div className = { `absolute top-[72px] md:top-20 right-2 md:right-7 py-4 bg-neutral-100 rounded-2xl ${
                    open ? "visible" : "invisible"
                  } text-black w-48 md:w-[200px] z-50` } >
                <
                ul className = "" > {
                    dropdownitems.map((e) => {
                        const Icon = e.icons;

                        return ( <
                            React.Fragment key = { e.id } >
                            <
                            li className = "px-3 cursor-pointer hover:bg-slate-200"
                            onClick = {
                                () => setOpen(false)
                            } >
                            <
                            Link to = { e.link }
                            onClick = {
                                () => {
                                    if (e.id === 3) {
                                        e.fireBaseSignOut();
                                    }
                                }
                            }
                            className = "w-full h-10 inline-flex font-inter text-sm md:text-base font-normal leading-6 tracking-wide gap-3 items-center" >
                            <
                            Icon size = { 20 }
                            /> {e.label} < /
                            Link > <
                            /li> < /
                            React.Fragment >
                        );
                    })
                } <
                /ul> < /
                div > <
                /div> { / * * / } < /
                li >
            )
        } <
        /ul> < /
        div >

        <
        div > {
            nav && ( <
                div className = "flex flex-col fixed z-40 justify-center items-center w-full h-screen bg-nav text-white" >
                <
                ul className = "" > {
                    sideNavLinks.map(({ id, link }) => ( <
                        li key = { id }
                        className = "px-4 cursor-pointer capitalize text-lg font-inter font-medium py-6 text-center text-white hover:scale-105 duration-200" >
                        <
                        Link onClick = {
                            () => setNav(!nav)
                        }
                        to = { link } > { link } <
                        /Link> < /
                        li >
                    ))
                }

                <
                li >
                <
                div className = "w-48 sm:w-56 h-12 sm:h-14 px-6 sm:px-8 py-3 sm:py-4 bg-white rounded-[100px] border border-white justify-center items-center gap-2.5 inline-flex" >
                <
                div className = "text-center text-black text-base sm:text-lg font-bold font-inter leading-normal" >
                Donate <
                /div> < /
                div > <
                /li> < /
                ul > <
                /div>
            )
        } <
        /div>

        <
        div className = "fixed w-full block md:hidden z-40 bottom-0" >
        <
        div className = "w-full h-20 px-2 bg-neutral-100 justify-start items-start gap-2 inline-flex mt-auto" >
        <
        div className = "grow shrink basis-0 pt-3 pb-4 flex-col justify-center items-center gap-1 inline-flex" >
        <
        NavLink to = "/"
        className = "aria-[current=page]:bg-purple-200 w-16 h-8 rounded-2xl justify-center py-1 px-5 items-center inline-flex" >
        <
        AiFillHome className = "w-6 h-6 text-[#1F0A58]" / >
        <
        /NavLink> <
        div className = "self-stretch text-center text-zinc-900 text-xs font-semibold font-roboto leading-none tracking-wide" >
        Home <
        /div> < /
        div >

        <
        div className = "grow shrink basis-0 pt-3 pb-4 flex-col justify-center items-center gap-1 inline-flex" >
        <
        NavLink to = "/community"
        className = "aria-[current=page]:bg-purple-200 w-16 h-8 rounded-2xl justify-center py-1 px-5 items-center inline-flex" >
        <
        img src = { communityicon }
        className = "w-6 h-6"
        alt = "Community" / >
        <
        /NavLink> <
        div className = "self-stretch text-center text-zinc-700 text-xs font-medium font-roboto leading-none tracking-wide" >
        Community <
        /div> < /
        div >

        <
        div className = "grow shrink basis-0 pt-3 pb-4 flex-col justify-center items-center gap-1 inline-flex" >
        <
        NavLink to = "/howtohelp"
        className = "aria-[current=page]:bg-purple-200 w-16 h-8 rounded-2xl justify-center py-1 px-5 items-center inline-flex" >
        <
        GiGraduateCap className = "w-6 h-6 text-[#1F0A58]" / >
        <
        /NavLink> <
        div className = "self-stretch text-center text-zinc-700 text-xs font-medium font-roboto leading-none tracking-wide" >
        How to help <
        /div> < /
        div >

        <
        div className = "grow shrink basis-0 pt-3 pb-4 flex-col justify-center items-center gap-1 inline-flex" >
        <
        NavLink to = "/profile"
        className = "aria-[current=page]:bg-purple-200 w-16 h-8 rounded-2xl justify-center py-1 px-5 items-center inline-flex" >
        <
        RiAccountCircleFill className = "w-6 h-6 text-[#1F0A58]" / >
        <
        /NavLink>

        <
        div className = "self-stretch text-center text-zinc-700 text-xs font-medium font-roboto leading-none tracking-wide" >
        Me <
        /div> < /
        div > <
        /div> < /
        div > <
        /div>
    );
};

export default NavBar;