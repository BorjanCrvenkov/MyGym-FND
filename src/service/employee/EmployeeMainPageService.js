import {useEffect, useState} from "react";
import GymService from "../modelService/GymService";

const EmployeeMainPageService = () => {
    const gymService = new GymService();

    const fetchGym = async () => {
        return await gymService.show(JSON.parse(localStorage.getItem('user')).gym_id);
    }

    const [gym, setGym] = useState(null);

    const fetchAndSetGym = async () => {
        const gymData = await fetchGym();
        setGym(gymData);
    };

    useEffect(async () => {
        await fetchAndSetGym();
    }, []);

    return { gym };
};

export default EmployeeMainPageService;