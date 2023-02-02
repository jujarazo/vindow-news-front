import { useContext } from 'react';
import PopupContext from '../../../context/PopupContext';

export function Popup() {
  const { showPopup, handleClosePopup, imgUrl } = useContext(PopupContext);

  return (
    <div
      className={`modal ${showPopup ? ' modal-show' : ''}`}
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              onClick={handleClosePopup}
            />
          </div>
          <div className="modal-body d-flex justify-content-center">
            <img src={imgUrl} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}
