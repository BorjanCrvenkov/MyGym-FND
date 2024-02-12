import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import BuyMembershipModalFormService from "../../service/member/BuyMembershipModalFormService";
import {CardElement} from "@stripe/react-stripe-js";
import TodaysDate from "../../service/TodaysDate";

const BuyMembershipModalForm = ({membershipType, refreshData}) => {
    const {
        show,
        handleShow,
        handleClose,
        formErrors,
        handleSubmit,
        formData,
        handleInputChange,
        getMaxDate,
        name,
        setName,
        errorMessage,
    } = BuyMembershipModalFormService(membershipType.id, refreshData);

    return (
        <>
            <Button variant="primary" onClick={handleShow} className='card-button rounded-4'>
                Buy Membership
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title>Buy Membership</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    {errorMessage && (
                        <div className="alert alert-danger text-center">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} id="payment-form">
                        <div>
                            <label>Start date</label>
                            <input
                                className="form-control"
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleInputChange}
                                min={TodaysDate()}
                                max={getMaxDate()}
                            />
                            {formErrors.start_date && (
                                <Form.Text className="text-danger">{formErrors.start_date}</Form.Text>
                            )}
                        </div>
                        <div className="form-group mb-4">
                            <label className="control-label">Cardholder name</label>{" "}
                            <input
                                className="form-control"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <CardElement options={{style: {base: {fontSize: "18px", color: '#decd80'}}, hidePostalCode: true}}/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className='modal-secondary-color'>
                    <Button variant="secondary" onClick={handleClose} className='rouneded-4' style={{
                        'border': 'none',
                        'padding': '10px 20px',
                        'border-radius': '5px',
                        'cursor': 'pointer'
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" id='pay-button' onClick={handleSubmit} className='regular-button rouned-4'>
                        Pay Now (${membershipType.price})
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BuyMembershipModalForm;