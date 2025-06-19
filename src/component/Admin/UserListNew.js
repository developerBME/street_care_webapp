import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FormControl, MenuItem, Select, useMediaQuery } from "@mui/material";
import { CiFilter } from "react-icons/ci";
import UserManagementTable from "./UserManagementTable.js";

const filterValues = {
  Blocked: true,
  Unblocked: false,
};

export default function UserListNew() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:767px)");

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setFilter(event.target.value);
    if (event.target.value === "all") {
      setSearchTerm("");
    }
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim()); // Trim here if needed
    }, 1000); // Debounce delay in ms
  
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl text-black mb-8">
        <div
          className="flex items-center cursor-pointer mb-4"
          onClick={() => {
            navigate("/admin");
          }}
        >
          <IoIosArrowBack className="w-6 h-6" />
          <p className="font-bricolage text-xl font-bold leading-7">
            Return to Admin Homepage
          </p>
        </div>
        <div className="px-4 py-8 lg:px-12 h-full w-full rounded-2xl bg-[#F7F7F7] overflow-x-scroll md:overflow-x-auto">
          <div
            className={`flex justify-between mb-5 ${
              isMobile ? "flex-col" : "items-center"
            }`}
          >
            <h2 className="font-dm-sans font-medium text-4xl text-gray-800 my-2">
              User Management
            </h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search user..."
                onChange={handleSearchChange}
                value={searchTerm}
                className="p-2 rounded border border-gray-300 w-64"
              />
              <div className="flex items-center text-2xl font-bricolage font-medium">
                <label className="hidden md:inline">Filter:</label>
                <FormControl sx={{ m: 1 }}>
                  <Select
                    IconComponent={() =>
                      isMobile ? (
                        <CiFilter
                          className="w-8 h-8 m-1 stroke-1 cursor-pointer"
                          onClick={() => setOpen((prev) => !prev)}
                        />
                      ) : (
                        <IoIosArrowForward
                          className="w-4 h-4 mx-1 cursor-pointer"
                          onClick={() => setOpen((prev) => !prev)}
                        />
                      )
                    }
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    value={filter}
                    label=""
                    onChange={handleChange}
                    sx={{
                      "#demo-controlled-open-select": {
                        paddingRight: 0,
                        paddingTop: "8px",
                        paddingBottom: "8px",
                        paddingLeft: "8px",
                        width: "auto",
                        display: isMobile ? "none" : "block",
                      },
                    }}
                  >
                    <MenuItem value={"all"}>All</MenuItem>
                    {Object.keys(filterValues).map((name) => (
                      <MenuItem key={name} value={filterValues[name]}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <UserManagementTable debouncedSearchTerm={debouncedSearchTerm} filter={filter}/>
        </div>
      </div>
    </div>
  );
}
