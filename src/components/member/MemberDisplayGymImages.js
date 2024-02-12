import BusinessDisplayEquipmentService from "../../service/business/BusinessDisplayGymImagesService";
import MemberIndexedGymImage from "./MemberIndexedGymImage";

const MemberDisplayGymImages = ({gymId}) => {
    const {files, refreshData} = BusinessDisplayEquipmentService(gymId);

    let location = window.location;
    const queryParams = new URLSearchParams(location.search);

    if (gymId !== Number.parseInt(queryParams.get('gymId'))) {
        refreshData()
    }

    return (
        <div className='mt-3 row overflow-auto' style={{height: '540px'}}>
            <h3 className='col-12'>Images</h3>
            <div className='row' style={{'margin-top': '-250px'}}>
                <hr/>
                {
                    files.map(file => (
                        <MemberIndexedGymImage file={file} refreshData={refreshData}/>
                    ))
                }
            </div>
        </div>
    );
}

export default MemberDisplayGymImages;