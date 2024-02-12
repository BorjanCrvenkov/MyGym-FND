import {useEffect, useState} from 'react';
import GymService from "../modelService/GymService";
import {useParams} from "react-router-dom";

const BusinessViewGymService = () => {
    const { id } = useParams();
    const gymService = new GymService();

    const fetchGym = async () => {
        if(id == null){
            return null;
        }

        let includes = [
            'cover_image',
            'social_media_links',
        ];

        return await gymService.show(id, includes);
    }

    const [gym, setGym] = useState([]);
    const [parsedWorkingTimes, setParsedWorkingTimes] = useState([]);

    useEffect(() => {
        const fetchAndSetGym = async () => {
            const gymData = await fetchGym();
            setGym(gymData);
            parseWorkingTimes(gymData)
        };
        fetchAndSetGym();

    }, []);

    const parseWorkingTimes = (gym) => {
        if(gym == null){
            return null;
        }

        let wt = JSON.parse(gym.working_times);

        wt = Object.entries(wt).map(([day, { start_time, end_time }]) => ({
            day,
            start_time,
            end_time
        }));

        setParsedWorkingTimes(wt)
    }

    return { gym, parsedWorkingTimes };
};

export default BusinessViewGymService;