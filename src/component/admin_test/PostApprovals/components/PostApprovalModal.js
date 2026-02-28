import { useEffect } from "react";

import arrowBack from "../../../../images/arrowBack.png";
import ApprovalCardOutreachEvents from "../../ApprovalCardOutreachEvents";
import ApprovalCardHelpRequests from "../../ApprovalCardHelpRequests";
import { VisitLogExpandedView } from "./VisitLogExpandedView";
export default function PostApprovalModal({
  post,
  activeTab,
  onClose,
  onAccept,
  onReject,
}) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!post) return null;

  const userName = post.userName || "Unknown User";
  const noop = () => {};

  const commonCardProps = {
    postData: post,
    selectedButton: false,
    onClick: noop,
  };

  const selectableCardProps = {
    ...commonCardProps,
    userName,
    onToggleSelect: noop,
    isSelected: false,
  };

  let card = <ApprovalCardHelpRequests {...commonCardProps} />;

  if (activeTab === "outreaches") {
    card = (
      <ApprovalCardOutreachEvents
        {...selectableCardProps}
        isVisitLogs={false}
      />
    );
  } else if (activeTab === "visitLogs") {
    card = (
      <VisitLogExpandedView
        {...selectableCardProps}
        userImage={post.userImage}
        isVisitLogs={true}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex w-full items-center">
          <button type="button" onClick={onClose} className="flex items-center">
            <img src={arrowBack} alt="Go back" className="h-6 w-6" />
            <span className="ml-2 text-sm font-medium text-gray-700 hover:underline">
              Go Back
            </span>
          </button>
        </div>

        {card}

        <div className="flex w-full justify-between px-4 pt-4">
          <button
            type="button"
            onClick={onReject}
            className="h-10 w-24 rounded-full border border-red-600 p-2 text-red-600 hover:bg-red-100"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="h-10 w-24 rounded-full bg-green-600 text-white hover:bg-green-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
