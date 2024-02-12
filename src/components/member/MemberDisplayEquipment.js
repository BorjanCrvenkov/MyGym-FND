import BusinessDisplayEquipmentService from "../../service/business/BusinessDisplayEquipmentService";
import MemberIndexedEquipmentDisplay from "./MemberIndexedEquipmentDisplay";

const BusinessDisplayEquipment = ({gymId}) => {
    const {equipments, refreshData} = BusinessDisplayEquipmentService(gymId);

    let location = window.location;
    const queryParams = new URLSearchParams(location.search);

    if(gymId !== Number.parseInt(queryParams.get('gymId'))){
        refreshData()
    }

    return (
        <div className='mt-3 row overflow-auto' style={{height: '540px'}}>
            <h3>Gym Equipment</h3>
            <hr/>
            {
                equipments.map(equipment => (
                    <MemberIndexedEquipmentDisplay equipment={equipment} refreshData={refreshData}/>
                ))
            }
        </div>
    );
}

export default BusinessDisplayEquipment;