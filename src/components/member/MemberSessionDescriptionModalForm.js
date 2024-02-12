import MemberReviewModalFormService from "../../service/member/MemberReviewModalFormService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from "react";
import MemberSessionDescriptionModalFormService from "../../service/member/MemberSessionDescriptionModalFormService";

const MemberSessionDescriptionModalForm = ({session, refreshData}) => {
    const {
        show,
        handleShow,
        handleClose,
        handleSubmit,
        formData,
        handleInputChange,
    } = MemberSessionDescriptionModalFormService(session, refreshData);

    return (
        <>
            <Button variant="primary" onClick={handleShow} className='card-button rounded-4'>
                {session.description ? 'Edit' : 'Add'} description
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title>{session.description ? 'Edit' : 'Add'} description</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    <Form>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                className='textarea'
                                as="textarea"
                                rows={3}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='modal-secondary-color'>
                    <Button variant="secondary" onClick={handleClose} className='rounded-4' style={{
                        'border': 'none',
                        'padding': '10px 20px',
                        'border-radius': '5px',
                        'cursor': 'pointer',
                    }}>
                        Close
                    </Button>
                    <Button onClick={handleSubmit} className='regular-button rounded-4'>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MemberSessionDescriptionModalForm;