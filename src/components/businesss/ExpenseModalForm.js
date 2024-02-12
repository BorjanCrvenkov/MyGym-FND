import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import ExpenseModalFormService from "../../service/business/ExpenseModalFormService";
import ExpenseStatusEnum from "../../enum/ExpenseStatusEnum";
import ExpenseService from "../../service/modelService/ExpensesService";

const ExpenseModalForm = ({gymId, refreshData, expense, expenseTypes}) => {
    const {
        show,
        handleShow,
        handleClose,
        formErrors,
        handleSubmit,
        handleInputChange,
    } = ExpenseModalFormService(gymId, refreshData, expense);

    return (
        <>
            <Button variant="primary" onClick={handleShow} className={expense? 'card-button rounded-4' : 'regular-button rounded-4'}>
                {expense == null ? 'Create new' : 'Edit'} expense
            </Button>

            <Modal show={show} onHide={handleClose} className='rounded-4'>
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title>{expense == null ? 'Create' : 'Edit'} expense</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    <Form>
                        <Form.Group controlId="formName" className='mt-1'>
                            <Form.Label>Status</Form.Label>
                            <Form.Select name='status' onChange={handleInputChange} defaultValue={expense ? expense.status : null} style={{'background-color': '#decd80', 'color': '#202020'}}>
                                <option value={null} style={{'background-color': '#decd80', 'color': '#202020'}}></option>
                                <option value={ExpenseStatusEnum.PAID} style={{'background-color': '#decd80', 'color': '#202020'}}>Paid</option>
                                <option value={ExpenseStatusEnum.NOT_PAID} style={{'background-color': '#decd80', 'color': '#202020'}}>Not Paid</option>
                            </Form.Select>
                            {formErrors.status && <Form.Text className="text-danger">{formErrors.status}</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="formDescription" className='col'>
                            <Form.Label>Expense type</Form.Label>
                            <Form.Select name='expense_type_id' onChange={handleInputChange} defaultValue={expense ? expense.expense_type_id : null} style={{'background-color': '#decd80', 'color': '#202020'}}>
                                <option value={null} style={{'background-color': '#decd80', 'color': '#202020'}}></option>
                                {
                                    expenseTypes.map(expenseType => (
                                        <option value={expenseType.id} style={{'background-color': '#decd80', 'color': '#202020'}}>{expenseType.name}</option>
                                    ))
                                }
                            </Form.Select>
                            {formErrors.expense_type_id && (
                                <Form.Text className="text-danger">{formErrors.expense_type_id}</Form.Text>
                            )}
                        </Form.Group>
                        {
                            expense &&
                            <div className='row mt-3' style={{'width': '425px', 'margin-left': '3px'}}>
                                <DeleteConfirmationModal
                                    id={expense.id}
                                    service={new ExpenseService()}
                                    text={'expense'}
                                    refreshData={refreshData}
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

export default ExpenseModalForm;