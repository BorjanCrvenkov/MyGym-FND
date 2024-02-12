import {useState} from "react";
import EquipmentService from "../modelService/EquipmentService";

const EquipmentModalFormService = (gymId, refreshData, equipment) => {
    const [show, setShow] = useState(false);

    const resolveInitialFormData = () => {
        return equipment == null ? {
                name: '',
                description: '',
                price: 0,
                last_service_date: null,
                next_service_date: null,
                image: null,
            }
            :
            {
                name: equipment.name,
                description: equipment.description,
                price: equipment.price,
                duration_weeks: equipment.duration_weeks,
                last_service_date: equipment.last_service_date,
                next_service_date: equipment.next_service_date,
                image: null,
            };
    }

    const [formData, setFormData] = useState(resolveInitialFormData);
    const [formErrors, setFormErrors] = useState({});
    const equipmentService = new EquipmentService();

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

        if (equipment) {
            return true;
        }

        if (formData.name.trim() === '') {
            errors.name = 'Name is required';
        }

        if (formData.description.trim() === '') {
            errors.description = 'Description is required';
        }

        if (formData.price <= 0) {
            errors.price = 'Price must be greater than 0';
        }

        if (formData.image == null) {
            errors.image = 'Image is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return
        }

        formData.gym_id = gymId;

        if (equipment != null) {
            equipmentService.update(equipment.id, JSON.stringify(formData));
        } else {
            equipmentService.store(formData);
        }

        refreshData();
        handleClose();
    };

    const fileChange = (event) => {
        event.preventDefault();

        formData.image = event.target.files[0];
    };

    return {
        show,
        handleShow,
        handleClose,
        formErrors,
        handleSubmit,
        formData,
        handleInputChange,
        fileChange
    }
};

export default EquipmentModalFormService;