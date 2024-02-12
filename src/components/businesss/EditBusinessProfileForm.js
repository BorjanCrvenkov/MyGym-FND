import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import UserTypeEnum from "../../enum/UserTypeEnum";
import EditProfileFormService from "../../service/EditProfileFormService";
import TodaysDate from "../../service/TodaysDate";

const EditMemberProfileForm = ({user}) =>{
    if(Array.isArray(user)){
        return ;
    }

    const {
        show,
        handleShow,
        handleClose,
        handleSubmit,
        formData,
        handleInputChange,
        imageChange,
    } = EditProfileFormService(user, UserTypeEnum.BUSINESS)

    return (
        <>
            <Button variant="primary" onClick={handleShow} className='rounded-4'>
                Edit profile
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title>Edit profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    <Form className='row'>
                        <Form.Group controlId="formFirstName" className='col-6'>
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                placeholder="First name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                            /></Form.Group>

                        <Form.Group controlId="formLastName" className='col-6'>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                placeholder="Last name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formUsername" className='col-6'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDateOfBirth" className='col-6'>
                            <Form.Label>Date of birth</Form.Label>
                            <Form.Control
                                type="date"
                                name="date_of_birth"
                                max={TodaysDate()}
                                value={formData.date_of_birth}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formbio">
                            <Form.Label>Bio:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                name="bio"
                                placeholder="Bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>Change Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={imageChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formIdentificationFile">
                            <Form.Label>Change Identification file</Form.Label>
                            <Form.Control
                                type="file"
                                name="identification_file"
                                onChange={imageChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className='modal-secondary-color'>
                    <Button variant="secondary" onClick={handleClose} className='rounded-4'>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit} className='rounded-4'>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditMemberProfileForm;