import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import ApprovalCard from "./ApprovalCard";
import EventCardSkeleton from "../Skeletons/EventCardSkeleton";
import ErrorMessage from "../ErrorMessage";
import { fetchPublicVisitLogs } from "../VisitLogCardService";
import infoIcon from "../../images/info_icon.png";

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
          where("approved", "==", false)
        );
        const outreachSnapshot = await getDocs(outreachQuery);
        const outreaches = outreachSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch visit logs
        const visitLogQuery = query(
          collection(db, "personalVisitLog"),
          where("approved", "==", false)
        );
        const visitLogSnapshot = await getDocs(visitLogQuery);
        // const visitLogs = visitLogSnapshot.docs.map((doc) => ({
        //   id: doc.id,
        //   ...doc.data(),
        // }));
        const visitLogs = await fetchPublicVisitLogs();

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

  // Approve selected posts
  const handleApproveSelected = async () => {
    try {
      for (const itemId of selectedItems) {
        const collectionName =
          activeTab === "outreaches" ? "outreachEvents" : "visitLogs";
        await updateDoc(doc(db, collectionName, itemId), { approved: true });
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
      for (const itemId of selectedItems) {
        const collectionName =
          activeTab === "outreaches" ? "outreachEvents" : "visitLogs";
        await updateDoc(doc(db, collectionName, itemId), { approved: false });
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

  // Render pagination buttons with ellipsis style
  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(pendingPosts[activeTab].length / postsPerPage);
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) pages.push(1, 2, 3, "...", totalPages);
    else if (currentPage >= totalPages - 2)
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    else pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);

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
            <span key={index} className="w-8 h-8 flex items-center justify-center">
              ...
            </span>
          ) : (
            <button
              key={page}
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

  return (
    <div className="relative flex flex-col items-center">
      <div className="w-[95%] md:w-[90%] lg:w-[80%] mx-2 mb-16 lg:mx-40 mt-16 rounded-2xl bg-white text-black">
        <div className="items-center justify-center px-4 py-8 lg:p-24 h-full w-full rounded-2xl bg-[#F7F7F7]">
          {/* Page Title */}
          <p className="font-bricolage font-medium text-xl md:text-[32px] text-[#1F0A58]">
            Post Approvals
          </p>

          {/* Top Buttons */}
          <div className="relative flex justify-between items-center mt-4 bg-[#E4EEEA] p-4 rounded-lg shadow">
  <div>
    <p className="text-gray-600">{selectedItems.length} item(s) selected.</p>
  </div>
  {selectedItems.length > 0 && (
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
        className="bg-green-600 text-white px-4 py-2 rounded-[2px] hover:bg-green-700 transition"
      >
        Approve Selected
      </button>
      <button
        onClick={handleRejectSelected}
        className="bg-red-600 text-white px-4 py-2 rounded-[25px] hover:bg-red-700 transition"
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
  )}
</div>



          {/* Tabs */}
          <div className="pt-4 pb-3">
            <div className="w-full flex gap-4 justify-start">
              <button
                className={`px-4 py-2 rounded-full font-medium ${
                  activeTab === "outreaches"
                    ? "bg-[#E0D7EC] text-[#1F0A58]"
                    : "bg-white text-black border border-[#9B82CF]"
                }`}
                onClick={() => setActiveTab("outreaches")}
              >
                Outreaches ({pendingPosts.outreaches.length})
              </button>
              <button
                className={`px-4 py-2 rounded-full font-medium ${
                  activeTab === "visitLogs"
                    ? "bg-[#E0D7EC] text-[#1F0A58]"
                    : "bg-white text-black border border-[#9B82CF]"
                }`}
                onClick={() => setActiveTab("visitLogs")}
              >
                Visit Logs ({pendingPosts.visitLogs.length})
              </button>
            </div>
          </div>

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
                {currentPosts.map((post) => (
                  <ApprovalCard
                    key={post.id}
                    postData={post}
                    onToggleSelect={toggleSelect}
                    isSelected={selectedItems.includes(post.id)}
                    isVisitLogs={activeTab === "visitLogs"}
                  />
                ))}
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
    </div>
  );
};

export default PostApprovals;