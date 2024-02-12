import MemberSessionDescriptionModalForm from "./MemberSessionDescriptionModalForm";
import MemberDisplaySessionsService from "../../service/member/MemberDisplaySessionsService";

const MemberDisplaySessions = ({membership}) => {
    if(!membership){
        return <div>Loading</div>
    }

    const {
        sessions,
        refreshData,
    } = MemberDisplaySessionsService(membership);

    return (
        <div className='row'>
            {
                sessions.map((session, index) => (
                    <div className="card col-4 custom-card-styles rounded-4" key={index}  style={{'width': '615px', 'margin-left': '15px', 'margin-bottom': '10px'}}>
                        <div className="card-body">
                            <h5 className="card-title">Session #{sessions.length - index}</h5>
                            <p className="card-text">Time start: {session.time_start}</p>
                            {
                                session.time_end ?
                                    <p>
                                        Time end: {session.time_end}
                                    </p>
                                    :
                                    <p><strong>Active session</strong></p>
                            }
                            <p className="card-text">Session description: {session.description || '/'}</p>
                            <div>
                                <MemberSessionDescriptionModalForm session={session} refreshData={refreshData}/>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default MemberDisplaySessions;