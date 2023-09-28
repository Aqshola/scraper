import { useState } from "react";

export const usePagination = <T>(
  itemsPerPage: number
): [T[], number, number, (arrparams: T[]) => void, (value: number) => void] => {
  const [initialArr, setInitialArr] = useState<Array<T>>([]);
  const [parsedArr, setParsedArr] = useState<Array<T>>([]);
  const [currPage, setcurrPage] = useState(1);
  const manyPages = Math.ceil(initialArr.length / itemsPerPage);

  function setInitialPage(arrparams: Array<T>) {
    setcurrPage(1);
    setInitialArr([...arrparams]);
    const [lower, upper] = countUpperLower(currPage, itemsPerPage);
    const parsing = arrparams.slice(lower, upper);
    setParsedArr([...parsing]);
  }

  function changePage(value: number) {
    setcurrPage(value);
    const [lower, upper] = countUpperLower(value, itemsPerPage);
    const parsed = initialArr.slice(lower, upper);
    setParsedArr([...parsed]);
  }

  return [parsedArr, currPage, manyPages, setInitialPage, changePage];
};

function countUpperLower(current: number, maxValue: number) {
  const lower = (current - 1) * maxValue;
  const upper = current * maxValue;

  return [lower, upper];
}
