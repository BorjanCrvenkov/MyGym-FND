import {useState, useLayoutEffect, useEffect} from 'react';
import GymService from "../modelService/GymService";

const MemberViewGymService = ({selectedGym}) => {
    const gymService = new GymService();
    const [gym, setGym] = useState(null);
    const [parsedWorkingTimes, setParsedWorkingTimes] = useState(null);
    const queryParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        let gymId = queryParams.get('gymId') ?? selectedGym?.id;
        const fetchGymData = async () => {
            if (gymId && gymId != gym?.id) {
                let includes = [
                    'cover_image',
                    'social_media_links',
                ];

                const fetchedGym = await gymService.show(gymId, includes);
                setGym(fetchedGym);
                parseWorkingTimes(fetchedGym);
            }
        };
        fetchGymData();
    }, [gymService]);

    const parseWorkingTimes = (gym) => {
        if (gym == null) {
            return null;
        }

        let wt = JSON.parse(gym.working_times);

        wt = Object.entries(wt).map(([day, { start_time, end_time }]) => ({
            day,
            start_time,
            end_time
        }));

        setParsedWorkingTimes(wt);
    };

    return { gym, parsedWorkingTimes };
};

export default MemberViewGymService;
