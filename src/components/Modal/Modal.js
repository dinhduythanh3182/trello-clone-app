
import './Modal.scss'

function Modal(props) {
    const {title,content,onConfirmModal,toggleConfirmModal} = props

    return ( 
        <div className="modal-container">
            <div className="modal">
                <header className="modal-header">{title}</header>
                <div className="modal-content">
                    {content}
                </div>
                <footer className="modal-footer">
                    <button className="btn cancel" 
                            onClick={toggleConfirmModal}
                    >
                        Cancel
                    </button>
                    <button className="btn confirm"
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