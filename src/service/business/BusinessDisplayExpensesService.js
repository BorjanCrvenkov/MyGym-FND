import {useEffect, useState} from 'react';
import ExpenseService from "../modelService/ExpensesService";
import ExpenseStatusEnum from "../../enum/ExpenseStatusEnum";
import ExpenseTypeService from "../modelService/ExpenseTypeService";

const BusinessDisplayExpensesService = (gymId) => {
    const expenseService = new ExpenseService();

    const fetchExpenses = async () => {
        let requestFilters = {
            'gym_id': gymId,
        }

        return await expenseService.index(requestFilters);
    }

    const [expenses, setExpenses] = useState([]);

    const fetchAndSetExpenses = async () => {
        const expensesData = await fetchExpenses();
        setExpenses(expensesData);
    };

    const refreshData = async () => {
        await fetchAndSetExpenses();
    };

    const markAsPaid = async (id) => {
        await expenseService.update(id, JSON.stringify({status: ExpenseStatusEnum.PAID}))
        await refreshData()
    }

    const [expenseTypes, setExpenseTypes] = useState([]);
    const expenseTypeService = new ExpenseTypeService();

    const fetchExpenseTypes = async () => {
        let requestFilters = {
            'gym_id': gymId,
        }

        return await expenseTypeService.index(requestFilters);
    }

    const fetchAndSetExpenseTypes = async () => {
        const expenseTypesData = await fetchExpenseTypes();
        setExpenseTypes(expenseTypesData);
    };

    useEffect(() => {
        fetchAndSetExpenses();
        fetchAndSetExpenseTypes();
    }, []);

    return {
        expenses,
        refreshData,
        markAsPaid,
        expenseTypes,
    };
};

export default BusinessDisplayExpensesService;