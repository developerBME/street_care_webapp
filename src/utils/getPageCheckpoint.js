// Store only the document snapshots needed as Firestore cursor anchors.
// The actual card data should be handled separately by the hook/component.
// Example: [docA, docB, docC] becomes { firstDoc: docA, lastDoc: docC }.
export const getPageCheckpoint = (docs) => {
  if (!docs.length) return null;

  return {
    firstDoc: docs[0],
    lastDoc: docs[docs.length - 1],
  };
};
