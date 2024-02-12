import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Tab, Tabs} from "react-bootstrap";
import DisplayPlansModalService from "../../service/business/DisplayPlansModalService";
import BusinessPlanCard from "../../service/business/BusinessPlanCard";
import '../../styles/styles.css'

const DisplayPlansModal = () => {
    const {
        show,
        handleShow,
        handleClose,
        monthlyPlans,
        yearlyPlans,
    } = DisplayPlansModalService();

    let loggedInUser = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Button variant='#decd80' onClick={handleShow} className='btn regular-button rounded-4'>
                View plans
            </Button>

            <Modal show={show} onHide={handleClose} dialogClassName="display-plans-modal">
                <Modal.Header className='modal-secondary-color'>
                    <Modal.Title>Plans</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-secondary-color'>
                    {
                        loggedInUser.plan &&
                            <p style={{'margin-left': '1200px', 'margin-bottom': '-30px'}}>Currently active plan: <strong>{loggedInUser.plan.name}</strong> expires at: <strong>{loggedInUser.plan_ends_at}</strong></p>
                    }
                    <Tabs defaultActiveKey="monthly" className='tabs'>
                        <Tab eventKey='monthly' title='Monthly Plans'>
                            <div className='card-group mt-3'>
                                {
                                    monthlyPlans.map(plan => (
                                        <BusinessPlanCard plan={plan} handleClose={handleClose}/>
                                    ))
                                }
                            </div>
                        </Tab>
                        <Tab eventKey="Yearly" title="Yearly plans">
                            <div className='card-group mt-3'>
                                {
                                    yearlyPlans.map(plan => (
                                        <BusinessPlanCard plan={plan} handleClose={handleClose}/>
                                    ))
                                }
                            </div>
                        </Tab>
                    </Tabs>
                    <div className='mt-1' style={{'margin-left': '15px'}}>
                        <p>Buying the same plan as the active one will extend your plan</p>
                        <p>Buying a new plan will replace your current one</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className='modal-secondary-color'>
                    <Button variant="secondary" onClick={handleClose} className='regular-button rounded-4'>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DisplayPlansModal;