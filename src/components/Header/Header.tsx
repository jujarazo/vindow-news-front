import { Search } from './Search';

export function Header() {
  return (
    <div className="mb-3">
      <h1 className="mb-3">News search</h1>
      <Search />
    </div>
  );
}
