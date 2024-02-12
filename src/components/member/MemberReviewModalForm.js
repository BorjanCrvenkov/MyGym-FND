import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import MemberReviewModalFormService from "../../service/member/MemberReviewModalFormService";
import {FaStar} from "react-icons/fa";

const MemberReviewModalForm = ({gymId, refreshData, review}) => {
    const {
        show,
        handleShow,
        handleClose,
        formErrors,
        handleSubmit,
        formData,
        handleInputChange,
        displayRatingStars
    } = MemberReviewModalFormService(gymId, refreshData, review);

    return (
        <>
            <Button variant="primary" onClick={handleShow} className={review ? 'card-button rounded-4' : 'regular-button rounded-4'}>
                {review ? 'Edit' : 'Add'} review
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title>{review ? 'Edit' : 'Add'} review</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    <Form>
                        <Form.Group controlId="formRating">
                            <Form.Label>Rating:</Form.Label>
                            {displayRatingStars()}
                            {formErrors.rating && (
                                <Form.Text className="text-danger">{formErrors.rating}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formBody">
                            <Form.Label>Body</Form.Label>
                            <Form.Control
                                className='textarea'
                                as="textarea"
                                rows={5}
                                name="body"
                                value={formData.body}
                                onChange={handleInputChange}
                            />
                            {formErrors.body && (
                                <Form.Text className="text-danger">{formErrors.body}</Form.Text>
                            )}
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
                    <Button variant="primary" onClick={handleSubmit} className='regular-button rounded-4'>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default MemberReviewModalForm;