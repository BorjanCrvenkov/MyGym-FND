import {useState} from "react";
import ExpenseTypeService from "../modelService/ExpenseTypeService";

const ExpenseTypeModalFormService = (gymId, refreshData, expenseType) => {
    const [show, setShow] = useState(false);

    const resolveInitialFormData = () => {
        return expenseType == null ? {
                name: '',
                description: '',
                cost: '',
                recurring: false,
                recurring_every_number_of_days: null,
            }
            :
            {
                name: expenseType.name,
                description: expenseType.description,
                cost: expenseType.cost,
                recurring: expenseType.recurring,
                recurring_every_number_of_days: expenseType.recurring_every_number_of_days,
            };
    }

    const [formData, setFormData] = useState(resolveInitialFormData);
    const [formErrors, setFormErrors] = useState({});
    const expenseTypeService = new ExpenseTypeService();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if(name === 'recurring'){
            formData.recurring = !formData.recurring;
            if(formData.recurring){
                document.getElementById('formRecuringEveryNumberOfDays').removeAttribute('hidden');
                document.getElementById('recurring').checked = true
            }else{
                document.getElementById('formRecuringEveryNumberOfDays').setAttribute('hidden', 'true');
                document.getElementById('recurring').checked = false
                formData.recurring_every_number_of_days = null
                formData.next_recurring_date = null
            }
            return;
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};

        if (expenseType) {
            return true;
        }

        if (formData.name.trim() === '') {
            errors.name = 'Name is required';
        }

        if (formData.cost.trim() === '') {
            errors.cost = 'Cost is required';
        }

        if (formData.recurring && formData.recurring_every_number_of_days == null) {
            errors.recurring_every_number_of_days = 'Recurring frequency is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return
        }

        formData.gym_id = gymId;

        if (expenseType != null) {
            expenseTypeService.update(expenseType.id, JSON.stringify(formData));
        } else {
            expenseTypeService.store(formData);
        }

        refreshData();
        handleClose();
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        if (expenseType == null) {
            return;
        }

        await expenseTypeService.delete(expenseType.id);
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
        handleDelete,
    }
};

export default ExpenseTypeModalFormService;