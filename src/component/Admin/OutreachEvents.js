import React, { useCallback, useEffect, useRef, useState } from "react";
import dummyData from "./dummy.json";
import { IoIosArrowBack, IoIosArrowForward, IoIosSearch } from "react-icons/io";
import {
  IoChevronBackCircle,
  IoChevronBackCircleOutline,
  IoChevronForwardCircle,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";
import { RxCaretSort } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { CiFilter, CiGlobe } from "react-icons/ci";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomButton from "../Buttons/CustomButton";

const initTableHeaders = {
  id: { name: "Sr. No.", sort: false, sorted: 0 },
  volunteer_name: { name: "Volunteer Name", sort: true, sorted: 0 },
  membership_date: { name: "Membership Date", sort: true, sorted: 0 },
  total_entries: { name: "Total Entries", sort: true, sorted: 0 },
  last_entry: { name: "Last Entry", sort: true, sorted: 0 },
  city: { name: "City", sort: true, sorted: 0 },
  state: { name: "State", sort: true, sorted: 0 },
  action: { name: "Action", sort: false, sorted: 0 },
};

const filterValues = {
  "A-E": ["A", "B", "C", "D", "E"],
  "F-J": ["F", "G", "H", "I", "J"],
  "K-P": ["K", "L", "M", "N", "O", "P"],
  "Q-S": ["Q", "R", "S"],
  "T-Z": ["T", "U", "V", "W", "X", "Y", "Z"],
};

const SearchHeader = ({ searchChange, searchRef, filterNames, isMobile }) => {
  const [filter, setFilter] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    filterNames(filter);
  }, [filter, filterNames]);

  return (
    <div className="flex items-center justify-between flex-col md:flex-row">
      <div className="flex items-center text-[28px] md:text-4xl font-bricolage font-medium w-full">
        <CiGlobe className="text-[#6840E0] w-10 h-10 stroke-1" />
        <p className="mx-2.5 leading-7">Outreach Events</p>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="md:mx-8">
          <label className="relative text-gray-400 focus-within:text-gray-600">
            <input
              type="text"
              name="searchText"
              id="searchText"
              placeholder="Search user..."
              ref={searchRef}
              onChange={searchChange}
              className="form-input w-fit md:w-[18rem] lg:w-[16rem] py-3 px-2 border border-[#C8C8C8] placeholder-gray-400 text-[#565656] appearance-none block pr-12 h-10 rounded"
            />
            <IoIosSearch className="w-5 h-5 absolute top-5 transform -translate-y-1/2 right-3 text-[#565656] cursor-pointer" />
          </label>
        </div>
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
              <MenuItem value={0}>All</MenuItem>
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
  );
};

const pageSize = 10;

const Pagination = ({ totalData, pageNumber, pageSize, handlePageChange }) => {
  const totalPages = Math.ceil(totalData / pageSize);
  return (
    <div className="flex justify-between md:justify-end mt-6 items-center">
      {pageNumber === 1 ? (
        <IoChevronBackCircle
          className="w-8 h-8 text-[#565656]"
        />
      ) : (
        <IoChevronBackCircleOutline
          className="w-8 h-8 text-[#565656]"
          onClick={() => handlePageChange(pageNumber - 1)}
        />
      )}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          className={`mx-1 border rounded-full h-8 w-8 ${
            pageNumber === index + 1
              ? "border-[#1F0A58] bg-[#E8DFFD]"
              : "border-[#C8C8C8] bg-[#FFFFFF]"
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      {pageNumber === totalPages ? (
        <IoChevronForwardCircle
          className="w-8 h-8 text-[#565656]"
        />
      ) : (
        <IoChevronForwardCircleOutline
          className="w-8 h-8 text-[#565656]"
          onClick={() => handlePageChange(pageNumber + 1)}
        />
      )}
    </div>
  );
};

const OutreachEvents = (props) => {
  const navigate = useNavigate();
  const searchRef = useRef("");
  const [tableHeaders, setTableHeaders] = useState(initTableHeaders);
  const [outreachData, setOutreachData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const isMobile = useMediaQuery("(max-width:767px)");

  const paginate = useCallback(() => {
    let startIndex = (pageNumber - 1) * pageSize;
    let endIndex = startIndex + pageSize;
    setOutreachData(dummyData.slice(startIndex, endIndex));
  }, [pageNumber]);

  useEffect(() => {
    paginate();
  }, [pageNumber, paginate]);

  const searchChange = (event) => {
    event.preventDefault();
    let searchTerm = event.target.value.toLowerCase();

    setOutreachData(
      searchTerm.length
        ? dummyData
            .filter((item) =>
              item.volunteer_name.toLowerCase().startsWith(searchTerm)
            )
            .slice(0, 10)
        : dummyData.slice(0, 10)
    );
  };

  const filterNames = useCallback((values) => {
    setOutreachData(
      values !== 0
        ? dummyData
            .filter((item) =>
              values.includes(item.volunteer_name.charAt(0).toUpperCase())
            )
            .slice(0, 10)
        : dummyData.slice(0, 10)
    );
  }, []);

  const sortTable = (key) => {
    console.log("key: ", key);
    let sortType = (tableHeaders[key].sorted + 1) % 3;
    setTableHeaders((prev) => ({
      ...initTableHeaders,
      [key]: {
        ...prev[key],
        sorted: sortType,
      },
    }));
    switch (sortType) {
      case 0:
        setOutreachData(dummyData.slice(0, 10));
        break;
      case 1:
        setOutreachData(
          [...dummyData].sort((a, b) => (a[key] > b[key] ? 1 : -1)).slice(0, 10)
        );
        break;
      case 2:
        setOutreachData(
          [...dummyData].sort((a, b) => (a[key] > b[key] ? -1 : 1)).slice(0, 10)
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 lg:mx-40 mt-32 rounded-2xl text-black mb-8">
        <div
          className="flex items-center cursor-pointer mb-4"
          onClick={() => {
            navigate("/");
          }}
        >
          <IoIosArrowBack className="w-6 h-6" />
          <p className="font-bricolage text-xl font-bold leading-7">
            Return to Admin Homepage
          </p>
        </div>
        <div className="px-4 py-8 lg:px-12 h-full w-full rounded-2xl bg-[#F7F7F7] overflow-x-scroll md:overflow-x-auto">
          <SearchHeader
            searchChange={searchChange}
            searchRef={searchRef}
            filterNames={filterNames}
            isMobile={isMobile}
          />
          {isMobile && (
            <Pagination
              totalData={dummyData.length}
              pageNumber={pageNumber}
              pageSize={pageSize}
              handlePageChange={(page) => setPageNumber(page)}
            />
          )}
          {isMobile && (
            <div className="text-sm text-[#444746] mt-4">
              Showing {pageSize} results per page
            </div>
          )}
          <div className="my-8">
            <table className="table-auto w-full text-center border-collapse">
              <thead className="bg-[#E4EEEA] py-4">
                <tr>
                  {Object.keys(tableHeaders).map((key) => (
                    <th
                      key={key}
                      className={`${
                        key === "action"
                          ? "rounded-tr-2xl"
                          : key === "id"
                          ? "border-r rounded-tl-2xl"
                          : "border-r"
                      } border-[#C8C8C8] py-3 px-2 md:px-0`}
                    >
                      <div className="flex justify-center items-center whitespace-nowrap">
                        <p>{tableHeaders[key].name}</p>
                        {tableHeaders[key].sort && (
                          <p className="ml-4">
                            <RxCaretSort
                              className={`w-6 h-6 cursor-pointer ${
                                tableHeaders[key].sorted &&
                                "bg-[#565656] text-[#FFFFFF] border border-[#565656] rounded"
                              }`}
                              onClick={() => sortTable(key)}
                            />
                          </p>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {outreachData &&
                  outreachData.map((item, index) => (
                    <tr key={item.volunteer_name}>
                      <td className="border-r border-b border-[#C8C8C8] whitespace-nowrap py-2">
                        {(pageNumber - 1) * pageSize + index + 1}
                      </td>
                      {Object.keys(item).map((key) => (
                        <td
                          key={key}
                          className={`border-x border-b border-[#C8C8C8] whitespace-nowrap py-2 px-4 ${
                            ["volunteer_name", "city"].includes(key)
                              ? "text-left"
                              : ""
                          }`}
                        >
                          {item[key]}
                        </td>
                      ))}
                      <td className="border-l border-b border-[#C8C8C8] whitespace-nowrap py-2">
                        <CustomButton
                          label={"View"}
                          name="buttonsmallborder"
                          textColor="#6840E0"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {isMobile && (
            <div className="text-sm text-[#444746] my-4">
              Showing {pageSize} results per page
            </div>
          )}
            <Pagination
              totalData={dummyData.length}
              pageNumber={pageNumber}
              pageSize={pageSize}
              handlePageChange={(page) => setPageNumber(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutreachEvents;
