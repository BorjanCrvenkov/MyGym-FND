import EmployeeSessionService from "../../service/employee/EmployeeSessionService";
import EmployeeUserSearch from "./EmployeeUserSearch";

const EmployeeNotStartedSessions = () => {
    const {
        filteredMemberships,
        startSession,
        search
    } = EmployeeSessionService(false);

    return (
        <div className='row' style={{'margin-left': '40px'}}>
            <EmployeeUserSearch search={search}/>
            <div className='row overflow-auto' style={{height: '760px'}}>
                {
                    filteredMemberships.map(membership => (
                        <div className='col-2 mt-3' style={{width: '301px'}}>
                            <div className="card custom-card-styles rounded-4">
                                <img className="card-img-top rounded-4" src={membership.user.image.link} style={{width: '277px', 'margin-left': '-1px','margin-top': '-1px'}}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{membership.user.first_name} {membership.user.last_name}</h5>
                                    <button id={'membership' + membership.id} className='btn card-button rounded-4'
                                            onClick={() => startSession(membership.id)}>Start session
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default EmployeeNotStartedSessions;