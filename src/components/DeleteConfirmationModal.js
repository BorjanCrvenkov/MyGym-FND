import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteConfirmationModal = ({id, service, text, refreshData, parentHandleClose}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        service.delete(id);

        refreshData();
        handleClose();
        if(parentHandleClose != null){
            parentHandleClose();
        }
    };

    return (
        <>
            <Button variant="primary" className="btn btn-danger rounded-4" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title>Delete {text}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    <p>Are you sure you want to delete {text}?</p>
                </Modal.Body>
                <Modal.Footer className='modal-secondary-color'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" className='btn btn-danger' onClick={handleSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteConfirmationModal;