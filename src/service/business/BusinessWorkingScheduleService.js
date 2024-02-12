import {useEffect, useState} from "react";
import WorkingScheduleService from "../modelService/WorkingScheduleService";
import {momentLocalizer} from "react-big-calendar";
import moment from "moment/moment";
import WorkingTimeService from "../modelService/WorkingTimeService";

const BusinessWorkingScheduleService = (gym) => {
    const [events, setEvents] = useState([]);
    const workingScheduleService = new WorkingScheduleService();

    const fetchAndSetSchedule = async () => {
        let filters = {
            gym_id: gym.id,
        };

        let includes = [
            'working_times',
        ];

        let schedules = await workingScheduleService.index(filters, null, includes);

        let events = schedules.map((schedule) => (
            schedule.working_times.map((workingTime) => ({
                id: workingTime.id,
                title: schedule.name,
                start: new Date(workingTime.start_time),
                end: new Date(workingTime.end_time),
                working_schedule_id: schedule.id,
            }))
        )).flat(1);

        setEvents(events)
    }

    useEffect(() => {
        fetchAndSetSchedule();
    }, []);

    const localizer = momentLocalizer(moment);

    const formats = {
        timeGutterFormat: 'HH:mm',
        eventTimeRangeFormat: ({start, end}) => {
            return `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`;
        },
    };

    const handleEventClick = (event) => {
        const startTime = moment(event.start).format('YYYY-MM-DD HH:mm');
        const endTime = moment(event.end).format('YYYY-MM-DD HH:mm');

        setFormData({
            start_time: startTime,
            end_time: endTime,
            working_schedule_id: event.working_schedule_id,
        })

        setEventId(event.id);
        setShowModal(true);
    };

    const handleDateSlotClick = (slotInfo) => {
        const clickedTime = moment(slotInfo.start).format('YYYY-MM-DD HH:mm:ss');

        setShowModal(true);
        formData.start_time = clickedTime;
        formData.end_time = clickedTime;
    };

    const [showModal, setShowModal] = useState(false);
    const [eventId, setEventId] = useState(null);

    const handleClose = () => {
        setFormData({
            start_time: null,
            end_time: null,
            working_schedule_id: null,
        })
        setEventId(null)
        setShowModal(false);
    };

    const [formData, setFormData] = useState({
        start_time: null,
        end_time: null,
        working_schedule_id: null,
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!formData.start_time) {
            errors.start_time = 'Start time is required';
        }

        if (!formData.end_time) {
            errors.end_time = 'End time is required';
        }

        if (!formData.working_schedule_id) {
            errors.working_schedule_id = 'Employee is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const workingTimeService = new WorkingTimeService();

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        if (eventId) {
            await workingTimeService.update(eventId, JSON.stringify(formData));
        } else {
            await workingTimeService.store(formData);
        }

        await fetchAndSetSchedule();
        handleClose();
    };

    return {
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
    };
}

export default BusinessWorkingScheduleService;