import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import GymService from "../../service/modelService/GymService";

const BusinessShutDownGymModal = ({gymId}) => {
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        shutdown_date: null,
    });
    const [formErrors, setFormErrors] = useState({});
    const gymService = new GymService();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};

        if (formData.shutdown_date === null) {
            errors.shutdown_date = 'Shutdown date is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return
        }

        await gymService.update(gymId, formData)

        handleClose();
    };

    const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        let month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        let day = String(tomorrow.getDate()).padStart(2, '0');
        const year = tomorrow.getFullYear();

        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <Button variant="danger" onClick={handleShow} className='regular-button rounded-4'>
                Shutdown gym
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title>Shutdown gym</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    <Form className='row'>
                        <Form.Group controlId="formDateOfEmployment" className='col'>
                            <Form.Label>Shutdown date</Form.Label>
                            <Form.Control
                                type="date"
                                name="shutdown_date"
                                value={formData.shutdown_date}
                                onChange={handleInputChange}
                                min={getTomorrowDate()}
                            />
                            {formErrors.shutdown_date && (
                                <Form.Text className="text-danger">{formErrors.shutdown_date}</Form.Text>
                            )}
                        </Form.Group>
                        <div>
                            <p>Shutting down while there are active memberships after the shutdown date will refund all of the memberships!</p>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='modal-secondary-color'>
                    <Button variant="secondary" onClick={handleClose} className='rounded-4'>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleSubmit} className='rounded-4'>
                        Shutdown gym
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BusinessShutDownGymModal;