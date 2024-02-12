import BusinessDisplayEquipmentService from "../../service/business/BusinessDisplayGymImagesService";
import BusinessIndexedGymImage from "./BusinessIndexedGymImage";
import BusinessUploadGymImageModal from "./BusinessUploadGymImageModal";

const BusinessDisplayGymImages = ({gymId}) => {
    const {files, refreshData} = BusinessDisplayEquipmentService(gymId);

    return (
        <div className='mt-3' style={{height: '530px'}}>
            <div className="row align-items-center">
                <h3 className='col-9'>Images</h3>
                <div className="col-md-3 text-md-end" style={{'margin-left': '-45px'}}>
                    <BusinessUploadGymImageModal id={gymId} refreshData={refreshData}/>
                </div>
            </div>
            <hr/>
            <div className="row overflow-auto" style={{maxHeight: '530px'}}>
                {
                    files.map(file => (
                        <BusinessIndexedGymImage file={file} refreshData={refreshData}/>
                    ))
                }
            </div>
        </div>
    );
}

export default BusinessDisplayGymImages;