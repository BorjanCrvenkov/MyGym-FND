import {useEffect, useState} from "react";
import UserService from "../modelService/UserService";
import ReportService from "../modelService/ReportService";
import DisplayNotificationService from "../DisplayNotificationService";

const BusinessDisplayProblemsService = (gymId) => {
    const reportService = new ReportService();

    const fetchProblems = async () => {
        let filters = {
            'gym_id': gymId,
        }

        let includes = [
            'reporter',
        ];

        return await reportService.index(filters, null, includes);
    }

    const [problems, setProblems] = useState([]);

    const fetchAndSetProblems = async () => {
        const problemData = await fetchProblems();
        setProblems(problemData);
    };

    useEffect(() => {
        fetchAndSetProblems();
    }, []);

    const resolveProblem = async (problem) => {
        await reportService.delete(problem.id)

        new DisplayNotificationService().showSuccessNotification('Marked as resolved!');

        await refreshData();
    }

    const refreshData = async () => {
        await fetchAndSetProblems();
    };

    return {
        problems,
        resolveProblem,
    };
};

export default BusinessDisplayProblemsService;