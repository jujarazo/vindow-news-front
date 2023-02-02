export function Spinner() {
  return (
    <div className="d-flex align-items-center">
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      />
      <span className="ms-1">Loading...</span>
    </div>
  );
}
