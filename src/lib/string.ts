export const stringToArray = (str: string | undefined): string[] => {
  if (!str) return [];

  let arr = str.split(",").map((item) => item.trim());
  // remove duplicates
  arr = arr.filter((item, index) => arr.indexOf(item) === index);
  // remove empty strings
  arr = arr.filter((item) => item !== "");

  return arr;
};
