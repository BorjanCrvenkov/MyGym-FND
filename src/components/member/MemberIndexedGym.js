import React from 'react';
import StarRating from '../StarRating';

const MemberIndexedGym = ({ gym, setGym }) => {
    const viewGym = (gym) => {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('gymId', gym.id);

        const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
        window.history.replaceState(null, '', newUrl);
        setGym(gym);
    };

    return (
        <div className="mb-3">
            <div className="card custom-card-styles rounded-4">
                <div className="row no-gutters">
                    <div className="col-md-5">
                        <img
                            src={gym.cover_image.link}
                            style={{'width': '400px', height: '220px'}}
                            alt="Gym Cover"
                            className="img-fluid rounded-left rounded-4"
                        />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <h5 className="card-title">{gym.name}</h5>
                            <div className="mb-2">
                                <p className="card-text mb-0">Rating:</p>
                                <StarRating value={gym.rating} color={'#202020'}/>
                            </div>
                            <p className="card-text">
                                Active sessions: {gym.active_sessions_count}
                            </p>
                            <button
                                className="btn btn-block card-button rounded-4"
                                onClick={() => viewGym(gym)}
                            >
                                View Gym
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberIndexedGym;
