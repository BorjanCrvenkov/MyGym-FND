
import React, {useState} from "react";
import SessionService from "../modelService/SessionService";

const MemberSessionDescriptionModalFormService = (session, refreshData) => {
    const sessionService= new SessionService();
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        description: session.description
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        console.log(formData)
        sessionService.update(session.id, JSON.stringify(formData));

        await refreshData();
        handleClose();
    };


    return {
        show,
        handleShow,
        handleClose,
        handleSubmit,
        formData,
        handleInputChange,
    }
};

export default MemberSessionDescriptionModalFormService;