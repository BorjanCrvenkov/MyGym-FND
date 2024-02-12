import React, {useState} from 'react';
import '../../styles/gymStyles.css';
import MemberIndexedGym from './MemberIndexedGym';
import MemberViewGym from './MemberViewGym';
import MemberMainPageService from '../../service/member/MemberMainPageService';
import GymFilters from './GymFilters';
import MemberGymSearch from './MemberGymSearch';

const MemberMainPage = () => {
    const {
        gyms,
        showFilter,
        displayFilters,
        handleFilterInputChange,
        gymFilters,
        filterGyms,
        resetFilters,
        search,
    } = MemberMainPageService();

    const [gym, setGym] = useState(false);

    return (
        <div className="mt-4">
            <div className="row">
                <div className="col-8 offset-md-2 mb-4">
                    <h1 className="text-center">Explore Gyms</h1>
                </div>
                <div className="col-8 offset-md-3">
                    <div>
                        <MemberGymSearch search={search}/>
                    </div>
                    <div className="text-center" style={{'margin-top': '-70px'}}>
                        <button
                            className="btn regular-button rounded-4"
                            style={{width: '350px', 'margin-left': '250px'}}
                            onClick={displayFilters}
                        >
                            {showFilter ? 'Hide' : 'Show'} Filters
                        </button>
                    </div>
                </div>
                {showFilter && (
                    <div className="col-md-8 offset-md-2">
                        <GymFilters
                            gymFilters={gymFilters}
                            handleFilterInputChange={handleFilterInputChange}
                            resetFilters={resetFilters}
                            filterGyms={filterGyms}
                        />
                    </div>
                )}
                <div className="col-md-12">
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mb-4 overflow-auto" style={{height: '910px'}}>
                    {gyms.map((gym) => (
                        <MemberIndexedGym
                            key={gym.id}
                            gym={gym}
                            setGym={setGym}
                        />
                    ))}
                </div>
                <div className="col-md-8">
                    <MemberViewGym selectedGym={gym}/>
                </div>
            </div>
        </div>
    );
};

export default MemberMainPage;
