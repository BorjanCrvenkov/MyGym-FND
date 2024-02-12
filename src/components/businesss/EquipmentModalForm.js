import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import EquipmentModalFormService from "../../service/business/EquipmentModalFormService";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import EquipmentService from "../../service/modelService/EquipmentService";

const EquipmentModalForm = ({gymId, refreshData, equipment}) => {
    const {
        show,
        handleShow,
        handleClose,
        formErrors,
        handleSubmit,
        formData,
        handleInputChange,
        fileChange,
    } = EquipmentModalFormService(gymId, refreshData, equipment);

    return (
        <>
            <Button onClick={handleShow} className={equipment ? 'card-button rounded-4' : 'regular-button rounded-4'}>
                {equipment == null ? 'Create new' : 'Edit'} equipment
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title>{equipment == null ? 'Create' : 'Edit'} equipment</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    <Form>
                        {
                            equipment &&
                            <div>
                                <p>Current image</p>
                                <img src={equipment.image.link} style={{width: '430px', height: '200px'}} alt="Card image cap"/>
                            </div>
                        }
                        <Form.Group controlId="formName" className='mt-1'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={handleInputChange}
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
                            />
                            {formErrors.price && <Form.Text className="text-danger">{formErrors.price}</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="formLastServiceDate">
                            <Form.Label>Last service date</Form.Label>
                            <Form.Control
                                type="date"
                                name="last_service_date"
                                value={formData.last_service_date}
                                onChange={handleInputChange}
                            />
                            {formErrors.last_service_date && (
                                <Form.Text className="text-danger">{formErrors.last_service_date}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formNextServiceDate">
                            <Form.Label>Next service date</Form.Label>
                            <Form.Control
                                type="date"
                                name="next_service_date"
                                value={formData.next_service_date}
                                onChange={handleInputChange}
                            />
                            {formErrors.next_service_date && (
                                <Form.Text className="text-danger">{formErrors.next_service_date}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>{equipment == null ? 'Image' : 'Change Image'}</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={fileChange}
                            />
                            {formErrors.image && (
                                <Form.Text className="text-danger">{formErrors.image}</Form.Text>
                            )}
                        </Form.Group>
                        {
                            equipment &&
                            <div className='row mt-3' style={{'margin-left': '2px', width: '430px'}}>
                                <DeleteConfirmationModal id={equipment.id} service={new EquipmentService()} text={'equipment'} refreshData={refreshData} parentHandleClose={handleClose}/>
                            </div>
                        }
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

export default EquipmentModalForm;