
import MemberMembershipsTabService from "../../service/member/MemberMembershipsTabService";
import MemberSessionDescriptionModalForm from "./MemberSessionDescriptionModalForm";
import MemberDisplaySessions from "./MemberDisplaySessions";

const MemberMembershipsTab = ({userId}) => {
    if(!userId){
        return <div>Loading</div>;
    }

    const {
        memberships
    } = MemberMembershipsTabService(userId);

    return (
        <div className='mt-2'>
            <h3>Memberships</h3>
            <hr/>
            {
                memberships.map(membership => (
                    <div className='mt-2'>
                        <h3>{membership.name} ({membership.start_date} - {membership.end_date})</h3>
                        <hr/>
                        <h4>Sessions</h4>
                        <div>
                            <MemberDisplaySessions membership={membership} />
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default MemberMembershipsTab;