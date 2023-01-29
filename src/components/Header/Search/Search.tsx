export function Search() {
  return (
    <div className="d-flex">
      <input
        type="text"
        className="form-control"
        placeholder="Search news..."
      />
      <button className="btn btn-primary ms-3">Search</button>
    </div>
  );
}
