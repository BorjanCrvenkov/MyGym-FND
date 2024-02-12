import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import MembershipTypeModalFormService from "../../service/business/MembershipTypeModalFormService";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import EquipmentService from "../../service/modelService/EquipmentService";
import MembershipTypeService from "../../service/modelService/MembershipTypeService";

const MembershipTypeModalForm = ({gymId, refreshData, membershipType}) => {
    const {
        show,
        handleShow,
        handleClose,
        formErrors,
        handleSubmit,
        formData,
        handleInputChange,
    } = MembershipTypeModalFormService(gymId, refreshData, membershipType);

    return (
        <>
            <Button variant="primary" onClick={handleShow} className={membershipType ? 'card-button rounded-4' : 'regular-button rounded-4'}>
                {membershipType == null ? 'Create new' : 'Edit'} membership type
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title>{membershipType == null ? 'Create' : 'Edit'} Membership Type</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.name && <Form.Text className="text-danger">{formErrors.name}</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                className='textarea'
                                as="textarea"
                                rows={5}
                                name="description"
                                placeholder="Enter description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.description && (
                                <Form.Text className="text-danger">{formErrors.description}</Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                placeholder="Enter price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.price && <Form.Text className="text-danger">{formErrors.price}</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="formDuration">
                            <Form.Label>Duration (weeks)</Form.Label>
                            <Form.Control
                                type="number"
                                name="duration_weeks"
                                placeholder="Enter duration"
                                value={formData.duration_weeks}
                                onChange={handleInputChange}
                                required
                            />
                            {formErrors.duration_weeks && (
                                <Form.Text className="text-danger">{formErrors.duration_weeks}</Form.Text>
                            )}
                        </Form.Group>
                        {
                            membershipType &&
                            <div className='row mt-3' style={{'margin-left': '2px', width: '430px'}}>
                                <DeleteConfirmationModal id={membershipType.id} service={new MembershipTypeService()} text={'membership type'} refreshData={refreshData} parentHandleClose={handleClose}/>
                            </div>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer className='modal-secondary-color'>
                    <Button variant="secondary" onClick={handleClose} className='rounded-4'>
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

export default MembershipTypeModalForm;
