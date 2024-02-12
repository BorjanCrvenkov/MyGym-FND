import {useEffect, useState} from 'react';
import ExpenseTypeService from "../modelService/ExpenseTypeService";

const BusinessDisplayExpenseTypesService = (gymId) => {
    const expenseTypeService = new ExpenseTypeService();

    const fetchExpenseTypes = async () => {
        let requestFilters = {
            'gym_id': gymId,
        }

        return await expenseTypeService.index(requestFilters);
    }

    const [expenseTypes, setExpenseTypes] = useState([]);

    const fetchAndSetExpenseTypes = async () => {
        const expenseTypesData = await fetchExpenseTypes();
        setExpenseTypes(expenseTypesData);
    };

    useEffect(() => {
        fetchAndSetExpenseTypes();
    }, []);

    const refreshData = async () => {
        await fetchAndSetExpenseTypes();
    };

    return {
        expenseTypes,
        refreshData,
    };
};

export default BusinessDisplayExpenseTypesService;