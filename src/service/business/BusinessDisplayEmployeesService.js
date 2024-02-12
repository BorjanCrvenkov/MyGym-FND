import {useEffect, useState} from "react";
import UserService from "../modelService/UserService";

const BusinessDisplayEmployeesService = (gymId, setParentEmployees) => {
    const userService = new UserService();

    const fetchEmployees = async () => {
        let filters = {
            'gym_id': gymId,
        }

        return await userService.index(filters);
    }

    const [employees, setEmployees] = useState([]);

    const fetchAndSetEmployees = async () => {
        const employeeData = await fetchEmployees();
        setEmployees(employeeData);
        setParentEmployees(employeeData);
    };

    useEffect( () => {
        fetchAndSetEmployees();
    }, []);

    const refreshData = async () => {
        await fetchAndSetEmployees();
    };

    return { employees, refreshData };
};

export default BusinessDisplayEmployeesService;