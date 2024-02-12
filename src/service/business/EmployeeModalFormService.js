import {useState} from "react";
import UserTypeEnum from "../../enum/UserTypeEnum";
import UserService from "../modelService/UserService";

const EmployeeModalFormService = (gymId, refreshData, employee) => {
    const [show, setShow] = useState(false);

    const resolveInitialFormData = () => {
        return employee == null ? {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                date_of_birth: null,
                image: null,
                identification_file: null,
                date_of_employment: null,
                bio: '',
                user_type: UserTypeEnum.EMPLOYEE
            }
            :
            {
                first_name: employee.first_name,
                last_name: employee.last_name,
                email: employee.email,
                date_of_birth: employee.date_of_birth,
                image: null,
                identification_file: null,
                date_of_employment: employee.date_of_employment,
                bio: employee.bio,
                user_type: UserTypeEnum.EMPLOYEE
            };
    }

    const [formData, setFormData] = useState(resolveInitialFormData);
    const [formErrors, setFormErrors] = useState({});
    const userService = new UserService();

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

        if (employee) {
            return true;
        }

        if (formData.first_name.trim() === '') {
            errors.first_name = 'First name is required';
        }

        if (formData.last_name.trim() === '') {
            errors.last_name = 'Last name is required';
        }

        if (formData.email.trim() === '') {
            errors.email = 'Email is required';
        }

        if (formData.password.trim() === '') {
            errors.password = 'Password is required';
        }

        if (formData.date_of_employment === null) {
            errors.date_of_employment = 'Employment date is required';
        }

        if (formData.image == null) {
            errors.image = 'Image is required';
        }

        if (formData.identification_file == null) {
            errors.identification_file = 'Identification file is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return
        }

        formData.gym_id = gymId;

        if (employee != null) {
            userService.update(employee.id, JSON.stringify(formData));
        } else {
            userService.store(formData);
        }

        refreshData();
        handleClose();
    };

    const fileChange = (event) => {
        event.preventDefault();

        let name = event.target.name;
        let file = event.target.files[0];

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: file
        }));
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

export default EmployeeModalFormService;