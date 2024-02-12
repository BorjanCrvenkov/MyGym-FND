import EmployeeModalForm from "./EmployeeModalForm";

const BusinessIndexedEmployeeDisplay = ({employee, refreshData, shutdown}) => {
    return (
        <div className='col-2 mt-2' style={{'margin-left': '40px'}}>
            <div className="card m-1 custom-card-styles" style={{width: '300px'}}>
                <img className="card-img-top" src={employee?.image?.link} style={{width: '298px', height: '200px'}}
                     alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{employee.first_name} {employee.last_name}</h5>
                    {
                        !shutdown &&
                        <div>
                            <EmployeeModalForm employee={employee} refreshData={refreshData}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default BusinessIndexedEmployeeDisplay;