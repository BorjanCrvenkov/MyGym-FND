import React, { useState } from "react";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "./repository/axiosAPI";

const stripePromise = loadStripe("pk_test_51NVXLtGaXOwp86oK1XegHzLdKO7vrB7M92iieqBbo7pNW9iBKwvv2Tcq2IhFsi5qF1tIv0vdGxpo8cGU1jOhwmnC00orCy4g6h");

const StripePaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name) {
            setErrorMessage("Please enter the name on the card.");
            return;
        }

        setErrorMessage("");

        if (!stripe || !elements) {
            setErrorMessage("Stripe is not initialized.");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setErrorMessage("Card information is invalid.");
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
                name,
            },
        });

        if (error) {
            setErrorMessage(error.message);
            return;
        }

        try {
            await axios.post(
                "http://localhost:80/api/plans/subscribe",
                {
                    payment_method_id: paymentMethod.id,
                    plan_id: 1,
                }
            );

            setSuccessMessage("Payment successful!");
            setName("");
        } catch (error) {
            console.log(error)
            setErrorMessage("An error occurred during payment processing.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                        <div>
                                <h3 className="text-center">Payment Details</h3>
                        <div>
                            {successMessage && (
                                <div className="alert alert-success text-center">
                                    <p>{successMessage}</p>
                                    <button
                                        className='btn btn-success close'
                                        type="button"
                                        onClick={() => setSuccessMessage("")}
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger text-center">
                                    <p>{errorMessage}</p>
                                </div>
                            )}
                            <form onSubmit={handleSubmit} id="payment-form">
                                <div className="form-group">
                                    <label className="control-label">Cardholder name</label>{" "}
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <CardElement options={{ style: { base: { fontSize: "18px" } }, hidePostalCode: true }} />
                                </div>
                                <div className='mt-3'>
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                        >
                                            Pay Now ($100)
                                        </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StripePaymentGateway = () => {
    return (
        <Elements stripe={stripePromise}>
            <StripePaymentForm />
        </Elements>
    );
};

export default StripePaymentGateway;
