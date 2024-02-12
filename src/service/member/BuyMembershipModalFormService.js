import {useEffect, useState} from "react";
import MembershipService from "../modelService/MembershipService";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import DisplayNotificationService from "../DisplayNotificationService";

const BuyMembershipModalFormService = (membershipTypeId, refreshData) => {
    const membershipService = new MembershipService();
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        start_date: null,
        user_id: JSON.parse(localStorage.getItem('user')).id,
        membership_type_id: membershipTypeId
    });

    const [formErrors, setFormErrors] = useState({});

    const stripe = useStripe();
    const elements = useElements();
    const [name, setName] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};

        if (formData.start_date === null) {
            errors.start_date = 'Start date is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        document.getElementById('pay-button').disabled = true;

        if (!validateForm()) {
            document.getElementById('pay-button').disabled = false;
            return
        }

        if (!name) {
            setErrorMessage("Please enter the name on the card.");
            document.getElementById('pay-button').disabled = false;
            return;
        }

        setErrorMessage("");

        if (!stripe || !elements) {
            setErrorMessage("Stripe is not initialized.");
            document.getElementById('pay-button').disabled = false;
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setErrorMessage("Card information is invalid.");
            document.getElementById('pay-button').disabled = false;
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
                name,
            },
        });

        if (error) {
            setErrorMessage(error.message);
            document.getElementById('pay-button').disabled = false;
            return;
        }

        try {
            formData.payment_method_id = paymentMethod.id;

            await membershipService.store(formData)
            document.getElementById('pay-button').disabled = false;
            setName('');
            handleClose();
            new DisplayNotificationService().showSuccessNotification('Successfully bought membership!')
        } catch (error) {
            console.log(error)
            setErrorMessage("An error occurred during payment processing.");
            document.getElementById('pay-button').disabled = false;
        }

        refreshData()
        handleClose();
    };

    const getMaxDate = () => {
        const today = new Date();
        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)
        let month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        let day = String(tomorrow.getDate()).padStart(2, '0');
        const year = tomorrow.getFullYear();

        return `${year}-${month}-${day}`;
    };

    return {
        show,
        handleShow,
        handleClose,
        formErrors,
        handleSubmit,
        formData,
        handleInputChange,
        getMaxDate,
        name,
        setName,
        errorMessage,
    }
};

export default BuyMembershipModalFormService;