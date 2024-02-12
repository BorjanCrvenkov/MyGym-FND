import {useEffect, useState} from 'react';
import RedirectService from "../RedirectService";
import GymService from "../modelService/GymService";
import {useParams} from "react-router-dom";

const RegisterService = () => {
    const {id} = useParams();
    const gymService = new GymService();

    const initialData = {
        name: null,
        address: null,
        date_opened: null,
        phone_number: null,
        working_times: null,
        email: null,
        instagram_link: null,
        facebook_link: null,
        twitter_link: null,
        monday_start: null,
        monday_end: null,
        tuesday_start: null,
        tuesday_end: null,
        wednesday_start: null,
        wednesday_end: null,
        thursday_start: null,
        thursday_end: null,
        friday_start: null,
        friday_end: null,
        saturday_start: null,
        saturday_end: null,
        sunday_start: null,
        sunday_end: null,
        owner_id: JSON.parse(localStorage.getItem('user')).id,
        cover_image: null,
        images: null
    };

    const [formData, setFormData] = useState(initialData);

    const fetchGym = async () => {
        if (id == null) {
            return null;
        }

        return await gymService.show(id);
    }

    const [gym, setGym] = useState([]);

    useEffect(async () => {
        const gymData = await fetchGym();
        if (gymData && !Array.isArray(gymData)) {
            setGym(gymData);
            let parsedWorkingTimes = JSON.parse(gymData.working_times);

            setFormData({
                name: gymData.name,
                address: gymData.address,
                date_opened: gymData.date_opened,
                phone_number: gymData.phone_number,
                working_times: gymData,
                email: gymData.email,
                instagram_link: gymData.instagram_link,
                facebook_link: gymData.facebook_link,
                twitter_link: gymData.twitter_link,
                monday_start: parsedWorkingTimes.Monday.start_time,
                monday_end: parsedWorkingTimes.Monday.end_time,
                tuesday_start: parsedWorkingTimes.Tuesday.start_time,
                tuesday_end: parsedWorkingTimes.Tuesday.end_time,
                wednesday_start: parsedWorkingTimes.Wednesday.start_time,
                wednesday_end: parsedWorkingTimes.Wednesday.end_time,
                thursday_start: parsedWorkingTimes.Thursday.start_time,
                thursday_end: parsedWorkingTimes.Thursday.end_time,
                friday_start: parsedWorkingTimes.Friday.start_time,
                friday_end: parsedWorkingTimes.Friday.end_time,
                saturday_start: parsedWorkingTimes.Saturday.start_time,
                saturday_end: parsedWorkingTimes.Saturday.end_time,
                sunday_start: parsedWorkingTimes.Sunday.start_time,
                sunday_end: parsedWorkingTimes.Sunday.end_time,
            })
        }
    }, [id]);

    const [validFields, setValidFields] = useState({});

    const redirectService = new RedirectService();

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const fileChange = (event) => {
        event.preventDefault();

        let name = event.target.name;
        let files = event.target.files;

        if (!files) {
            return;
        }
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let fileType = file.type;
            let validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

            if (!validImageTypes.includes(fileType)) {
                alert('This file must be JPEG, JPG or PNG image');
                file = null;
                document.getElementById(name).value = null;
            }

            if (name === 'cover_image') {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: file
                }));
            }

            if (name === 'images') {
                formData.images = files;
            }
        }
    };

    const resolveWorkingTimes = () => {
        formData.working_times = JSON.stringify({
            'Monday': {
                'start_time': formData.monday_start,
                'end_time': formData.monday_end,
            },
            'Tuesday': {
                'start_time': formData.tuesday_start,
                'end_time': formData.tuesday_end,
            },
            'Wednesday': {
                'start_time': formData.wednesday_start,
                'end_time': formData.wednesday_end,
            },
            'Thursday': {
                'start_time': formData.thursday_start,
                'end_time': formData.thursday_end,
            },
            'Friday': {
                'start_time': formData.friday_start,
                'end_time': formData.friday_end,
            },
            'Saturday': {
                'start_time': formData.saturday_start,
                'end_time': formData.saturday_end,
            },
            'Sunday': {
                'start_time': formData.sunday_start,
                'end_time': formData.sunday_end,
            },
        });

        delete formData.monday_start;
        delete formData.monday_end;
        delete formData.tuesday_start;
        delete formData.tuesday_end;
        delete formData.wednesday_start;
        delete formData.wednesday_end;
        delete formData.thursday_start;
        delete formData.thursday_end;
        delete formData.friday_start;
        delete formData.friday_end;
        delete formData.saturday_start;
        delete formData.saturday_end;
        delete formData.sunday_start;
        delete formData.sunday_end;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        resolveWorkingTimes();
        if (id) {
            await gymService.update(gym.id, JSON.stringify(formData));
            window.location.href = 'http://localhost:3000/business/gyms/view/' + gym.id;
        } else {
            let response = await gymService.store(formData);
            if(response){
                redirectService.toBusinessMainPage();
            }
        }
    };

    const getFieldClassName = (fieldName) => {
        if (validFields[fieldName]) {
            return 'form-control is-valid';
        }

        if (validFields[fieldName] === false) {
            return 'form-control is-invalid';
        }

        return 'form-control';
    };

    return {
        formData,
        handleInputChange,
        imageChange: fileChange,
        handleSubmit,
        getFieldClassName,
        id,
        gym,
    };
};

export default RegisterService;