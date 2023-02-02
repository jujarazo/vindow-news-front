import { useContext, useEffect, useState } from 'react';
import { paginationLength } from '../../constants';
import NewsContext from '../../context/NewsContext';
import { createPaginationArray } from '../../helpers';
import { Item } from './Item';

export function Pagination() {
  const {
    isLoadingNews,
    currentPage,
    totalPages,
    currentSearchTerm,
    handleSearchNews,
  } = useContext(NewsContext);

  // Create an array for the first 5 pages
  const initialPages = createPaginationArray(
    1,
    Math.min(paginationLength, totalPages)
  );
  const [pages, setPages] = useState(initialPages);

  const isFirstPageBatch = currentPage <= paginationLength;

  const isLastPage = currentPage === totalPages;

  useEffect(() => {
    const lastVisiblePage = pages.slice(-1).pop();

    // Check if it needs to go to the next batch of pages
    if (lastVisiblePage && currentPage > lastVisiblePage) {
      const nextBatchLength = Math.min(
        paginationLength,
        totalPages - currentPage
      );
      const nextBatch = createPaginationArray(currentPage, nextBatchLength);
      setPages(nextBatch);
    }

    // Check if it needs to go to the previous batch of pages
    if (currentPage < pages[0]) {
      const previousBatch = createPaginationArray(
        pages[0] - paginationLength,
        paginationLength
      );
      setPages(previousBatch);
    }
  }, [currentPage]);

  useEffect(() => {
    setPages(createPaginationArray(1, Math.min(paginationLength, totalPages)));
  }, [totalPages]);

  const goToPage = (page: number) => {
    handleSearchNews(currentSearchTerm, page);
  };

  return (
    <div className="d-flex justify-content-center w-100">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <Item
            content="&laquo;"
            aria-label="PreviousBatch"
            disabled={isFirstPageBatch || isLoadingNews}
            handleClick={() => goToPage(pages[0] - 1)}
          />
          {pages.map((page) => (
            <Item
              key={page}
              content={page}
              active={currentPage === page}
              handleClick={() => goToPage(page)}
              disabled={isLoadingNews}
            />
          ))}
          <Item
            content="&raquo;"
            aria-label="NextBatch"
            disabled={isLastPage || isLoadingNews}
            handleClick={() => goToPage(pages[0] + paginationLength)}
          />
        </ul>
      </nav>
    </div>
  );
}
