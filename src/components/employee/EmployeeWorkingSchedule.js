import React, {useEffect, useState} from "react";
import WorkingScheduleService from "../../service/modelService/WorkingScheduleService";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import Button from "react-bootstrap/Button";

const EmployeeWorkingSchedule = ({user}) => {
    const [events, setEvents] = useState([]);
    const workingScheduleService = new WorkingScheduleService();

    const fetchSchedule = async () => {
        let includes = [
            'working_times',
        ]

        return await workingScheduleService.show(user.working_schedule_id, includes)
    }

    useEffect(async () => {
        let schedule = await fetchSchedule();

        const events = schedule.working_times.map((workingTime) => ({
            id: workingTime.id,
            title: user.first_name + ' ' + user.last_name + ' Shift',
            start: new Date(workingTime.start_time),
            end: new Date(workingTime.end_time),
        }));

        setEvents(events)
    }, []);

    const localizer = momentLocalizer(moment);

    const formats = {
        timeGutterFormat: 'HH:mm', // Hours and minutes in 24-hour format
        eventTimeRangeFormat: ({ start, end }) => {
            return `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`;
        },
    };

    const [showModal, setShowModal] = useState(false);
    const [event, setEvent] = useState(null);

    const handleEventClick = (event) => {
        setEvent(event)
        setShowModal(true);
    };

    const customDayProp = date => {
        const isInCurrentMonth = date.getMonth() === new Date().getMonth();
        const isCurrentDay = isInCurrentMonth && date.getDate() === new Date().getDate();

        return {
            style: {
                backgroundColor: isCurrentDay ? 'yellow' : isInCurrentMonth ? 'white' : 'red',
            },
        };
    };

    const handleClose = () => {
        setShowModal(false);
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
        <div id='calendar'>
            <h3>Working Schedule</h3>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{height: '800px'}}
                formats={formats}
                onSelectEvent={handleEventClick}
                dayPropGetter={dayPropGetter}
            />
            <div>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header className='modal-secondary-color'>
                        <Modal.Title>View Shift</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modal-secondary-color'>
                        <h4>Start time: {moment(event?.start).format('YYYY-MM-DD HH:mm')}</h4>
                        <h4>End time: {moment(event?.end).format('YYYY-MM-DD HH:mm')}</h4>
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
            </div>
        </div>
    );
}

export default EmployeeWorkingSchedule;