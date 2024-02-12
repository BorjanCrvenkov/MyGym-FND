import EmployeeSessionTabs from "./EmployeeSessionTabs";
import EmployeeMainPageService from "../../service/employee/EmployeeMainPageService";
import EmployeeReportProblemModalForm from "./EmployeeReportProblemModalForm";

const EmployeeMainPage = () => {
    const {gym} = EmployeeMainPageService()

    if(!gym){
        return <div>Loading</div>
    }

    return (
        <div>
            {
                gym.shutdown &&
                <div>
                    Gym shutdown date: {gym.shutdown_date}
                </div>
            }
            {
                !gym.shutdown &&
                <div className='mt-4 row'>
                    <h3 className='col-9'>{gym.name}</h3>
                    <div className='col-3'>
                        <EmployeeReportProblemModalForm gym={gym}/>
                    </div>
                    <hr/>
                    <div>
                        <EmployeeSessionTabs/>
                    </div>
                </div>
            }
        </div>
    );
}

export default EmployeeMainPage;