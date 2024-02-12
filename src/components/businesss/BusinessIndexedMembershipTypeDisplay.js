import MembershipTypeModalForm from "./MembershipTypeModalForm";

const BusinessIndexedMembershipTypeDisplay = ({membershipType, refreshData, shutdown}) => {
    return (
        <div className='col-6 mt-2'>
            <div className="card custom-card-styles">
                <div className="card-body">
                    <h5 className="card-title">{membershipType.name}</h5>
                    <p className="card-text">{membershipType.description}.</p>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col" style={{'background-color': '#202020', color: '#decd80'}}>Price</th>
                            <th scope="col" style={{'background-color': '#202020', color: '#decd80'}}>Weeks duration</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr style={{'border-color': '#decd80'}}>
                            <td style={{'background-color': '#202020', color: '#decd80'}}>{membershipType.price}</td>
                            <td style={{'background-color': '#202020', color: '#decd80'}}>{membershipType.duration_weeks}</td>
                        </tr>
                        </tbody>
                    </table>
                    {
                        !shutdown &&
                        <div>
                            <MembershipTypeModalForm membershipType={membershipType} refreshData={refreshData}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default BusinessIndexedMembershipTypeDisplay;