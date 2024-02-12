import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import ExpenseTypeService from "../../service/modelService/ExpenseTypeService";
import ExpenseTypeModalFormService from "../../service/business/ExpenseTypeModalFormService";

const ExpenseTypeModalForm = ({gymId, refreshData, expenseType}) => {
    const {
        show,
        handleShow,
        handleClose,
        formErrors,
        handleSubmit,
        formData,
        handleInputChange,
    } = ExpenseTypeModalFormService(gymId, refreshData, expenseType);

    return (
        <>
            <Button variant="primary" onClick={handleShow} className={expenseType ? 'card-button rounded-4' : 'regular-button rounded-4'}>
                {expenseType == null ? 'Create new' : 'Edit'} expense type
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title>{expenseType == null ? 'Create' : 'Edit'} expense type</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    <Form>
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

                        <Form.Group controlId="formDescription" className='col'>
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
                        <Form.Group controlId="formCost">
                            <Form.Label>Cost</Form.Label>
                            <input
                                type="number"
                                className='form-control'
                                name="cost"
                                value={formData.cost}
                                onChange={handleInputChange}
                            />
                            {formErrors.cost && <Form.Text className="text-danger">{formErrors.cost}</Form.Text>}
                        </Form.Group>
                        {
                            formData.recurring &&
                            <Form.Group controlId="formRecurring">
                                <Form.Check
                                    id='recurring'
                                    type="checkbox"
                                    name="recurring"
                                    label='Recurring'
                                    value={formData.recurring}
                                    defaultChecked={true}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        }
                        {
                            !formData.recurring &&
                            <Form.Group controlId="formRecurring">
                                <Form.Check
                                    id='recurring'
                                    type="checkbox"
                                    name="recurring"
                                    label='Recurring'
                                    value={formData.recurring}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        }
                        <div id='formRecuringEveryNumberOfDays' hidden={!formData.recurring}>
                            <Form.Group>
                                <Form.Label>Recurring frequency (days)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="recurring_every_number_of_days"
                                    value={formData.recurring_every_number_of_days}
                                    onChange={handleInputChange}
                                />
                                {formErrors.recurring_every_number_of_days && <Form.Text className="text-danger">{formErrors.recurring_every_number_of_days}</Form.Text>}
                            </Form.Group>
                        </div>
                        {
                            expenseType &&
                            <div className='row mt-3' style={{'margin-left': '2px', width: '430px'}}>
                                <DeleteConfirmationModal id={expenseType.id} service={new ExpenseTypeService()}
                                                         text={'expense type'} refreshData={refreshData}
                                                         parentHandleClose={handleClose}/>
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

export default ExpenseTypeModalForm;