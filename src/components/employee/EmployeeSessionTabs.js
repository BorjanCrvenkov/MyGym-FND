import {Tab, Tabs} from "react-bootstrap";
import EmployeeNotStartedSessions from "./EmployeeNotStartedSessions";
import EmployeeStartedSessions from "./EmployeeStartedSessions";
import {useState} from "react";

const EmployeeSessionTabs = () => {
    const [eventKey, setEventKey] = useState('not_started_sessions');

    const handleTabSelect = (selectedKey) => {
        setEventKey(selectedKey);
    };

    return (
        <div>
            <Tabs activeKey={eventKey} onSelect={handleTabSelect} className='tabs'>
                <Tab eventKey='not_started_sessions' title='Not started sessions'>
                    <EmployeeNotStartedSessions />
                </Tab>
                <Tab eventKey="started_sessions" title="In progress sessions">
                    {eventKey === 'started_sessions' && <EmployeeStartedSessions />}
                </Tab>
            </Tabs>
        </div>
    );
}
export default EmployeeSessionTabs;