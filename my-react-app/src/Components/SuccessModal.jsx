

/**
 * Success Modal Component
 * Displays a generic success message in a Bootstrap modal
 */
const SuccessModal = ({ show, onHide, message }) => {
  if (!show) return null

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-success">Success!</h5>
            <button type="button" className="btn-close" onClick={onHide} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p className="text-center fs-5">{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-success" onClick={onHide}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
