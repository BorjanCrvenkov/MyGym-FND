import {useEffect, useState} from "react";
import PlanService from "../modelService/PlanService";

const DisplayPlansModalService = () => {

    const checkIfQueryParamsContainPlanAndOpenModal = () => {
        const queryParams = new URLSearchParams(window.location.search);

        if (queryParams.has('plans')){
            setShow(true)
        }
    }

    const [show, setShow] = useState(false);

    const planService = new PlanService();

    const handleClose = () => {
        const newUrl = window.location.pathname;
        window.history.replaceState(null, '', newUrl);

        setShow(false);
    }
    const handleShow = () => {
        setShow(true);

        let location = window.location;
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('plans', '');

        const newUrl = `${location.pathname}?${queryParams.toString()}`;
        window.history.replaceState(null, '', newUrl);
    }

    const [monthlyPlans, setMonthlyPlans] = useState([]);
    const [yearlyPlans, setYearlyPlans] = useState([]);


    const fetchPlans = async () => {
        return await planService.index();
    }

    const fetchAndSetPlans = async () => {
        const plansData = await fetchPlans();

        setMonthlyPlans(plansData.filter(plan => plan.duration_months === 1))
        setYearlyPlans(plansData.filter(plan => plan.duration_months === 12))
    };

    useEffect(() => {
        fetchAndSetPlans();
        checkIfQueryParamsContainPlanAndOpenModal()
    }, []);

    return {
        show,
        handleShow,
        handleClose,
        monthlyPlans,
        yearlyPlans,
    }
};

export default DisplayPlansModalService;