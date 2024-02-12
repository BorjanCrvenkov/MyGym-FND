import BuyMembershipModalForm from "./BuyMembershipModalForm";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51NVXLtGaXOwp86oK1XegHzLdKO7vrB7M92iieqBbo7pNW9iBKwvv2Tcq2IhFsi5qF1tIv0vdGxpo8cGU1jOhwmnC00orCy4g6h");

const MemberIndexedMembershipTypeDisplay = ({membershipType, refreshData}) => {
    return (
        <div className='col-6 mt-2'>
            <div className="card custom-card-styles rounded-4">
                <div className="card-body">
                    <h5 className="card-title">{membershipType.name}</h5>
                    <p className="card-text">{membershipType.description}</p>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col" style={{'background-color': '#202020', color: '#decd80'}}>Price</th>
                            <th scope="col" style={{'background-color': '#202020', color: '#decd80'}}>Weeks duration</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{'background-color': '#202020', color: '#decd80'}}>{membershipType.price}</td>
                            <td style={{'background-color': '#202020', color: '#decd80'}}>{membershipType.duration_weeks}</td>
                        </tr>
                        </tbody>
                    </table>
                    {
                        membershipType.is_active &&
                        <div>
                            Valid until: {membershipType.valid_until}
                        </div>
                    }
                    {
                        !membershipType.is_active &&
                        <div>
                            <Elements stripe={stripePromise} >
                                <BuyMembershipModalForm membershipType={membershipType} refreshData={refreshData}/>
                            </Elements>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default MemberIndexedMembershipTypeDisplay;