type PopupProps = {
  hidePopup: () => void;
  showPopup: boolean;
};

export function Popup({ showPopup, hidePopup }: PopupProps) {
  return (
    <div
      className={`modal ${showPopup ? ' modal-show' : ''}`}
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              onClick={hidePopup}
            ></button>
          </div>
          <div className="modal-body">cosas</div>
        </div>
      </div>
    </div>
  );
}
