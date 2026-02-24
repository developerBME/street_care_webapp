export async function ensurePageCursor({
  tab,
  targetPage,
  cursors,
  collectionMap,
  orderFieldMap,
  postsPerPage,
  fetchPendingPage,
}) {
  let nextCursors = cursors || { 1: null };

  for (let p = 1; p < targetPage; p += 1) {
    const nextKey = p + 1;

    const hasKey = Object.prototype.hasOwnProperty.call(nextCursors, nextKey);
    if (hasKey) continue;

    const { nextCursor } = await fetchPendingPage({
      collectionName: collectionMap[tab],
      orderField: orderFieldMap[tab],
      pageSize: postsPerPage,
      cursor: nextCursors[p] ?? null,
    });

    if (nextCursor == null) {
      // no cursor means there is no page p+1
      nextCursors = { ...nextCursors, [nextKey]: null };
      break;
    }

    nextCursors = { ...nextCursors, [nextKey]: nextCursor };
  }

  if (targetPage > 1 && nextCursors[targetPage] == null) {
    throw new Error(`Page ${targetPage} does not exist or cursor is missing`);
  }

  return nextCursors;
}

export async function fetchPageWithCursor({
  tab,
  targetPage,
  cursors,
  collectionMap,
  orderFieldMap,
  postsPerPage,
  fetchPendingPage,
}) {
  if (targetPage > 1 && cursors[targetPage] == null) {
    throw new Error(`Missing cursor for page ${targetPage}`);
  }

  const { posts, nextCursor } = await fetchPendingPage({
    collectionName: collectionMap[tab],
    orderField: orderFieldMap[tab],
    pageSize: postsPerPage,
    cursor: cursors[targetPage] ?? null,
  });

  const updatedCursors =
    nextCursor == null
      ? { ...cursors, [targetPage + 1]: null }
      : { ...cursors, [targetPage + 1]: nextCursor };

  return { posts, cursors: updatedCursors };
}
