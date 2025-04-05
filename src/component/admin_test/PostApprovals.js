import React, { useState, useEffect,useRef } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import ApprovalCardOutreachEvents from "./ApprovalCardOutreachEvents";
import ApprovalCardVisitlogs from "./ApprovalCardVisitlogs";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import ErrorMessage from "../ErrorMessage";
import infoIcon from "../../images/info_icon.png";
import arrowBack from "../../images/arrowBack.png";
import searchIcon from "../../images/search-icon-PostApproval.png";
import {fetchPendingPosts,fetchTotalCountOfPendingPosts} from "../VisitLogCardService"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


import collectionMapping from "../../utils/firestoreCollections";

const outreachEvents_collection = collectionMapping.outreachEvents;
const visitLogs_collection = collectionMapping.visitLogs;

const PostApprovals = () => {
  const [pendingPosts, setPendingPosts] = useState({
    outreaches: [],
    visitLogs: [],
  });
  const [activeTab, setActiveTab] = useState("outreaches");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  //const [sortOption, setSortOption] = useState('Most Recent');
  const postsPerPage = 6;
  const searchRef = useRef("");
  const [cursorFields,setCursorFields] = useState({"lastVisible":null,"pageSize" : postsPerPage,"direction":"next","pageHistory":[]})
  const [currentPageLength,setCurrentPageLength]=useState(0)
  const [totalPages,setTotalPages] = useState(0)
  const [filterData,setFilterData] = useState({searchValue:"",sortBy:"Most Recent"})
  const [pageRecordCount,setPageRecordCount] = useState({"outreachCount":0,"visitLogCount":0})
  const [toggleDecision,setToggleDecision] = useState(false)
  useEffect(() => {
    const getPendingPosts = async () => {
      try {
        setIsLoading(true);
          const pageData = await fetchPendingPosts(
            activeTab,
            filterData.searchValue,
            filterData.sortBy,
            cursorFields.lastVisible,
            cursorFields.pageSize,
            cursorFields.direction,
            cursorFields.pageHistory)
          setCursorFields(prev=>({...prev,lastVisible:pageData.lastDoc,pageHistory:pageData.pageHistory}))
          setTotalPages(pageData.totalRecords)
          if(cursorFields.direction ==="next")setCurrentPageLength((prev)=>prev + pageData.records.length)
          setPendingPosts({[activeTab]:pageData.records});

        setIsError(false);
      } catch (error) {
        console.error("Error fetching pending posts:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    const delayTimer = setTimeout(()=>{
      getPendingPosts();
    },500)
    return ()=>clearTimeout(delayTimer)
  }, [cursorFields.direction,activeTab,filterData.searchValue,filterData.sortBy,toggleDecision]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const handleCardClick = (post, event) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };


  
  const Modal = ({ post, onClose, onAccept, onReject, isVisitLogs }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
        {/* Modal Container */}
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg flex flex-col items-center">
          {/* Back Button */}
          <div className="flex items-center w-full mb-4">
            <img
              src={arrowBack}
              alt="Back"
              className="w-6 h-6 cursor-pointer"
              onClick={onClose} // Clicking on the image closes the modal
            />
            <button
              onClick={onClose}
              className="ml-2 text-sm text-gray-700 font-medium hover:underline"
            >
              Go Back
            </button>
          </div>

          {/* Approval Card */}
          {activeTab === "outreaches" ? (
            <ApprovalCardOutreachEvents
              postData={post}
              userName={post.userName || "Unknown User"}
              onToggleSelect={() => {}}
              isSelected={false}
              isVisitLogs={false}
              selectedButton={false}
              onClick={() => {}}
            />
          ) : (
            <ApprovalCardVisitlogs
              postData={post}
              userName={post.userName || "Unknown User"}
              onToggleSelect={() => {}}
              isSelected={false}
              isVisitLogs={true}
              selectedButton={false}
              onClick={() => {}}
            />
          )}

          {/* Buttons Section */}
          <div className="flex justify-between items-center w-full px-4 pt-4">
            <button
              onClick={onReject}
              className="flex justify-center items-center p-0 gap-2 text-red-600 border border-red-600 rounded-full hover:bg-red-100 transition w-[104px] h-[40px]"
              /*
              flex flex-col justify-center items-center p-0 gap-2 mx-auto w-[90px] h-[40px] bg-white border border-gray-300 rounded-full flex-none order-0 grow-0 text-red-500*/
            >
              Reject
            </button>
            <button
              onClick={onAccept}
              className="flex justify-center items-center px-6 py-2.5 text-white bg-green-600 rounded-full hover:bg-green-700 transition w-[104px] h-[40px]"
              /**flex flex-row justify-center items-center px-6 py-2 gap-2 w-[104px] h-[40px] bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex-none order-0 self-stretch grow */
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  // Approve selected posts
  const handleApproveSelected = async () => {
    try {
      const collectionName =
        activeTab === "outreaches" ? outreachEvents_collection : visitLogs_collection;

      for (const itemId of selectedItems) {
        await updateDoc(doc(db, collectionName, itemId), {
          approved: true,
          status: "approved",
        });
      }
      resetToFirstPage()
      setToggleDecision(prev=>!prev)
      setSelectedItems([]);
    } catch (error) {
      console.error("Error approving posts:", error);
    }
  };

  

  // Reject selected posts
  const handleRejectSelected = async () => {
    try {
      const collectionName =
        activeTab === "outreaches" ? outreachEvents_collection : visitLogs_collection;

      for (const itemId of selectedItems) {
        await updateDoc(doc(db, collectionName, itemId), {
          approved: false,
          status: "rejected",
        });
      }

      resetToFirstPage()
      setToggleDecision(prev=>!prev)
      setSelectedItems([]);
    } catch (error) {
      console.error("Error rejecting posts:", error);
    }
  };
 


  //Search Function
  // const searchChange = () => {
  //   const searchValue = searchRef.current.value.toLowerCase();
  //   const filtered = {
  //     ...filteredPosts,
  //     [activeTab]: pendingPosts[activeTab].filter(
  //       (x) =>
  //         x.title?.toLowerCase().includes(searchValue) ||
  //         (x.userName && x.userName.toLowerCase().includes(searchValue)) ||
  //         (x.location && x.location.city.toLowerCase().includes(searchValue)) ||
  //         x.description?.toLowerCase().includes(searchValue)
  //     ),
  //   };
  
  //   setFilteredPosts(filtered);
  //   setCurrentPage(1); // Reset to the first page after search
  // };

// Sort By Function
  // const handleSortChange = (event) => {
  //   const selectedOption = event.target.value;
  //   setSortOption(selectedOption);
  
  //   let sortedData = [...filteredPosts[activeTab]];
  
  //   // Determine the correct date field based on the active tab
  //   const dateField = activeTab === "outreaches" ? "eventDate" : "dateTime";
  //   const alphaSortedField = activeTab === "outreaches" ? "title" : "description";
  
  //   if (selectedOption === "Most Recent") {
  //     sortedData.sort((a, b) => {
  //       const dateA = a[dateField]?.seconds ? new Date(a[dateField].seconds * 1000).getTime() : 0;
  //       const dateB = b[dateField]?.seconds ? new Date(b[dateField].seconds * 1000).getTime() : 0;
  //       return dateB - dateA;
  //     });
  //   } else if (selectedOption === "Oldest First") {
  //     sortedData.sort((a, b) => {
  //       const dateA = a[dateField]?.seconds ? new Date(a[dateField].seconds * 1000).getTime() : 0;
  //       const dateB = b[dateField]?.seconds ? new Date(b[dateField].seconds * 1000).getTime() : 0;
  //       return dateA - dateB;
  //     });
  //   } else if (selectedOption === "Alphabetical") {
  //     sortedData.sort((a, b) => {
  //       const valueA = a[alphaSortedField] || ""; // Fallback to an empty string if null/undefined
  //       const valueB = b[alphaSortedField] || ""; // Fallback to an empty string if null/undefined
  //       return valueA.localeCompare(valueB);
  //     });
  //   }
  
  //   setFilteredPosts((prevState) => ({
  //     ...prevState,
  //     [activeTab]: sortedData,
  //   }));
  // };
  
  const resetToFirstPage = () =>{
    setCursorFields({"lastVisible":null,"pageSize" : postsPerPage,"direction":"next","pageHistory":[]})
    setCurrentPageLength(0)
  }

  const handleAccept = async () => {
    try {
      const collectionName =
        activeTab === "outreaches" ? outreachEvents_collection : visitLogs_collection;
      await updateDoc(doc(db, collectionName, selectedPost.id), {
        status: "approved",
      });
      resetToFirstPage()
      setToggleDecision(prev=>!prev)
      setSelectedPost(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error accepting post:", error);
    }
  };

  const handleReject = async () => {
    try {
      const collectionName =
        activeTab === "outreaches" ? outreachEvents_collection : visitLogs_collection;
      await updateDoc(doc(db, collectionName, selectedPost.id), {
        status: "rejected",
      });

      resetToFirstPage()
      setToggleDecision(prev=>!prev)

      setSelectedPost(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error rejecting post:", error);
    }
  };

  // Cancel selection
  const handleCancelSelection = () => {
    setSelectedItems([]);
  };

  // Toggle selection for a post
  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


  useEffect(() => {
    async function fetchPendingPostsCounts(){
      const {outreachCount,visitLogCount} = await fetchTotalCountOfPendingPosts()
      setPageRecordCount({outreachCount:outreachCount,visitLogCount:visitLogCount})
    }
    fetchPendingPostsCounts()
  }, [toggleDecision]);

  // Tab switching logic
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetToFirstPage()
    //setFilterData({searchValue:"",sortBy:"Most Recent"})
  };

  const handleNext = () =>{
    // Reset direction to force an update
  setCursorFields((prev) => ({ ...prev, direction: "" })); 

  // Set it to 'next' after a slight delay
  setTimeout(() => {
    setCursorFields((prev) => ({ ...prev, direction: "next" }));
  }, 0); 
  }
  const handlePrev=()=>{
    //Handling here since I need length of the records one render before
    setCurrentPageLength((prev)=>(prev-pendingPosts[activeTab].length))
    //Reset direction to force an update
    setCursorFields((prev) => ({ ...prev, direction: "" })); 
    setTimeout(() => {
      setCursorFields((prev) => ({ ...prev, direction: "prev" }));
    }, 0); 
  }

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFilterData((prev)=>({...prev,[name]:value}))
    resetToFirstPage()
  }

  // Render pagination buttons with ellipsis style
  const renderPaginationButtons = () => {
    const buttons = [];
    if (currentPageLength > 6) {
      buttons.push(
        <button
          key="prev"
          onClick={() => handlePrev()}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowBack className="w-6 h-6" />
        </button>
      );
    }

    if (currentPageLength < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => handleNext()}
          className="mx-1 px-3 py-1 rounded-full bg-gray-200 text-gray-600"
        >
          <IoIosArrowForward className="w-6 h-6" />
        </button>
      );
    }

    return buttons;
  };


  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-16 rounded-2xl bg-white text-black">
        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
          {/* Headline Section */}
          {/* Page Title */}
          <div className="flex justify-between items-center gap-4 w-full max-w-[1324px] mb-6">
            {/* <!-- Post Approvals Title --> */}
            <p className="font-bricolage font-medium text-xl md:text-[32px] text-[#1F0A58]">
              Post Approvals
            </p>

            {/* <!-- Search and Sort by section --> */}
            <div className="flex justify-end items-center gap-[49px] w-[492px] h-[40px]">
              {/* <!-- Search Input --> */}
              <div className="flex items-center gap-[5px] w-[253px] h-[40px] border border-gray-300 rounded px-2">
                <input
                  type="text"
                  placeholder="Search here..."
                  name="searchValue"
                  id="searchText"
                  onChange={handleChange}
                  ref={searchRef}
                  className="w-full h-full text-sm outline-none"
                />
                <button className="flex items-center justify-center w-[24px] h-[24px] text-gray-500">
                  <img src={searchIcon} alt="Search Icon" className="w-6 h-6" />
                </button>
              </div>

              {/* <!-- Sort By Dropdown --> */}
              <div className="flex items-center gap-[5px] w-[190px] h-[40px]">
                <label
                  htmlFor="sort"
                  className="flex items-center text-sm font-medium text-[#181818]"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  name="sortBy"
                  className="w-[134px] h-[40px] border border-gray-300 rounded bg-white px-3 text-sm"
                  value={filterData.sortBy}
                  onChange={handleChange}
                >
                  <option>Most Recent</option>
                  <option>Oldest First</option>
                  <option>Alphabetical</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-[48px] flex items-center gap-[48px] w-full max-w-[1324px] h-[32px]">
            <p className="font-dm-sans text-[24px] font-medium leading-[32px] tracking-[-0.01em] text-black text-right">
              <span className="text-indigo-600">({pageRecordCount.outreachCount+pageRecordCount.visitLogCount})</span> Posts are
              pending to be published on the live website
            </p>
          </div>

          {/* Top Buttons */}
          {selectedItems.length > 0 && (
            <div className="relative flex justify-between items-center mt-4 bg-[#E4EEEA] p-4 rounded-lg shadow">
              <div>
                <p className="text-gray-600">
                  {selectedItems.length} item(s) selected.
                </p>
              </div>

              <div className="flex space-x-4 items-center">
                {/* Info Button */}
                <div className="relative group">
                  <img
                    src={infoIcon}
                    alt="Info Icon"
                    className="w-6 h-6 cursor-pointer"
                  />
                  <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white text-gray-700 text-xs px-2 py-1 rounded shadow-lg">
                    Action cannot be changed later
                  </div>
                </div>
                <button
                  onClick={handleApproveSelected}
                  className="bg-green-600 text-white px-4 py-2 rounded-[25px] hover:bg-green-700 transition"
                >
                  Approve Selected
                </button>
                <button
                  onClick={handleRejectSelected}
                  className="bg-white-600 text-red-500 border border-red-500 px-4 py-2 rounded-[25px]  hover:text-red-700 transition"
                >
                  Reject Selected
                </button>
                <button
                  onClick={handleCancelSelection}
                  className="bg-gray-400 text-white px-4 py-2 rounded-[25px] hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="pt-4 pb-3">
            <div className="w-full flex justify-between items-center gap-[48px]">
              {/* Tabs Container */}
              <div className="flex items-start bg-[#EEEEEE] rounded-[16px] w-[373px] h-[48px]">
                <button
                  className={`flex justify-center items-center px-[16px] py-[12px] w-[186.5px] h-[48px] rounded-[16px] font-medium ${
                    activeTab === "outreaches"
                      ? "bg-[#6840E0] text-white" // Active Tab Style
                      : "bg-transparent text-black" // Inactive Tab Style
                  }`}
                  onClick={() => handleTabChange("outreaches")}
                >
                  Outreaches ({pageRecordCount.outreachCount})
                </button>
                <button
                  className={`flex justify-center items-center px-[16px] py-[12px] w-[186.5px] h-[48px] rounded-[16px] font-medium ${
                    activeTab === "visitLogs"
                      ? "bg-[#6840E0] text-white" // Active Tab Style
                      : "bg-transparent text-black" // Inactive Tab Style
                  }`}
                  onClick={() => handleTabChange("visitLogs")}
                >
                  Visit Logs ({pageRecordCount.visitLogCount})
                </button>
              </div>

              {/* Select Items Text */}
              <div className="w-[95px] h-[24px] flex items-center justify-center font-dm-sans text-[16px] font-bold text-[#6840E0]">
                Select Items
              </div>
            </div>
          </div>
          <div className="w-full border-t border-[#C8C8C8]"></div>

          {/* Card Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[30px] mt-[20px]">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
          ) : isError ? (
            <ErrorMessage message="Error loading pending posts. Please try again." />
          ) : (
            <>
              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[20px] gap-y-[30px] mt-[20px]">
                {pendingPosts[activeTab] && pendingPosts[activeTab].map((post) =>
                  activeTab === "outreaches" ? (
                    <ApprovalCardOutreachEvents
                      key={post.id}
                      postData={post}
                      onToggleSelect={toggleSelect}
                      isSelected={selectedItems.includes(post.id)}
                      isVisitLogs={false}
                      selectedButton={true}
                      onClick={() => handleCardClick(post)}
                    />
                  ) : (
                    <ApprovalCardVisitlogs
                      key={post.id}
                      postData={post}
                      onToggleSelect={toggleSelect}
                      isSelected={selectedItems.includes(post.id)}
                      isVisitLogs={true}
                      selectedButton={true}
                      onClick={() => handleCardClick(post)}
                    />
                  )
                )}
              </div>

              {/* Pagination */}
              <div className="mt-[20px] w-full flex justify-between items-center">
                <p className="text-gray-600">
                  Showing {currentPageLength} of{" "}
                  {totalPages} posts.
                </p>
                {renderPaginationButtons()}
              </div>
            </>
          )}
        </div>
      </div>
      {/* Render Modal */}
      {isModalOpen && (
        <Modal
          post={selectedPost}
          onClose={handleCloseModal}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default PostApprovals;
