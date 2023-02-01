import { useContext } from 'react';
import NewsContext from '../../../context/NewsContext';

export function Alert() {
  const { errorMessage } = useContext(NewsContext);

  return (
    <div
      className="alert alert-danger d-flex justify-content-between align-items-center alert-dismissible fade show"
      role="alert"
    >
      <div>{errorMessage}</div>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}
