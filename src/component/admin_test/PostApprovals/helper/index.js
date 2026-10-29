import collectionMapping from "../../../../utils/firestoreCollections";

export const calculateTotalPosts = ({ outreaches, visitLogs, helpRequests }) =>
  outreaches.length + visitLogs.length + helpRequests.length;

export const createTabs = (pendingPosts) => {
  return [
    {
      key: "outreaches",
      label: `Outreaches (${pendingPosts.outreaches.length})`,
    },
    {
      key: "visitLogs",
      label: `Interaction Logs (${pendingPosts.visitLogs.length})`,
    },
    {
      key: "helpRequests",
      label: `Help Requests (${pendingPosts.helpRequests.length})`,
    },
  ];
};

export const createTabsFromCounts = (counts) => {
  return [
    { key: "outreaches", label: `Outreaches (${counts.outreaches || 0})` },
    { key: "visitLogs", label: `Interaction Logs (${counts.visitLogs || 0})` },
    {
      key: "helpRequests",
      label: `Help Requests (${counts.helpRequests || 0})`,
    },
  ];
};

export const calculateTotalPostsFromCounts = (counts) =>
  (counts.outreaches || 0) +
  (counts.visitLogs || 0) +
  (counts.helpRequests || 0);

const outreachEvents_collection = collectionMapping.outreachEvents;
const interactionLog_collection = collectionMapping.interactionLog;
const helpRequests_collection = collectionMapping.helpRequestsInteractionLog;

export const collectionMap = {
  outreaches: outreachEvents_collection,
  visitLogs: interactionLog_collection,
  helpRequests: helpRequests_collection,
};

export const orderFieldMap = {
  outreaches: "eventDate",
  visitLogs: "lastModifiedTimestamp",
  helpRequests: "lastModifiedTimestamp",
};

// Adding a future tab only requires an entry here; the toolbar and query logic
// consume the same shape and do not contain tab-specific conditionals.
export const postQueryConfig = {
  outreaches: {
    searchFields: ["title", "description", "userName", "location.city", "location.stateAbbv", "location.state", "location.address", "city", "stateAbbv"],
    searchDateFields: ["eventDate"],
    defaultSort: { field: "eventDate", direction: "desc" },
    sortOptions: [
      { field: "eventDate", label: "Event date" },
      { field: "title", label: "Title" },
      { field: "userName", label: "Submitted by" },
    ],
  },
  visitLogs: {
    searchFields: ["description", "userName", "firstName", "lastName", "city", "state", "stateAbbv", "addr1", "location.city", "location.state", "location.stateAbbv", "location.address", "whatGiven"],
    searchDateFields: ["timeStamp", "lastModifiedTimestamp"],
    defaultSort: { field: "lastModifiedTimestamp", direction: "desc" },
    sortOptions: [
      { field: "lastModifiedTimestamp", label: "Last modified" },
      { field: "userName", label: "Submitted by" },
      { field: "city", label: "City" },
    ],
  },
  helpRequests: {
    searchFields: ["firstName", "lastName", "interactionLogFirstName", "additionalDetails", "description", "locationLandmark", "furtherHelpCategory", "userName"],
    searchDateFields: ["timestampOfInteraction", "followUpTimestamp", "lastModifiedTimestamp"],
    defaultSort: { field: "lastModifiedTimestamp", direction: "desc" },
    sortOptions: [
      { field: "lastModifiedTimestamp", label: "Last modified" },
      { field: "firstName", label: "Name" },
      { field: "locationLandmark", label: "Location" },
    ],
  },
};
// userIdMappings according to collection

export const userIdFieldMap = {
  outreaches: "uid",
  interactionLogs: "userId",
  helpRequest: "userId",
};

// need to change visitLogs to interactionLogs at all places.
