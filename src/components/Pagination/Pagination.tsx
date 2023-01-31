import { useContext, useEffect, useState } from 'react';
import NewsContext from '../../context/NewsContext';
import { createPaginationArray } from '../../helpers';
import { Item } from './Item';

const paginationLength = 5;

export function Pagination() {
  const { isLoadingNews, currentPage, currentSearchTerm, handleSearchNews } =
    useContext(NewsContext);

  // Create an array for the first 5 pages
  const initialPages = createPaginationArray(1, paginationLength);
  const [pages, setPages] = useState(initialPages);

  const isFirstPageBatch = currentPage <= paginationLength;

  useEffect(() => {
    const lastVisiblePage = pages.slice(-1).pop();

    // Check if it needs to go to the next batch of pages
    if (lastVisiblePage && currentPage > lastVisiblePage) {
      const nextBatch = createPaginationArray(currentPage, paginationLength);
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
            disabled={isLoadingNews}
            handleClick={() => goToPage(pages[0] + paginationLength)}
          />
        </ul>
      </nav>
    </div>
  );
}
