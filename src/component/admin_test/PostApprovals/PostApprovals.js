import { useCallback, useEffect, useMemo, useState } from "react";
import { collection, query, where } from "firebase/firestore";

import EventCardSkeleton from "../../Skeletons/EventCardSkeleton";
import ErrorMessage from "../../ErrorMessage";
import PostTabs from "./components/PostTabs";
import SearchSort from "./components/SearchSort";
import PostApprovalModal from "./components/PostApprovalModal";
import ApprovalCardOutreachEvents from "../ApprovalCardOutreachEvents";
import SelectionActionsBar from "./components/SelectionActionBar";
import Pagination from "./components/Pagination";
import ApprovalCardVisitlogs from "./components/VisitLogExpandedView";
import ApprovalCardHelpRequests from "./components/HelpRequestExpandedView";
import {
  calculateTotalPostsFromCounts,
  createTabsFromCounts,
  collectionMap,
  orderFieldMap,
  postQueryConfig,
} from "./helper";
import useTabSearchSort from "./hooks/useTabSearchSort";
import usePagination from "../../../hooks/usePagination";
import { getPage } from "../../../services/paginationService";
import { db } from "../../firebase";
import { fetchUserTypeDetails } from "../../EventCardService";

import {
  approveSelectedPosts,
  approveSinglePost,
  rejectSelectedPosts,
  rejectSinglePost,
} from "./helper/postApprovalActions";

import {
  fetchPendingCount,
  fetchPendingSearchPage,
} from "./helper/pendingPostsService";

export default function PostApprovals() {
  // ==========================================================================
  // ------------------------ *** State *** -----------------------------------
  // ==========================================================================
  const postsPerPage = 6;
  const [pendingCounts, setPendingCounts] = useState({
    outreaches: 0,
    visitLogs: 0,
    helpRequests: 0,
  });
  const [activeTab, setActiveTab] = useState("outreaches");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const { queries, effectiveQueries, setQuery } = useTabSearchSort(postQueryConfig);
  const activeQuery = effectiveQueries[activeTab];

  const baseQuery = useMemo(
    () =>
      query(
        collection(db, collectionMap[activeTab]),
        where("status", "==", "pending"),
      ),
    [activeTab],
  );

  const loadApprovalPage = useCallback(
    async (request) => {
      const searchTerm = request.search?.value?.trim() || "";
      const sortField = request.sort?.field || orderFieldMap[activeTab];
      // Alternative sorts must use the enriched dataset even after search is
      // cleared: fields such as userName do not exist on the post documents.
      if (searchTerm || sortField !== orderFieldMap[activeTab]) {
        const result = await fetchPendingSearchPage({
          collectionName: collectionMap[activeTab],
          orderField: orderFieldMap[activeTab],
          sortField,
          sortDirection: request.sort?.direction || "desc",
          searchTerm,
          searchFields: postQueryConfig[activeTab].searchFields,
          searchDateFields: postQueryConfig[activeTab].searchDateFields,
          pageSize: request.pageSize,
          page: request.targetPage + 1,
        });
        return {
          data: result.posts,
          totalRecords: result.total,
          pageCheckpoints: request.checkpoints,
        };
      }

      const result = await getPage({ ...request, search: null });
      const data = await Promise.all(
        result.data.map(async (post) => {
          const userDetails = post.uid || post.userId
            ? await fetchUserTypeDetails(post.uid || post.userId)
            : null;
          return {
            ...post,
            userName: userDetails?.username || "Unknown User",
            userType: userDetails?.type || "",
            photoUrl: userDetails?.photoUrl || "",
          };
        }),
      );
      return { ...result, data };
    },
    [activeTab],
  );

  const { hookState, totalRecords, pageParams, pgTriggerFns } = usePagination({
    baseQuery,
    pageSize: postsPerPage,
    pageLoader: loadApprovalPage,
  });

  // ==========================================================================
  // ------------------------ *** Derived Variables *** -----------------------
  // ==========================================================================
  const tabs = useMemo(
    () => createTabsFromCounts(pendingCounts),
    [pendingCounts],
  );

  const currentPage = pageParams.pgNo + 1;
  const posts = hookState.data || [];
  const totalCountForActiveTab = totalRecords || 0;
  const isLoading = hookState.state === "Loading";
  const isError = hookState.state === "Error";
  const isMissingIndex =
    hookState.error?.code === "failed-precondition" &&
    /index/i.test(hookState.error?.message || "");

  const totalPagesForActiveTab = Math.max(
    Math.ceil(totalCountForActiveTab / postsPerPage),
    1,
  );
  // ==========================================================================
  // -------------------------- *** Effects *** -------------------------------
  // ==========================================================================
  // Tab badges use inexpensive aggregation counts. Page data comes from usePagination.
  useEffect(() => {
    const loadCounts = async () => {
      try {
        const keys = ["outreaches", "visitLogs", "helpRequests"];
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

      } catch (e) {
        console.error("Error loading pending counts:", e);
      }
    };
    loadCounts();
  }, []);

  // Apply the active tab's debounced search and sort as one pagination query.
  useEffect(() => {
    pgTriggerFns.setQuery({
      filters: [],
      search: activeQuery.search ? { value: activeQuery.search } : null,
      sort: {
        field: activeQuery.sortField,
        direction: activeQuery.sortDirection,
      },
    });
  }, [activeQuery.search, activeQuery.sortDirection, activeQuery.sortField, activeTab, pgTriggerFns]);

  // useEffect(() => {
  //   console.log("Posts:", posts);
  // }, [posts]);

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

  const updateActiveQuery = (changes) => {
    setSelectedItems([]);
    setQuery(activeTab, changes);
  };

  // ==========================================================================
  // ------------------------ *** Firestore actions *** -----------------------
  // ==========================================================================
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

      pgTriggerFns.refresh();
    } catch (error) {
      console.error("Error approving posts:", error);
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

      pgTriggerFns.refresh();
    } catch (error) {
      console.error("Error rejecting posts:", error);
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

      pgTriggerFns.refresh();
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

      pgTriggerFns.refresh();
    } catch (error) {
      console.error("Error rejecting post:", error);
    }
  };

  const handlePageChange = async (targetPage) => {
    if (targetPage === currentPage) return;
    if (targetPage < 1) return;
    if (targetPage > totalPagesForActiveTab) return;
    setSelectedItems([]);
    pgTriggerFns.getPage(targetPage - 1);
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
            <SearchSort
              search={queries[activeTab].search}
              onSearchChange={(search) => updateActiveQuery({ search })}
              sortField={queries[activeTab].sortField}
              sortDirection={queries[activeTab].sortDirection}
              sortOptions={postQueryConfig[activeTab].sortOptions}
              onSortFieldChange={(sortField) => updateActiveQuery({ sortField })}
              onSortDirectionChange={(sortDirection) =>
                updateActiveQuery({ sortDirection })
              }
            />
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

        {isLoading ? (
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
          <ErrorMessage
            displayName="posts"
            message={isMissingIndex
              ? "Posts cannot load until the required Firestore index is ready."
              : undefined}
          />
        ) : (
          <>
            <div className="mt-5 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const commonProps = {
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
                      key={post.id}
                      isVisitLogs={false}
                    />
                  );
                }

                if (activeTab === "visitLogs") {
                  return (
                    <ApprovalCardVisitlogs
                      {...commonProps}
                      key={post.id}
                      isVisitLogs={true}
                    />
                  );
                }

                return (
                  <ApprovalCardHelpRequests {...commonProps} key={post.id} />
                );
              })}
            </div>

            <div className="mt-5 flex w-full items-center justify-between">
              <p className="text-gray-600">
                {isLoading
                  ? `Loading page ${currentPage}...`
                  : `Showing ${posts.length} of ${totalCountForActiveTab} posts.`}
              </p>

              <Pagination
                totalItems={totalCountForActiveTab}
                itemsPerPage={postsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                canJumpToPage={(page) =>
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
