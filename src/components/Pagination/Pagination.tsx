import { Item } from './Item';

export function Pagination() {
  return (
    <div className="d-flex justify-content-center w-100">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <Item content="&laquo;" aria-label="Previous" />
          <Item content="1" />
          <Item content="2" />
          <Item content="3" />
          <Item content="&raquo;" aria-label="Next" />
        </ul>
      </nav>
    </div>
  );
}
