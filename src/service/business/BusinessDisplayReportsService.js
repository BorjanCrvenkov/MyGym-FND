import {useState} from "react";
import GenerateReportService from "../modelService/GenerateReportService";

const BusinessDisplayReportsService = (gymId) => {
    const [formData, setFormData] = useState({
        'start_date': null,
        'end_date': null,
    });

    const handleInputChange = async (event) => {
        const {name, value} = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!formData.start_date) {
            errors.start_date = 'Start date is required';
        }

        if (!formData.end_date) {
            errors.end_date = 'End date is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const generateReportService = new GenerateReportService();

    const generateGeneralReport = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        formData.gymId = gymId;

        return await generateReportService.generalReport(formData);
    };

    const generateMembershipsReport = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        formData.gymId = gymId;

        return await generateReportService.membershipsReport(formData);
    };

    const generateSessionsReport = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        formData.gymId = gymId;

        return await generateReportService.sessionsReport(formData);
    };

    const generateFinanceReport = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        formData.gymId = gymId;

        return await generateReportService.financeReport(formData);
    };

    return {
        handleInputChange,
        formErrors,
        generateGeneralReport,
        generateMembershipsReport,
        generateSessionsReport,
        generateFinanceReport,
    }
}

export default BusinessDisplayReportsService;