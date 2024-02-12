import React from 'react';
import EquipmentModalForm from './EquipmentModalForm';

const BusinessIndexedEquipmentDisplay = ({ equipment, refreshData, shutdown }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card custom-card-styles">
                <img className="card-img-top" src={equipment.image.link} alt="Equipment" style={{ height: '250px', 'background-color': 'white'}} />
                <div className="card-body">
                    <h5 className="card-title">{equipment.name}</h5>
                    <p className="card-text">{equipment.description}</p>

                    <table className="table table-bordered">
                        <thead style={{'border-color': '#decd80'}}>
                        <tr>
                            <th scope="col" style={{'background-color': '#202020', color: '#decd80'}}>Last service date</th>
                            <th scope="col" style={{'background-color': '#202020', color: '#decd80'}}>Next service date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr style={{'border-color': '#decd80'}}>
                            <td style={{'background-color': '#202020', color: '#decd80'}}>{equipment.last_service_date || '/'}</td>
                            <td style={{'background-color': '#202020', color: '#decd80'}}>{equipment.next_service_date || '/'}</td>
                        </tr>
                        </tbody>
                    </table>
                    {!shutdown && (
                        <div className="mt-3">
                            <EquipmentModalForm equipment={equipment} refreshData={refreshData} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BusinessIndexedEquipmentDisplay;
