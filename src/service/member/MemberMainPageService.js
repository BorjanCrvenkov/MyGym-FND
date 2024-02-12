import {useEffect, useState} from "react";
import GymService from "../modelService/GymService";

const MemberMainPageService = () => {
    const [originalGyms, setOriginalGyms] = useState(null);
    const [showFilter, setShowFilter] = useState(false);

    const gymService = new GymService();
    const [gyms, setGyms] = useState([]);


    const fetchGyms = async () => {
        let filters = {
            shutdown: false
        }

        let includes = [
            'cover_image',
            'social_media_links',
        ];

        return await gymService.index(filters, null, includes);
    }


    useEffect(() => {
        const fetchAndSetGyms = async () => {
            const gymsData = await fetchGyms();
            setGyms(gymsData);
            setOriginalGyms(gymsData)
        };
        fetchAndSetGyms();
    }, []);

    const displayFilters = () => {
        if(originalGyms){
            setOriginalGyms(gyms)
        }

        setShowFilter(!showFilter)
    }

    const [gymFilters, setGymFilters] = useState({
        min_rating: null,
        max_rating: null,
    });

    const handleFilterInputChange = (e) => {
        const {name, value} = e.target;
        setGymFilters((filters) => ({
            ...filters,
            [name]: value,
        }));
    };

    const filterGyms = () => {
        let result = originalGyms;

        if (gymFilters.min_rating) {
            result = result.filter(gym => (
                gym.rating >= gymFilters.min_rating
            ));
        }

        if (gymFilters.max_rating) {
            result = result.filter(gym => (
                gym.rating <= gymFilters.max_rating
            ));
        }

        setGyms(result);
    }

    const resetFilters = () => {
        setGymFilters({
            min_rating: null,
            max_rating: null,
        })

        setGyms(originalGyms)
    }

    const search = (value) => {
        if (value.trim() === '') {
            document.getElementById('search').value = ''
            setGyms(originalGyms);
            return;
        }

        let result = originalGyms;

        let searchParam = value.toLowerCase();

        result = result.filter(gym => (
            gym.name.toLowerCase().includes(searchParam)
        ))

        setGyms(result);
    }

    return {
        gyms,
        showFilter,
        displayFilters,
        handleFilterInputChange,
        gymFilters,
        filterGyms,
        resetFilters,
        search,
    };
};

export default MemberMainPageService;