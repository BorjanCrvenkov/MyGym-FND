import {useEffect, useState} from 'react';
import MembershipTypeService from "../modelService/MembershipTypeService";

const MembershipTypeModalFormService = (gymId, refreshData, membershipType) => {
    const [show, setShow] = useState(false);

    const resolveInitialFormData = () => {
        return membershipType == null ? {
                name: '',
                description: '',
                price: 0,
                duration_weeks: 0,
            } :
            {
                name: membershipType.name,
                description: membershipType.description,
                price: membershipType.price,
                duration_weeks: membershipType.duration_weeks,
            };
    }

    const [formData, setFormData] = useState(resolveInitialFormData);
    const [formErrors, setFormErrors] = useState({});
    const membershipTypeService = new MembershipTypeService();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};

        if (formData.name.trim() === '') {
            errors.name = 'Name is required';
        }

        if (formData.description.trim() === '') {
            errors.description = 'Description is required';
        }

        if (formData.price <= 0) {
            errors.price = 'Price must be greater than 0';
        }

        if (formData.duration_weeks <= 0) {
            errors.duration_weeks = 'Duration must be greater than 0';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return
        }

        formData.gym_id = gymId;

        if(membershipType != null){
            membershipTypeService.update(membershipType.id, JSON.stringify(formData));
        }else {
            membershipTypeService.store(formData);
        }

        setFormData({
            name: '',
            description: '',
            price: 0,
            duration_weeks: 0,
        });

        refreshData();
        handleClose();
    };

    return {
        show,
        handleShow,
        handleClose,
        formErrors,
        handleSubmit,
        formData,
        handleInputChange,
    }};

export default MembershipTypeModalFormService;