// SelectionActionsBar.jsx
import infoIcon from "../../../../images/info_icon.png";

export default function SelectionActionsBar({
  selectedCount,
  onApprove,
  onReject,
  onCancel,
}) {
  if (selectedCount <= 0) return null;

  return (
    <div className="mt-4 rounded-lg bg-[#E4EEEA] p-4 shadow">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-gray-600 whitespace-nowrap">
          {selectedCount} item(s) selected.
        </p>

        <div className="flex items-start gap-3">
          <div className="group relative shrink-0">
            <img src={infoIcon} alt="Info" className="h-6 w-6 cursor-pointer" />
            <div className="absolute left-0 top-full mt-2 hidden rounded bg-white px-2 py-1 text-xs text-gray-700 shadow-lg group-hover:block">
              Action cannot be changed later
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <button
              type="button"
              onClick={onApprove}
              className="rounded-full bg-green-600 px-4 py-2 text-dark hover:bg-green-700"
            >
              Approve Selected
            </button>

            <button
              type="button"
              onClick={onReject}
              className="rounded-full border border-red-500 px-4 py-2 text-red-500 hover:text-red-700"
            >
              Reject Selected
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="rounded-full bg-gray-400 px-4 py-2 text-dark hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
