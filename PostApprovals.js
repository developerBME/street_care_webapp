import React, { useState, useEffect, useRef } from "react";
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
import { fetchUserTypeDetails } from "../EventCardService";
import collectionMapping from "../../utils/firestoreCollections";

const outreachEvents_collection = collectionMapping.outreachEvents;
const visitLogsNew_collection = collectionMapping.visitLogsBookNew;

const PostApprovals = () => {
  const [pendingPosts, setPendingPosts] = useState({
    outreaches: [],
    visitLogs: [],
  });
  const [activeTab, setActiveTab] = useState("outreaches");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState({
    outreaches: [],
    visitLogs: [],
  });
  const [sortOption, setSortOption] = useState("Most Recent");
  const postsPerPage = 6;
  const searchRef = useRef("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPendingPosts = async () => {
      try {
        setIsLoading(true);

        // Fetch Outreach Events
        const outreachQuery = query(
          collection(db, outreachEvents_collection),
          where("status", "==", "pending")
        );
        const outreachSnapshot = await getDocs(outreachQuery);
        const outreaches = await Promise.all(
          outreachSnapshot.docs.map(async (doc) => {
            const post = { id: doc.id, ...doc.data() };
            const userDetails = await fetchUserTypeDetails(post.uid);
            return {
              ...post,
              userName: userDetails?.username || "Unknown User",
              userType: userDetails?.type || "",
            };
          })
        );

        // Fetch Visit Logs
        const visitLogQueryNew = query(
          collection(db, visitLogsNew_collection),
          where("status", "==", "pending")
        );
        const visitLogSnapshotNew = await getDocs(visitLogQueryNew);
        const visitLogs = await Promise.all(
          visitLogSnapshotNew.docs.map(async (doc) => {
            const post = { id: doc.id, ...doc.data() };
            const userDetails = await fetchUserTypeDetails(post.uid);
            return {
              ...post,
              userName: userDetails?.username || "Unknown User",
              userType: userDetails?.type || "",
            };
          })
        );

        setPendingPosts({ outreaches, visitLogs });
        setIsError(false);
      } catch (error) {
        console.error("Error fetching pending posts:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingPosts();
  }, []);

  // Modal open
  const handleCardClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Modal close
  const handleCloseModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  // Approve selected posts
  const handleApproveSelected = async () => {
    try {
      const isVisitLog = activeTab === "visitLogs";
      const newCollection = isVisitLog
        ? visitLogsNew_collection
        : outreachEvents_collection;

      for (const itemID of selectedItems) {
        const docRefNew = doc(db, newCollection, itemID);
        try {
          await updateDoc(docRefNew, {
            approved: true,
            status: "approved",
          });
        } catch (error) {
          console.error(`Approval failed for item: ${itemID}`, error);
        }
      }

      const updatedPosts = { ...pendingPosts };
      updatedPosts[activeTab] = pendingPosts[activeTab].filter(
        (post) => !selectedItems.includes(post.id)
      );
      setPendingPosts(updatedPosts);
      setSelectedItems([]);
    } catch (error) {
      console.error("Error approving posts:", error);
    }
  };

  // Reject selected posts
  const handleRejectSelected = async () => {
    try {
      const collectionName =
        activeTab === "outreaches"
          ? outreachEvents_collection
          : visitLogsNew_collection;

      for (const itemId of selectedItems) {
        await updateDoc(doc(db, collectionName, itemId), {
          approved: false,
          status: "rejected",
        });
      }

      const updatedPosts = { ...pendingPosts };
      updatedPosts[activeTab] = pendingPosts[activeTab].filter(
        (post) => !selectedItems.includes(post.id)
      );
      setPendingPosts(updatedPosts);
      setSelectedItems([]);
    } catch (error) {
      console.error("Error rejecting posts:", error);
    }
  };

  // Approve single post from modal
  const handleAccept = async () => {
    try {
      const collectionName =
        activeTab === "outreaches"
          ? outreachEvents_collection
          : visitLogsNew_collection;
      await updateDoc(doc(db, collectionName, selectedPost.id), {
        status: "approved",
      });

      setPendingPosts((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(
          (post) => post.id !== selectedPost.id
        ),
      }));
      handleCloseModal();
    } catch (error) {
      console.error("Error accepting post:", error);
    }
  };

  // Reject single post from modal
  const handleReject = async () => {
    try {
      const collectionName =
        activeTab === "outreaches"
          ? outreachEvents_collection
          : visitLogsNew_collection;
      await updateDoc(doc(db, collectionName, selectedPost.id), {
        status: "rejected",
      });

      setPendingPosts((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(
          (post) => post.id !== selectedPost.id
        ),
      }));
      handleCloseModal();
    } catch (error) {
      console.error("Error rejecting post:", error);
    }
  };

  // Cancel selection
  const handleCancelSelection = () => setSelectedItems([]);

  // Toggle select
  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter posts on search
  const searchChange = () => {
    const searchValue = searchRef.current.value.toLowerCase();
    const filtered = {
      ...filteredPosts,
      [activeTab]: pendingPosts[activeTab].filter(
        (x) =>
          x.title?.toLowerCase().includes(searchValue) ||
          (x.userName && x.userName.toLowerCase().includes(searchValue)) ||
          (x.location &&
            x.location.city &&
            x.location.city.toLowerCase().includes(searchValue)) ||
          (x.city && x.city.toLowerCase().includes(searchValue)) ||
          x.peopleHelpedDescription?.toLowerCase().includes(searchValue)
      ),
    };
    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  // Sort
  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);

    let sortedData = [...filteredPosts[activeTab]];
    const dateField = activeTab === "outreaches" ? "eventDate" : "timeStamp";
    const alphaSortedField =
      activeTab === "outreaches" ? "title" : "peopleHelpedDescription";

    if (selectedOption === "Most Recent") {
      sortedData.sort((a, b) => {
        const dateA = a[dateField]?.seconds
          ? new Date(a[dateField].seconds * 1000).getTime()
          : 0;
        const dateB = b[dateField]?.seconds
          ? new Date(b[dateField].seconds * 1000).getTime()
          : 0;
        return dateB - dateA;
      });
    } else if (selectedOption === "Oldest First") {
      sortedData.sort((a, b) => {
        const dateA = a[dateField]?.seconds
          ? new Date(a[dateField].seconds * 1000).getTime()
          : 0;
        const dateB = b[dateField]?.seconds
          ? new Date(b[dateField].seconds * 1000).getTime()
          : 0;
        return dateA - dateB;
      });
    } else if (selectedOption === "Alphabetical") {
      sortedData.sort((a, b) => {
        const valueA = a[alphaSortedField] || "";
        const valueB = b[alphaSortedField] || "";
        return valueA.localeCompare(valueB);
      });
    }

    setFilteredPosts((prevState) => ({
      ...prevState,
      [activeTab]: sortedData,
    }));
  };

  useEffect(() => {
    setFilteredPosts(pendingPosts);
  }, [pendingPosts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts[activeTab].slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const handleTabChange = (tab) => setActiveTab(tab);

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(pendingPosts[activeTab].length / postsPerPage);
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }

    return (
      <div className="flex items-center space-x-1 text-sm">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#9B82CF] disabled:opacity-50"
        >
          &lt;
        </button>

        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                currentPage === page
                  ? "bg-[#1F0A58] text-white"
                  : "bg-white text-black border border-[#9B82CF]"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#9B82CF] disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    );
  };

  const totalPosts = pendingPosts.outreaches.length + pendingPosts.visitLogs.length;

  const Modal = ({ post, onClose, onAccept, onReject }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col items-center">
          <div className="flex items-center w-full mb-4">
            <img
              src={arrowBack}
              alt="Back"
              className="w-6 h-6 cursor-pointer"
              onClick={onClose}
            />
            <button
              onClick={onClose}
              className="ml-2 text-sm text-gray-700 font-medium hover:underline"
            >
              Go Back
            </button>
          </div>

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

          <div className="flex justify-between items-center w-full px-4 pt-4">
            <button
              onClick={onReject}
              className="flex justify-center items-center p-0 gap-2 text-red-600 border border-red-600 rounded-full hover:bg-red-100 transition w-[104px] h-[40px]"
            >
              Reject
            </button>
            <button
              onClick={onAccept}
              className="flex justify-center items-center px-6 py-2.5 text-white bg-green-600 rounded-full hover:bg-green-700 transition w-[104px] h-[40px]"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-16 rounded-2xl bg-white text-black">
        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
          <div className="flex justify-between items-center gap-4 w-full max-w-[1324px] mb-6">
            <p className="font-bricolage font-medium text-xl md:text-[32px] text-[#1F0A58]">
              Post Approvals
            </p>

            <div className="flex justify-end items-center gap-[49px] w-[492px] h-[40px]">
              <div className="flex items-center gap-[5px] w-[253px] h-[40px] border border-gray-300 rounded px-2">
                <input
                  type="text"
                  placeholder="Search here..."
                  onChange={searchChange}
                  ref={searchRef}
                  className="w-full h-full text-sm outline-none"
                />
                <button className="flex items-center justify-center w-[24px] h-[24px] text-gray-500">
                  <img src={searchIcon} alt="Search Icon" className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center gap-[5px] w-[190px] h-[40px]">
                <label
                  htmlFor="sort"
                  className="flex items-center text-sm font-medium text-[#181818]"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="w-[134px] h-[40px] border border-gray-300 rounded bg-white px-3 text-sm"
                  value={sortOption}
                  onChange={handleSortChange}
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
              <span className="text-indigo-600">({totalPosts})</span> Posts are
              pending to be published on the live website
            </p>
          </div>

          {selectedItems.length > 0 && (
            <div className="relative flex justify-between items-center mt-4 bg-[#E4EEEA] p-4 rounded-lg shadow">
              <div>
                <p className="text-gray-600">{selectedItems.length} item(s) selected.</p>
              </div>

              <div className="flex space-x-4 items-center">
                <div className="relative group">
                  <img src={infoIcon} alt="Info Icon" className="w-6 h-6 cursor-pointer" />
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
                  className="bg-white-600 text-red-500 border border-red-500 px-4 py-2 rounded-[25px] hover:text-red-700 transition"
                >
                  Reject Selected
                </button>
                <button
                  onClick={handleCancelSelection}
                  className="bg-white text-gray-500 px-4 py-2 rounded-[25px] border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 flex space-x-6 w-full max-w-[1324px]">
            <button
              onClick={() => handleTabChange("outreaches")}
              className={`flex-1 py-2 font-medium rounded ${
                activeTab === "outreaches"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
            >
              Outreach Events ({pendingPosts.outreaches.length})
            </button>
            <button
              onClick={() => handleTabChange("visitLogs")}
              className={`flex-1 py-2 font-medium rounded ${
                activeTab === "visitLogs"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
            >
              Interaction Logs ({pendingPosts.visitLogs.length})
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: postsPerPage }).map((_, idx) => (
                <EventCardSkeleton key={idx} />
              ))
            ) : isError ? (
              <ErrorMessage message="Failed to fetch posts. Please try again." />
            ) : currentPosts.length === 0 ? (
              <p>No pending posts found.</p>
            ) : (
              currentPosts.map((post) => (
                <div key={post.id} onClick={() => handleCardClick(post)}>
                  {activeTab === "outreaches" ? (
                    <ApprovalCardOutreachEvents
                      postData={post}
                      userName={post.userName || "Unknown User"}
                      onToggleSelect={() => toggleSelect(post.id)}
                      isSelected={selectedItems.includes(post.id)}
                      isVisitLogs={false}
                      selectedButton={false}
                      onClick={() => handleCardClick(post)}
                    />
                  ) : (
                    <ApprovalCardVisitlogs
                      postData={post}
                      userName={post.userName || "Unknown User"}
                      onToggleSelect={() => toggleSelect(post.id)}
                      isSelected={selectedItems.includes(post.id)}
                      isVisitLogs={true}
                      selectedButton={false}
                      onClick={() => handleCardClick(post)}
                    />
                  )}
                </div>
              ))
            )}
          </div>

          <div className="flex justify-center mt-6">
            {renderPaginationButtons()}
          </div>
        </div>
      </div>

      {isModalOpen && selectedPost && (
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
