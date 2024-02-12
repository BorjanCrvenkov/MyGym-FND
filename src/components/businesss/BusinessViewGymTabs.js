import {Tab, Tabs} from 'react-bootstrap';
import BusinessDisplayEquipment from './BusinessDisplayEquipment';
import BusinessDisplayMembershipTypes from './BusinessDisplayMembershipTypes';
import BusinessDisplayGymImages from './BusinessDisplayGymImages';
import BusinessDisplayEmployees from './BusinessDisplayEmployees';
import BusinessDisplayReviews from './BusinessDisplayReviews';
import BusinessDisplayWorkingTimes from './BusinessDisplayWorkingTimes';
import ViewTabsService from "../../service/ViewTabsService";
import BusinessDisplayProblems from "./BusinessDisplayProblems";
import BusinessDisplayReports from "./BusinessDisplayReports";
import BusinessDisplayExpenseTypes from "./BusinessDisplayExpenseTypes";
import BusinessDisplayExpenses from "./BusinessDisplayExpenses";
import BusinessWorkingSchedule from "./BusinessWorkingSchedule";
import {useState} from "react";

const BusinessViewGymTabs = ({gym, parsedWorkingTimes}) => {
    const {
        activeTab,
        handleTabChange,
    } = ViewTabsService('employees');

    const [employees, setEmployees] = useState(null);

    return (
        <div className="mt-1">
            <Tabs activeKey={activeTab} onSelect={handleTabChange} className='tabs'>
                <Tab eventKey="employees" title="Employees">
                    <BusinessDisplayEmployees gym={gym} setParentEmployees={setEmployees}/>
                </Tab>
                <Tab eventKey="equipment" title="Equipment">
                    <BusinessDisplayEquipment gymId={gym.id}/>
                </Tab>
                <Tab eventKey="memberships" title="Membership Types">
                    <BusinessDisplayMembershipTypes gymId={gym.id}/>
                </Tab>
                <Tab eventKey="images" title="Images">
                    <BusinessDisplayGymImages gymId={gym.id}/>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                    <BusinessDisplayReviews gymId={gym.id}/>
                </Tab>
                <Tab eventKey={'working_hours'} title={'Working hours'}>
                    <BusinessDisplayWorkingTimes parsedWorkingTimes={parsedWorkingTimes}/>
                </Tab>
                <Tab eventKey={'problems'} title={'Problems'}>
                    <BusinessDisplayProblems gymId={gym.id}/>
                </Tab>
                <Tab eventKey={'expense_types'} title={'Expense types'}>
                    <BusinessDisplayExpenseTypes gymId={gym.id}/>
                </Tab>
                <Tab eventKey={'expenses'} title={'Expenses'}>
                    <BusinessDisplayExpenses gymId={gym.id}/>
                </Tab>
                <Tab eventKey={'reports'} title={'Reports'}>
                    <BusinessDisplayReports gymId={gym.id}/>
                </Tab>
                {
                    gym && !gym.shutdown_date &&
                    <Tab eventKey={'working_schedule'} title={'Working schedule'}>
                        {
                            employees &&
                            <BusinessWorkingSchedule gym={gym} employees={employees}/>
                        }
                    </Tab>
                }
            </Tabs>
        </div>
    );
};

export default BusinessViewGymTabs;
