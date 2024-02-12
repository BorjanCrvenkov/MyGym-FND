import {useState} from "react";
import UserTypeEnum from "../../enum/UserTypeEnum";
import UserService from "../modelService/UserService";
import PlanService from "../modelService/PlanService";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import axios from "../../repository/axiosAPI";
import {loadStripe} from "@stripe/stripe-js";
import RedirectService from "../RedirectService";

const BusinessBuyPlanModalFormService = (plan, parentHandleClose) => {
    const [show, setShow] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [name, setName] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const planService = new PlanService();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault()

        document.getElementById('pay-button').disabled = true;

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
            let data = {
                payment_method_id: paymentMethod.id,
                plan_id: plan.id,
            };

            await planService.subscribe(data);

            setName('');
            await new UserService().refreshUserStoredData();
            document.getElementById('pay-button').disabled = false;
            handleClose();
            parentHandleClose();
            new RedirectService().toBusinessMainPage();
        } catch (error) {
            console.log(error)
            setErrorMessage("An error occurred during payment processing.");
        }
    };

    return {
        show,
        handleShow,
        handleClose,
        handleSubmit,
        name,
        setName,
        errorMessage,
    }
};

export default BusinessBuyPlanModalFormService;