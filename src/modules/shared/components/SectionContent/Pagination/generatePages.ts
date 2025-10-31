import type { PageItem } from "./pageItem";

export const generatePages = (
  currentPage: number,
  totalPages: number,
  pagesAround = 1,
): PageItem[] => {
  const result: PageItem[] = [];
  let id = 1;

  const maxVisiblePages = pagesAround * 2 + 5;

  // Case 1: all pages fit — no need for ellipses
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => ({
      id: i + 1,
      value: i + 1,
    }));
  }

  // Case 2: need for ellipses
  const firstPage = 1;
  const lastPage = totalPages;

  const start = Math.max(firstPage + 1, currentPage - pagesAround);
  const end = Math.min(lastPage - 1, currentPage + pagesAround);

  result.push({ id: id++, value: firstPage });

  if (start > firstPage + 1) {
    result.push({ id: id++, value: "…" });
  }

  for (let page = start; page <= end; page++) {
    result.push({ id: id++, value: page });
  }

  if (end < lastPage - 1) {
    result.push({ id: id++, value: "…" });
  }

  result.push({ id: id++, value: lastPage });

  return result;
};
