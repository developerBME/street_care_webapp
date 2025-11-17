export const areObjectsEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};
export const getPageNumbersFormat = (windowSize, currPage, lastPage) => {
  const pageNums = new Set();
  pageNums.add(1);
  pageNums.add(lastPage);

  pageNums.add(currPage);
  if (1 <= currPage + 1 && currPage + 1 <= lastPage) pageNums.add(currPage + 1);
  if (1 <= currPage - 1 && currPage - 1 <= lastPage) pageNums.add(currPage - 1);

  let prev = currPage - 1;
  let next = currPage + 1;

  while (pageNums.size < windowSize) {
    if (1 <= prev && prev <= lastPage) pageNums.add(prev);
    if (1 <= next && next <= lastPage) pageNums.add(next);
    prev -= 1;
    next += 1;
  }

  return [...pageNums].sort((a, b) => a - b);
};
