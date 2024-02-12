import {useEffect, useState} from 'react';
import GymService from "../modelService/GymService";
const BusinessMainPageService = () => {
    const gymService = new GymService();

    const fetchGyms = async () => {
        let includes = [
            'cover_image',
        ];

        return await gymService.index(null, null, includes);
    }

    const [gyms, setGyms] = useState([]);

    useEffect(() => {
        const fetchAndSetGyms = async () => {
            const gymsData = await fetchGyms();
            setGyms(gymsData);
        };
        fetchAndSetGyms();
    }, []);

    return { gyms, setGyms };
};

export default BusinessMainPageService;