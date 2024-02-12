import BusinessDisplayMembershipTypesService from "../../service/business/BusinessDisplayMembershipTypesService";
import BusinessIndexedMembershipTypeDisplay from "./BusinessIndexedMembershipTypeDisplay";
import MembershipTypeModalForm from "./MembershipTypeModalForm";
import EquipmentModalForm from "./EquipmentModalForm";

const BusinessDisplayMembershipTypes = ({gymId}) => {
    const {membershipTypes, refreshData} = BusinessDisplayMembershipTypesService(gymId);

    return (
        <div className='mt-3' style={{height: '530px'}}>
            <div className="row align-items-center">
                <h3 className='col-9'>Gym Memberships Types</h3>
                <div className="col-md-3 text-md-end" style={{'margin-left': '-45px'}}>
                    <MembershipTypeModalForm gymId={gymId} refreshData={refreshData} />
                </div>
            </div>
            <hr/>
            <div className="row overflow-auto" style={{maxHeight: '530px'}}>
            {
                membershipTypes.map(membershipType => (
                    <BusinessIndexedMembershipTypeDisplay membershipType={membershipType} refreshData={refreshData}/>
                ))
            }
            </div>
        </div>
    );
}

export default BusinessDisplayMembershipTypes;