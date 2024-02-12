import React from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import BusinessWorkingScheduleService from "../../service/business/BusinessWorkingScheduleService";
import '../../styles/styles.css';
import moment from "moment/moment";

const BusinessWorkingSchedule = ({gym, employees}) => {
    const {
        showModal,
        handleClose,
        eventId,
        formData,
        handleInputChange,
        formErrors,
        workingTimeService,
        fetchAndSetSchedule,
        handleSubmit,
        handleEventClick,
        handleDateSlotClick,
        localizer,
        events,
        formats,
    } = BusinessWorkingScheduleService(gym);

    const eventStyleGetter = (event, start, end, isSelected) => {
        const backgroundColor = event.color; // Custom color property in your event data
        const style = {
            backgroundColor,
            borderRadius: '5px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        };
        return {
            style,
        };
    };

    const today = new Date(); // get the current date

    const dayPropGetter = (date) => {
        // Custom style for today's block
        if (moment(date).isSame(today, 'day')) {
            return {
                className: 'today-cell',
                style: {
                    backgroundColor: 'gray',
                    color: 'black', // customize text color
                },
            };
        }

        // Default style for other cells
        return {};
    };

    return (
        <div className='mt-3'>
            <div className="row align-items-center">
                <h3 className='col-9'>Working Schedule</h3>
            </div>
            <hr/>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{height: '1000px'}}
                formats={formats}
                onSelectEvent={handleEventClick}
                onSelectSlot={handleDateSlotClick}
                selectable={true}
                eventPropGetter={eventStyleGetter}
                dayPropGetter={dayPropGetter}
            />
            <div>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header className='modal-secondary-color'>
                        <Modal.Title>{eventId ? 'Edit' : 'Add'} Shift</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modal-secondary-color'>
                        <Form>
                            <Form.Group controlId="formStartTime" className='col'>
                                <Form.Label>Start time</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="start_time"
                                    value={formData.start_time}
                                    onChange={handleInputChange}
                                />
                                {formErrors.start_time && (
                                    <Form.Text className="text-danger">{formErrors.start_time}</Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group controlId="formEndTime" className='col'>
                                <Form.Label>End Time</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="end_time"
                                    value={formData.end_time}
                                    min={formData.end_time}
                                    onChange={handleInputChange}
                                />
                                {formErrors.end_time && (
                                    <Form.Text className="text-danger">{formErrors.end_time}</Form.Text>
                                )}
                            </Form.Group>
                            <Form.Group controlId="formScheduleId" className='mt-1'>
                                <Form.Label>Employee</Form.Label>
                                <Form.Select
                                    name='working_schedule_id'
                                    onChange={handleInputChange}
                                    defaultValue={formData.working_schedule_id}
                                    style={{'background-color': '#decd80', 'color': '#202020'}}
                                >
                                    <option value={null}
                                            style={{'background-color': '#decd80', 'color': '#202020'}}>Select Employee
                                    </option>
                                    {
                                        employees.map(employee => (
                                            <option value={employee.working_schedule_id}
                                                    style={{'background-color': '#decd80', 'color': '#202020'}}>
                                                {employee.first_name} {employee.last_name}
                                            </option>
                                        ))
                                    }
                                </Form.Select>
                                {formErrors.working_schedule_id && (
                                    <Form.Text className="text-danger">{formErrors.working_schedule_id}</Form.Text>
                                )}
                            </Form.Group>
                        </Form>
                        <div className='row mt-2' style={{width: '425px', 'margin-left': '20px'}}>
                            {
                                eventId &&
                                <DeleteConfirmationModal id={eventId} service={workingTimeService} text={'shift'}
                                                         refreshData={fetchAndSetSchedule}
                                                         parentHandleClose={handleClose}/>
                            }
                        </div>
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
                        <Button variant="primary"
                                onClick={handleSubmit}
                                className='regular-button rounded-4'
                        >
                            {eventId ? 'Edit' : 'Add'} Shift
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default BusinessWorkingSchedule;