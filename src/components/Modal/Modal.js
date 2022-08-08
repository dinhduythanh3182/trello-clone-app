
import './Modal.scss'

function Modal(props) {
    const {title,content,onConfirmModal,toggleConfirmModal} = props

    return ( 
        <div className="modal-container">
            <div className="modal-content">
                <header className="modal-content-header">{title}</header>
                <div className="modal-content-body">
                    {content}
                </div>
                <footer className="modal-content-footer">
                    <button className="modal-content-btn cancel" 
                            onClick={toggleConfirmModal}
                    >
                        Cancel
                    </button>
                    <button className="modal-content-btn confirm"
                        onClick={onConfirmModal}
                    >
                        Confirm
                    </button>
                </footer>
            </div>
        </div>
     );
}

export default Modal;