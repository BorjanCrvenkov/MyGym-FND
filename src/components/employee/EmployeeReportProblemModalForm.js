import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import EmployeeReportProblemModalFormService from "../../service/employee/EmployeeReportProblemModalFormService";
import Form from "react-bootstrap/Form";

const EmployeeReportProblemModalForm = ({gym}) => {
    const {
        show,
        handleShow,
        handleClose,
        formErrors,
        handleSubmit,
        formData,
        handleInputChange,
    } = EmployeeReportProblemModalFormService(gym);

    return (
        <>
            <Button variant="outline-danger" onClick={handleShow} className='flex-row'
                    style={{width: '260px', 'margin-left': '160px'}}>
                Report Gym Problem
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16"
                     style={{'margin-bottom': '3px', 'margin-left': '5px'}}>
                    <path
                        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title>Report a problem</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    <Form>
                        <Form.Group controlId="formHeading">
                            <Form.Label>Heading</Form.Label>
                            <Form.Control
                                type='text'
                                name="heading"
                                placeholder="Enter heading"
                                value={formData.heading}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.heading && (
                                <Form.Text className="text-danger">{formErrors.heading}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formReason">
                            <Form.Label>Reason</Form.Label>
                            <Form.Control
                                className='textarea'
                                as="textarea"
                                rows={3}
                                name="reason"
                                placeholder="Enter reason"
                                value={formData.reason}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.reason && (
                                <Form.Text className="text-danger">{formErrors.reason}</Form.Text>
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
                    <Button variant="danger" onClick={handleSubmit} className='rounded-4' style={{
                        'border': 'none',
                        'padding': '10px 20px',
                        'border-radius': '5px',
                        'cursor': 'pointer',
                    }}>
                        Submit report
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EmployeeReportProblemModalForm;