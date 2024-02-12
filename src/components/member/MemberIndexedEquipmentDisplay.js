
const MemberIndexedEquipmentDisplay = ({equipment}) => {
    return (
        <div className='col-6'>
            <div className="card m-1 custom-card-styles rounded-4" style={{width: '580px'}}>
                <img className="card-img-top rounded-4" src={equipment.image.link} style={{width: '579px', height: '300px', 'background-color': 'white'}}/>
                <div className="card-body">
                    <h5 className="card-title">{equipment.name}</h5>
                    <p className="card-text">{equipment.description}.</p>
                </div>
            </div>
        </div>
    );
}

export default MemberIndexedEquipmentDisplay;