import BusinessDisplayEquipmentService from "../../service/business/BusinessDisplayEquipmentService";
import BusinessIndexedEquipmentDisplay from "./BusinessIndexedEquipmentDisplay";
import EquipmentModalForm from "./EquipmentModalForm";

const BusinessDisplayEquipment = ({gymId}) => {
    const {equipments, refreshData} = BusinessDisplayEquipmentService(gymId);

    return (
        <div className='mt-3' style={{height: '530px'}}>
            <div className="row align-items-center">
                <h3 className='col-9'>Gym Equipment</h3>
                <div className="col-md-3 text-md-end" style={{'margin-left': '-45px'}}>
                    <EquipmentModalForm gymId={gymId} refreshData={refreshData}/>
                </div>
            </div>
            <hr/>
            <div className="row overflow-auto" style={{maxHeight: '530px'}}>
                {
                    equipments.map(equipment => (
                        <BusinessIndexedEquipmentDisplay equipment={equipment} refreshData={refreshData}/>
                    ))
                }
            </div>
        </div>
    );
}

export default BusinessDisplayEquipment;