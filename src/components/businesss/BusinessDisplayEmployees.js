import React from 'react';
import BusinessIndexedEmployeeDisplay from './BusinessIndexedEmployeeDisplay';
import BusinessDisplayEmployeesService from '../../service/business/BusinessDisplayEmployeesService';
import EmployeeModalForm from './EmployeeModalForm';

const BusinessDisplayEmployees = ({gym, setParentEmployees}) => {
    const {employees, refreshData} = BusinessDisplayEmployeesService(gym.id, setParentEmployees);

    return (
        <div className="mt-3">
            <div className="row align-items-center">
                <div className={gym.can_owner_register_employees ? 'col-md-9' : 'col-md-7'}>
                    <h3>Gym Employees</h3>
                </div>
                <div className="col-md-3 text-md-end" style={{'margin-left': '-75px'}}>
                    <EmployeeModalForm gymId={gym.id} refreshData={refreshData}/>
                </div>
            </div>
            <hr/>
            <div className="row overflow-auto" style={{maxHeight: '530px'}}>
                {employees.map((employee) => (
                    <BusinessIndexedEmployeeDisplay
                        key={employee.id}
                        employee={employee}
                        refreshData={refreshData}
                    />
                ))}
            </div>
        </div>
    );
};

export default BusinessDisplayEmployees;
