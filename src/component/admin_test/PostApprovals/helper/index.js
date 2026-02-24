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
