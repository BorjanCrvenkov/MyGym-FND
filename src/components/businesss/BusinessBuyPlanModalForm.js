import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import BusinessBuyPlanModalFormService from "../../service/business/BusinessBuyPlanModalFormService";
import {CardElement} from "@stripe/react-stripe-js";

const BusinessBuyPlanModalForm = ({plan, parentHandleClose}) => {
    const {
        show,
        handleShow,
        handleClose,
        handleSubmit,
        name,
        setName,
        errorMessage,
    } = BusinessBuyPlanModalFormService(plan, parentHandleClose);

    return (
        <>
            <Button variant="light" onClick={handleShow} className='card-button rounded-4'>
                Buy: ${plan.price}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title>Buy {plan.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    {errorMessage && (
                        <div className="alert alert-danger text-center">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} id="payment-form">
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
                        <div className='mt-3'>
                            <button
                                id='pay-button'
                                className="btn regular-button mt-2 rounded-4"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Pay Now (${plan.price})
                            </button>
                        </div>
                    </form>
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
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BusinessBuyPlanModalForm;