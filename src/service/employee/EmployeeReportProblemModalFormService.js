import {useState} from "react";
import ReportTypeEnum from "../../enum/ReportTypeEnum";
import ReportService from "../modelService/ReportService";
import DisplayNotificationService from "../DisplayNotificationService";

const EmployeeReportProblemModalFormService = (gym) => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        model_type: ReportTypeEnum.GYM_PROBLEM,
        reason: null,
        heading: null,
    });

    const reportService = new ReportService();
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateForm = () => {
        const errors = {};

        if (!formData.reason || formData.reason.trim() === '') {
            errors.reason = 'Reason is required';
        }

        if (!formData.heading || formData.heading.trim() === '') {
            errors.reason = 'Heading is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return
        }

        formData.model_id = gym.id;

        reportService.store(formData)

        setFormData({
            model_type: ReportTypeEnum.GYM_PROBLEM,
            reason: null,
        });

        handleClose();
        new DisplayNotificationService().showSuccessNotification('Report submitted!');
    };

    return {
        show,
        handleShow,
        handleClose,
        formErrors,
        handleSubmit,
        formData,
        handleInputChange,
    }
}

export default EmployeeReportProblemModalFormService;