import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/gymStyles.css';
import BusinessMainPageService from '../../service/business/BusinessMainPageService';
import BusinessIndexedGymDisplay from './BusinessIndexedGymDisplay';
import DisplayPlansModal from './DisplayPlansModal';

const BusinessMainPage = () => {
    const {gyms} = BusinessMainPageService();

    let loggedInUser = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <div className="mt-3">
                <div className="col-12 text-center mb-4">
                    <h1>My Gyms</h1>
                    <div className='row'>
                        <span className='col-5'></span>
                        <div className='col-1'>
                            <DisplayPlansModal/>
                        </div>
                        <div className='col-2' style={{'margin-left': '-80px'}}>
                            {loggedInUser.can_register_gyms && (
                                <Link to="/business/register_gym" className="btn regular-button rounded-4">
                                    Register Gym
                                </Link>
                            )}
                            {loggedInUser.plan_id && !loggedInUser.can_register_gyms && (
                                <p style={{'margin-left': '50px'}}>You cannot register any more gyms on this plan</p>
                            )}
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
            <div className="row mt-4 overflow-auto" style={{height: '800px'}}>
                {gyms.map((gym) => (
                    <BusinessIndexedGymDisplay key={gym.id} gym={gym}/>
                ))}
            </div>
        </div>
    );
};

export default BusinessMainPage;
