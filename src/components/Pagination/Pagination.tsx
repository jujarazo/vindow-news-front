import { useContext } from 'react';
import NewsContext from '../../context/NewsContext';
import { Item } from './Item';

export function Pagination() {
  const { currentPage, handleSearchNews } = useContext(NewsContext);

  const isFirstPage = currentPage === 1;

  return (
    <div className="d-flex justify-content-center w-100">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <Item
            content="&laquo;"
            aria-label="Previous"
            disabled={isFirstPage}
          />
          <Item content="1" active={currentPage === 1} />
          <Item content="2" active={currentPage === 2} />
          <Item content="3" active={currentPage === 3} />
          <Item content="&raquo;" aria-label="Next" />
        </ul>
      </nav>
    </div>
  );
}
