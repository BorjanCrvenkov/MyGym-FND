const BusinessIndexedGymDisplay = ({gym}) => {
    return (
        <div className="col-4" style={{width: '550px', height: '300px'}}>
            <div className='card custom-card-styles'>
                <img className="card-img-top" src={gym.cover_image.link} style={{width: '525px', height: '200px'}}
                     alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{gym.name}</h5>
                    {
                        !gym.shutdown &&
                        <a href={'/business/gyms/view/' + gym.id} className="btn card-button rounded-4">View gym</a>
                    }
                    {
                        gym.shutdown &&
                        <p>Gym shutdown date: {gym.shutdown_date}</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default BusinessIndexedGymDisplay;