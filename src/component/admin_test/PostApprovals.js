import React, { useState, useEffect } from "react";
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
import { fetchPublicVisitLogs } from "../VisitLogCardService";
import infoIcon from "../../images/info_icon.png";
import arrowBack from "../../images/arrowBack.png";
import searchIcon from "../../images/search-icon-PostApproval.png";
import { fetchUserDetails, fetchUserTypeDetails } from "../EventCardService";

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
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPendingPosts = async () => {
      try {
        setIsLoading(true);

        // Fetch outreaches
        const outreachQuery = query(
          collection(db, "outreachEvents"),
          where("status", "==", "pending")
        );
        const outreachSnapshot = await getDocs(outreachQuery);
        const outreaches = await Promise.all(
          outreachSnapshot.docs.map(async (doc) => {
            const post = { id: doc.id, ...doc.data() };

            // Fetch userName using uid
            const userDetails = await fetchUserTypeDetails(post.uid);
            return {
              ...post,
              userName: userDetails?.username || "Unknown User",
              userType: userDetails?.type || "",
            };
          })
        );

        // Fetch visit logs
        const visitLogQuery = query(
          collection(db, "personalVisitLog"),
          where("status", "==", "pending")
        );
        const visitLogSnapshot = await getDocs(visitLogQuery);
        const visitLogs = await Promise.all(
          visitLogSnapshot.docs.map(async (doc) => {
            const post = { id: doc.id, ...doc.data() };

            // Fetch userName using uid
            const userDetails = await fetchUserDetails(post.uid);
            return {
              ...post,
              userName: userDetails?.username || "Unknown User",
            };
          })
        );
        // const visitLogs = await fetchPublicVisitLogs();

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
        activeTab === "outreaches" ? "outreachEvents" : "personalVisitLog";

      for (const itemId of selectedItems) {
        await updateDoc(doc(db, collectionName, itemId), {
          approved: true,
          status: "approved",
        });
      }

      // Update state after approval
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
        activeTab === "outreaches" ? "outreachEvents" : "personalVisitLog";

      for (const itemId of selectedItems) {
        await updateDoc(doc(db, collectionName, itemId), {
          approved: false,
          status: "rejected",
        });
      }

      // Update state after rejection
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

  const handleAccept = async () => {
    try {
      const collectionName =
        activeTab === "outreaches" ? "outreachEvents" : "personalVisitLog";
      await updateDoc(doc(db, collectionName, selectedPost.id), {
        status: "approved",
      });

      // Update state to remove the accepted post
      setPendingPosts((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(
          (post) => post.id !== selectedPost.id
        ),
      }));

      setSelectedPost(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error accepting post:", error);
    }
  };

  const handleReject = async () => {
    try {
      const collectionName =
        activeTab === "outreaches" ? "outreachEvents" : "personalVisitLog";
      await updateDoc(doc(db, collectionName, selectedPost.id), {
        status: "rejected",
      });

      // Update state to remove the rejected post
      setPendingPosts((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(
          (post) => post.id !== selectedPost.id
        ),
      }));

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

  // Pagination calculations

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pendingPosts[activeTab].slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Tab switching logic
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Render pagination buttons with ellipsis style
  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(pendingPosts[activeTab].length / postsPerPage);
    const pages = [];

    // Generate pagination buttons
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
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

    const handleTabChange = (tab) => {
      setActiveTab(tab);
      setCurrentPage(1);
    };

    return (
      <div className="flex items-center space-x-1 text-sm">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#9B82CF] disabled:opacity-50"
        >
          &lt;
        </button>

        {/* Page Buttons */}
        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="w-8 h-8 flex items-center justify-center"
            >
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

        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-[#9B82CF] disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    );
  };

  const totalPosts =
    pendingPosts.outreaches.length + pendingPosts.visitLogs.length;

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
                  className="w-[134px] h-[40px] border border-gray-300 rounded bg-white px-3 text-sm"
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
                  Outreaches ({pendingPosts.outreaches.length})
                </button>
                <button
                  className={`flex justify-center items-center px-[16px] py-[12px] w-[186.5px] h-[48px] rounded-[16px] font-medium ${
                    activeTab === "visitLogs"
                      ? "bg-[#6840E0] text-white" // Active Tab Style
                      : "bg-transparent text-black" // Inactive Tab Style
                  }`}
                  onClick={() => handleTabChange("visitLogs")}
                >
                  Visit Logs ({pendingPosts.visitLogs.length})
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
                {currentPosts.map((post) =>
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
                  Showing {indexOfFirstPost + currentPosts.length} of{" "}
                  {pendingPosts[activeTab].length} posts.
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
