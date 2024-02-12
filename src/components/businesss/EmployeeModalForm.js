import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import EmployeeModalFormService from "../../service/business/EmployeeModalFormService";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import UserService from "../../service/modelService/UserService";
import TodaysDate from "../../service/TodaysDate";

const EmployeeModalForm = ({gymId, refreshData, employee}) => {
    const {
        show,
        handleShow,
        handleClose,
        formErrors,
        handleSubmit,
        formData,
        handleInputChange,
        fileChange,
    } = EmployeeModalFormService(gymId, refreshData, employee);

    return (
        <div>
            <Button variant="primary" onClick={handleShow} className={employee ? 'card-button rounded-4' : 'regular-button rounded-4'} >
                {employee == null ? 'Create new' : 'Edit'} employee
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title >{employee == null ? 'Create' : 'Edit'} employee</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    <Form className='row'>
                        {
                            employee &&
                            <div>
                                <p>Current image</p>
                                <img src={employee?.image?.link} style={{width: '420px', height: '200px'}} />
                            </div>
                        }
                        {
                            employee &&
                            <div>
                                <p>Current identification file</p>
                                <img src={employee?.identification_file?.link} style={{width: '420px', height: '200px'}}/>
                            </div>
                        }
                        <Form.Group controlId="formFirstName" className='mt-1 col'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                placeholder="Enter first name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                            />
                            {formErrors.first_name && <Form.Text className="text-danger">{formErrors.first_name}</Form.Text>}
                        </Form.Group>

                        <Form.Group controlId="formLastName" className='col'>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                placeholder="Enter last name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                            />
                            {formErrors.last_name && (
                                <Form.Text className="text-danger">{formErrors.last_name}</Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {formErrors.email && <Form.Text className="text-danger">{formErrors.email}</Form.Text>}
                        </Form.Group>
                        {
                            !employee &&
                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder='Enter password'
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                                {formErrors.password && (
                                    <Form.Text className="text-danger">{formErrors.password}</Form.Text>
                                )}
                            </Form.Group>
                        }
                        <Form.Group controlId="formDateOfBirth" className='col'>
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="date_of_birth"
                                max={TodaysDate()}
                                value={formData.date_of_birth}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDateOfEmployment" className='col'>
                            <Form.Label>Employment date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date_of_employment"
                                value={formData.date_of_employment}
                                onChange={handleInputChange}
                            />
                            {formErrors.date_of_employment && (
                                <Form.Text className="text-danger">{formErrors.date_of_employment}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formBio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                className='textarea'
                                as="textarea"
                                rows={3}
                                name="bio"
                                placeholder="Enter optional bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                            />
                            {formErrors.bio && (
                                <Form.Text className="text-danger">{formErrors.bio}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>{employee == null ? 'Image' : 'Change Image'}</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={fileChange}
                            />
                            {formErrors.image && (
                                <Form.Text className="text-danger">{formErrors.image}</Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>{employee == null ? 'Identification file' : 'Change Identification file'}</Form.Label>
                            <Form.Control
                                type="file"
                                name="identification_file"
                                onChange={fileChange}
                            />
                            {formErrors.identification_file && (
                                <Form.Text className="text-danger">{formErrors.identification_file}</Form.Text>
                            )}
                        </Form.Group>
                        {
                            employee &&
                            <div className='row mt-3' style={{'margin-left': '2px'}}>
                                <DeleteConfirmationModal id={employee.id} service={new UserService()} text={'employee'} refreshData={refreshData} parentHandleClose={handleClose}/>
                            </div>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer className='modal-secondary-color'>
                    <Button variant='secondary' onClick={handleClose}  className='card-button rounded-4'>
                        Close
                    </Button>
                    <Button variant='#202020' onClick={handleSubmit}  className='regular-button rounded-4'>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EmployeeModalForm;