import BusinessDisplayMembershipTypesService from "../../service/business/BusinessDisplayMembershipTypesService";
import MemberIndexedMembershipTypeDisplay from "./MemberIndexedMembershipTypeDisplay";

const MemberDisplayMembershipTypes = ({gymId}) => {
    const {membershipTypes, refreshData} = BusinessDisplayMembershipTypesService(gymId);

    let location = window.location;
    const queryParams = new URLSearchParams(location.search);

    if(gymId !== Number.parseInt(queryParams.get('gymId'))){
        refreshData()
    }

    return (
        <div className='mt-3 row overflow-auto' style={{height: '520px'}}>
            <h3 className='col-9'>Gym Memberships</h3>
            <hr/>
            {
                membershipTypes.map(membershipType => (
                    <MemberIndexedMembershipTypeDisplay membershipType={membershipType} refreshData={refreshData}/>
                ))
            }
        </div>
    );
}

export default MemberDisplayMembershipTypes;