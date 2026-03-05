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
    if (prev < 1 && next > lastPage) break;
  }

  return [...pageNums].sort((a, b) => a - b);
};

export const formatTimeStampDate = (firebaseTimestamp) => {
  if (!firebaseTimestamp) return "";

  const date = firebaseTimestamp.toDate();

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours.toString().padStart(2, "0");

  // Dynamically get timezone abbreviation (EST/EDT/etc.)
  const timeZone = Intl.DateTimeFormat("en-US", {
    timeZoneName: "short",
  })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName").value;

  return `${month}/${day}/${year} ${hours}:${minutes}${ampm} ${timeZone} `;
};
