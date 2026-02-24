import { useEffect, useMemo, useState, useRef } from "react";

import EventCardSkeleton from "../../Skeletons/EventCardSkeleton";
import ErrorMessage from "../../ErrorMessage";
import PostTabs from "./components/PostTabs";
import SearchSort from "./components/SearchSort";
import PostApprovalModal from "./components/PostApprovalModal";
import ApprovalCardOutreachEvents from "../ApprovalCardOutreachEvents";
import ApprovalCardVisitlogs from "../ApprovalCardVisitlogs";
import ApprovalCardHelpRequests from "../ApprovalCardHelpRequests";
import SelectionActionsBar from "./components/SelectionActionBar";
import Pagination from "./components/Pagination";

import {
  calculateTotalPostsFromCounts,
  createTabsFromCounts,
  collectionMap,
  orderFieldMap,
} from "./helper";

import {
  approveSelectedPosts,
  approveSinglePost,
  rejectSelectedPosts,
  rejectSinglePost,
} from "./helper/postApprovalActions";

import {
  ensurePageCursor,
  fetchPageWithCursor,
} from "./helper/paginationService";

import {
  fetchPendingCount,
  fetchPendingPage,
} from "./helper/pendingPostsService";

export default function PostApprovals() {
  // ==========================================================================
  // ------------------------ *** State *** -----------------------------------
  // ==========================================================================
  const postsPerPage = 6;
  const [postsByTabByPage, setPostsByTabByPage] = useState({
    outreaches: {},
    visitLogs: {},
    helpRequests: {},
  });
  const [pendingCounts, setPendingCounts] = useState({
    outreaches: 0,
    visitLogs: 0,
    helpRequests: 0,
  });
  const [activeTab, setActiveTab] = useState("outreaches");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPageByTab, setCurrentPageByTab] = useState({
    outreaches: 1,
    visitLogs: 1,
    helpRequests: 1,
  });
  const [cursorByTabByPage, setCursorByTabByPage] = useState({
    outreaches: { 1: null },
    visitLogs: { 1: null },
    helpRequests: { 1: null },
  });
  const latestRequestRef = useRef(0);

  // ==========================================================================
  // ------------------------ *** Derived Variables *** -----------------------
  // ==========================================================================
  const tabs = useMemo(
    () => createTabsFromCounts(pendingCounts),
    [pendingCounts],
  );

  const currentPage = currentPageByTab[activeTab] || 1;

  const posts = postsByTabByPage?.[activeTab]?.[currentPage] || [];

  const totalCountForActiveTab = pendingCounts[activeTab] || 0;

  const hasPage1LoadedForActiveTab = Boolean(
    postsByTabByPage?.[activeTab]?.[1],
  );

  const isCurrentPageCached = Boolean(
    postsByTabByPage?.[activeTab]?.[currentPage],
  );

  const totalPagesForActiveTab = Math.max(
    Math.ceil((pendingCounts[activeTab] || 0) / postsPerPage),
    1,
  );
  // ==========================================================================
  // -------------------------- *** Effects *** -------------------------------
  // ==========================================================================
  // Effect 1
  // On mount
  // 1 fetch true counts for all tabs using aggregation queries
  // 2 fetch the first page for the initial tab only
  useEffect(() => {
    const loadCountsAndInitialTab = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        // list all tabs explicitly so counts are predictable and order stable.
        const keys = ["outreaches", "visitLogs", "helpRequests"];

        // fetch counts in parallel. each call hits Firestore but returns only a count.
        const countsArr = await Promise.all(
          keys.map((key) =>
            fetchPendingCount({
              collectionName: collectionMap[key],
            }),
          ),
        );

        setPendingCounts({
          outreaches: countsArr[0],
          visitLogs: countsArr[1],
          helpRequests: countsArr[2],
        });

        // initial tab. keep it explicit so it does not depend on activeTab initial value.
        const initialKey = "outreaches";

        // fetch only the first page for initialKey.
        // pendingPosts arrays are not intended to include all posts by default.
        const { posts: initialPosts, nextCursor } = await fetchPendingPage({
          collectionName: collectionMap[initialKey],
          orderField: orderFieldMap[initialKey],
          pageSize: postsPerPage,
          cursor: null,
        });
        console.log({ initialPosts });

        setPostsByTabByPage((prev) => ({
          ...prev,
          [initialKey]: { ...(prev[initialKey] || {}), 1: initialPosts },
        }));

        setCursorByTabByPage((prev) => ({
          ...prev,
          [initialKey]: { 1: null, 2: nextCursor || null },
        }));
      } catch (e) {
        console.error(
          "[loadCountsAndInitialTab] Error loading counts or initial posts:",
          e,
        );
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadCountsAndInitialTab();
  }, []);

  // Effect 2
  // When activeTab changes
  useEffect(() => {
    const loadTabIfNeeded = async () => {
      if (hasPage1LoadedForActiveTab) return;

      try {
        setIsLoading(true);
        setIsError(false);

        const { posts: tabPosts, nextCursor } = await fetchPendingPage({
          collectionName: collectionMap[activeTab],
          orderField: orderFieldMap[activeTab],
          pageSize: postsPerPage,
          cursor: null,
        });

        setPostsByTabByPage((prev) => ({
          ...prev,
          [activeTab]: { ...(prev[activeTab] || {}), 1: tabPosts },
        }));

        setCursorByTabByPage((prev) => ({
          ...prev,
          [activeTab]: { 1: null, 2: nextCursor || null },
        }));
      } catch (e) {
        console.error("[loadTabIfNeeded] Error loading tab posts:", e);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadTabIfNeeded();
  }, [activeTab, hasPage1LoadedForActiveTab]);

  // ==========================================================================
  // ------------------------ *** UI handlers *** -----------------------------
  // ==========================================================================
  const onTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedItems([]);
  };

  const handleCardClick = (post) => {
    setSelectedItems([]);
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleCancelSelection = () => {
    setSelectedItems([]);
  };

  // ==========================================================================
  // ------------------------ *** Firestore actions *** -----------------------
  // ==========================================================================
  const resetPaginationAndReloadFirstPage = async (tab) => {
    const requestId = latestRequestRef.current + 1;
    latestRequestRef.current = requestId;

    try {
      setIsLoading(true);
      setIsError(false);

      setCurrentPageByTab((prev) => ({ ...prev, [tab]: 1 }));
      setCursorByTabByPage((prev) => ({ ...prev, [tab]: { 1: null } }));
      setPostsByTabByPage((prev) => ({ ...prev, [tab]: {} }));
      setSelectedItems([]);

      const { posts: firstPagePosts, nextCursor } = await fetchPendingPage({
        collectionName: collectionMap[tab],
        orderField: orderFieldMap[tab],
        pageSize: postsPerPage,
        cursor: null,
      });

      if (latestRequestRef.current !== requestId) return;

      setPostsByTabByPage((prev) => ({
        ...prev,
        [tab]: { 1: firstPagePosts },
      }));

      setCursorByTabByPage((prev) => ({
        ...prev,
        [tab]: { 1: null, 2: nextCursor || null },
      }));
    } catch (e) {
      if (latestRequestRef.current !== requestId) return;
      console.error("Error reloading first page:", e);
      setIsError(true);
    } finally {
      if (latestRequestRef.current !== requestId) return;
      setIsLoading(false);
    }
  };

  const handleApproveSelected = async () => {
    const selectedCount = selectedItems.length;
    if (selectedCount === 0) return;

    try {
      await approveSelectedPosts({
        collectionMap,
        activeTab,
        selectedItems,
      });

      const newCount = await fetchPendingCount({
        collectionName: collectionMap[activeTab],
      });

      setPendingCounts((prev) => ({
        ...prev,
        [activeTab]: newCount,
      }));

      await resetPaginationAndReloadFirstPage(activeTab);
    } catch (error) {
      console.error("Error approving posts:", error);
      setIsError(true);
    }
  };

  const handleRejectSelected = async () => {
    const selectedCount = selectedItems.length;
    if (selectedCount === 0) return;

    try {
      await rejectSelectedPosts({
        collectionMap,
        activeTab,
        selectedItems,
      });

      const newCount = await fetchPendingCount({
        collectionName: collectionMap[activeTab],
      });

      setPendingCounts((prev) => ({
        ...prev,
        [activeTab]: newCount,
      }));

      await resetPaginationAndReloadFirstPage(activeTab);
    } catch (error) {
      console.error("Error rejecting posts:", error);
      setIsError(true);
    }
  };

  const handleAccept = async () => {
    if (!selectedPost?.id) return;

    try {
      await approveSinglePost({
        collectionMap,
        activeTab,
        postId: selectedPost.id,
      });

      setPendingCounts((prev) => ({
        ...prev,
        [activeTab]: Math.max((prev[activeTab] || 0) - 1, 0),
      }));

      setSelectedPost(null);

      await resetPaginationAndReloadFirstPage(activeTab);
    } catch (error) {
      console.error("Error accepting post:", error);
    }
  };

  const handleReject = async () => {
    if (!selectedPost?.id) return;

    try {
      await rejectSinglePost({
        collectionMap,
        activeTab,
        postId: selectedPost.id,
      });

      setPendingCounts((prev) => ({
        ...prev,
        [activeTab]: Math.max((prev[activeTab] || 0) - 1, 0),
      }));

      setSelectedPost(null);

      await resetPaginationAndReloadFirstPage(activeTab);
    } catch (error) {
      console.error("Error rejecting post:", error);
    }
  };

  const handlePageChange = async (targetPage) => {
    const tab = activeTab;
    const currentPage = currentPageByTab[tab] || 1;

    if (targetPage === currentPage) return;
    if (targetPage < 1) return;

    const totalPages = Math.max(
      Math.ceil((pendingCounts[tab] || 0) / postsPerPage),
      1,
    );
    if (targetPage > totalPages) return;

    const cached = postsByTabByPage?.[tab]?.[targetPage];
    if (cached) {
      setIsLoading(false);
      setIsError(false);
      setCurrentPageByTab((prev) => ({ ...prev, [tab]: targetPage }));
      setSelectedItems([]);
      return;
    }

    const requestId = latestRequestRef.current + 1;
    latestRequestRef.current = requestId;
    setCurrentPageByTab((prev) => ({ ...prev, [tab]: targetPage }));
    setSelectedItems([]);
    try {
      setIsLoading(true);
      setIsError(false);

      const baseCursors = cursorByTabByPage[tab] || { 1: null };

      const ensuredCursors = await ensurePageCursor({
        tab,
        targetPage,
        cursors: baseCursors,
        collectionMap,
        orderFieldMap,
        postsPerPage,
        fetchPendingPage,
      });

      if (latestRequestRef.current !== requestId) return;

      const { posts: pagePosts, cursors: finalCursors } =
        await fetchPageWithCursor({
          tab,
          targetPage,
          cursors: ensuredCursors,
          collectionMap,
          orderFieldMap,
          postsPerPage,
          fetchPendingPage,
        });

      if (latestRequestRef.current !== requestId) return;

      setPostsByTabByPage((prev) => ({
        ...prev,
        [tab]: { ...(prev[tab] || {}), [targetPage]: pagePosts },
      }));

      setCursorByTabByPage((prev) => ({ ...prev, [tab]: finalCursors }));
    } catch (e) {
      if (latestRequestRef.current !== requestId) return;
      console.error("Error changing page:", e);
      setIsError(true);
    } finally {
      if (latestRequestRef.current !== requestId) return;
      setIsLoading(false);
    }
  };

  // ==========================================================================
  // ------------------------ *** Renderer *** --------------------------------
  // ==========================================================================
  return (
    <div className="mx-auto mb-16 w-full max-w-6xl px-4">
      <div className="rounded-2xl bg-[#F7F7F7] px-4 py-24 text-black">
        <div className="mb-6 flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bricolage text-xl font-medium text-[#1F0A58] sm:text-4xl">
            Post Approvals
          </p>

          <div className="sm:flex sm:justify-end">
            <SearchSort />
          </div>
        </div>

        <div className="mt-12 flex w-full max-w-5xl items-center">
          <p className="font-dm-sans text-2xl font-medium leading-8 tracking-tight text-black">
            <span className="text-indigo-600">
              ({calculateTotalPostsFromCounts(pendingCounts)})
            </span>{" "}
            Posts are pending to be published on the live website
          </p>
        </div>

        <SelectionActionsBar
          selectedCount={selectedItems.length}
          onApprove={handleApproveSelected}
          onReject={handleRejectSelected}
          onCancel={handleCancelSelection}
        />

        <PostTabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />

        <hr className="w-full border-t border-gray-300" />

        {isLoading && !isCurrentPageCached ? (
          <>
            <div className="mt-5 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </div>
            <div className="mt-5 flex w-full items-center justify-between">
              <p className="text-gray-600">Loading page {currentPage}...</p>
            </div>
          </>
        ) : isError ? (
          <ErrorMessage displayName="posts" />
        ) : (
          <>
            <div className="mt-5 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const commonProps = {
                  key: post.id,
                  postData: post,
                  onToggleSelect: toggleSelect,
                  isSelected: selectedItems.includes(post.id),
                  selectedButton: true,
                  onClick: () => handleCardClick(post),
                };

                if (activeTab === "outreaches") {
                  return (
                    <ApprovalCardOutreachEvents
                      {...commonProps}
                      isVisitLogs={false}
                    />
                  );
                }

                if (activeTab === "visitLogs") {
                  return (
                    <ApprovalCardVisitlogs
                      {...commonProps}
                      isVisitLogs={true}
                    />
                  );
                }

                return <ApprovalCardHelpRequests {...commonProps} />;
              })}
            </div>

            <div className="mt-5 flex w-full items-center justify-between">
              <p className="text-gray-600">
                {isLoading && !isCurrentPageCached
                  ? `Loading page ${currentPage}...`
                  : `Showing ${posts.length} of ${totalCountForActiveTab} posts.`}
              </p>

              <Pagination
                totalItems={pendingCounts[activeTab] || 0}
                itemsPerPage={postsPerPage}
                currentPage={currentPageByTab[activeTab] || 1}
                onPageChange={handlePageChange}
                ccanJumpToPage={(page) =>
                  page >= 1 && page <= totalPagesForActiveTab
                }
              />
            </div>
          </>
        )}
      </div>

      {selectedPost && (
        <PostApprovalModal
          post={selectedPost}
          activeTab={activeTab}
          onClose={handleCloseModal}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}
    </div>
  );
}
