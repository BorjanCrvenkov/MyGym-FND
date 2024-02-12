import MemberViewGymTabs from "./MemberViewGymTabs";
import StarRating from "../StarRating";
import React from "react";
import GymSocialMediaLinks from "../GymSocialMediaLinks";
import MemberViewGymService from "../../service/member/MemberViewGymService";

const MemberViewGym = ({selectedGym}) => {
    const {
        gym,
        parsedWorkingTimes,
    } = MemberViewGymService(selectedGym);

    if (!gym) {
        return (
            <div className='text-center'>
                <h3>Select gym</h3>
            </div>
        );
    }

    return (
        <div className='row mt-1'>
            <h3>{gym.name}</h3>
            <hr />
            <div className='col-5'>
                <img src={gym.cover_image.link} style={{ width: '490px', height: '250px' }} alt="Card image cap" className='rounded-4'/>
            </div>
            <div className='col-7'>
                <p>Address: {gym.address}</p>
                <p>Date opened: {gym.date_opened}</p>
                <p>Phone number: {gym.phone_number}</p>
                <div className='row'>
                    <p className='col-1' style={{ 'margin-right': '15px' }}>Rating:</p>
                    <div className='col-6'>
                        <StarRating value={gym.rating} />
                    </div>
                </div>
                {
                    gym.email &&
                    <p>Email: {gym.email}</p>
                }
                <GymSocialMediaLinks gym={gym} />
            </div>
            <div>
                <MemberViewGymTabs gym={gym} parsedWorkingTimes={parsedWorkingTimes} />
            </div>
        </div>
    );
}

export default MemberViewGym;
