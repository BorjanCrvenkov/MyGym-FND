import {useEffect, useState} from "react";
import ExpenseService from "../modelService/ExpensesService";

const ExpenseModalFormService = (gymId, refreshData, expense) => {
    const [show, setShow] = useState(false);

    const resolveInitialFormData = () => {
        return expense == null ? {
                status: null,
                expense_type_id: null
            }
            :
            {
                status: expense.status,
                expense_type_id: expense.expense_type_id
            };
    }

    const [formData, setFormData] = useState(resolveInitialFormData);
    const [formErrors, setFormErrors] = useState({});
    const expenseService = new ExpenseService();

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

        if (expense) {
            return true;
        }

        if (!formData.status){
            errors.status = 'Status is required';
        }

        if (!formData.expense_type_id) {
            errors.expense_type_id = 'Expense type is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return
        }

        if (expense != null) {
            expenseService.update(expense.id, JSON.stringify(formData));
        } else {
            expenseService.store(formData);
        }

        refreshData();
        handleClose();
    };

    return {
        show,
        handleShow,
        handleClose,
        formErrors,
        handleSubmit,
        handleInputChange,
    }
};

export default ExpenseModalFormService;