import '../../styles/styles.css';
import BusinessBuyPlanModalForm from "../../components/businesss/BusinessBuyPlanModalForm";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51NVXLtGaXOwp86oK1XegHzLdKO7vrB7M92iieqBbo7pNW9iBKwvv2Tcq2IhFsi5qF1tIv0vdGxpo8cGU1jOhwmnC00orCy4g6h");

const BusinessPlanCard = ({plan, handleClose}) => {
    return (
        <div className='card custom-card-styles'  style={{'margin-left': '15px'}}>
                <div className="card-body">
                    <h5 className="card-title">{plan.name}</h5>
                    <p className="card-text">Number of allowed gyms: {plan.number_of_allowed_gyms}</p>
                    <p className="card-text">Number of allowed employees: {plan.number_of_allowed_employees}</p>
                    <p className="card-text">{plan.description}</p>
                    <Elements stripe={stripePromise}>
                        <BusinessBuyPlanModalForm plan={plan} parentHandleClose={handleClose}/>
                    </Elements>
                </div>
        </div>
    )
}

export default BusinessPlanCard;