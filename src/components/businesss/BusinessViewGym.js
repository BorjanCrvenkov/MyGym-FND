import BusinessViewGymService from "../../service/business/BusinessViewGymService";
import BusinessViewGymTabs from "./BusinessViewGymTabs";
import StarRating from "../StarRating";
import GymSocialMediaLinks from "../GymSocialMediaLinks";
import BusinessShutDownGymModal from "./BusinessShutDownGymModal";

const BusinessViewGym = () => {
    const {gym, parsedWorkingTimes} = BusinessViewGymService();

    if (gym.length === 0) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    }

    return (
        <div className='row mt-1'>
            <h3>{gym.name}</h3>
            <hr/>
            <div className='col-4'>
                <img src={gym.cover_image.link} style={{width: '540px', height: '250px'}} alt="Card image cap"/>
            </div>
            <div className='col-6'>
                {
                    gym.shutdown_date && gym.shutdown &&
                    <div className='alert alert-danger' style={{width: '250px', height: '55px'}}>
                        <p>Shutdown date: {gym.shutdown_date}</p>
                    </div>
                }
                <p>Address: {gym.address}</p>
                {
                    !gym.shutdown &&
                    <div className='float-end col-4 row' style={{'margin-top': '-45px', 'margin-right': '-230px'}}>
                        <a className='btn col-5 regular-button rounded-4' href={'/business/gyms/edit/' + gym.id}>Edit gym</a>
                        {
                            !gym.shutdown_date &&
                            <div className='col-7'>
                                <BusinessShutDownGymModal gymId={gym.id}/>
                            </div>
                        }
                    </div>
                }
                <p>Date opened: {gym.date_opened}</p>
                {
                    gym.shutdown &&
                    <p>Date shut down: {gym.shutdown_date}</p>
                }
                <p>Phone number: {gym.phone_number}</p>
                <div className='row'>
                    <p className='col-1'>Rating:</p>
                    <div className='col-5'>
                        <StarRating value={gym.rating}/>
                    </div>
                </div>
                <div>
                    <GymSocialMediaLinks gym={gym}/>
                </div>
            </div>
            <div>
                <BusinessViewGymTabs gym={gym} parsedWorkingTimes={parsedWorkingTimes}/>
            </div>
        </div>
    );
}

export default BusinessViewGym;