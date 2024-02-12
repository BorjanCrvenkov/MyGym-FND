import {Tab, Tabs} from "react-bootstrap";
import MemberDisplayGymWorkingTimes from "./MemberDisplayGymWorkingTimes";
import MemberDisplayEquipment from "./MemberDisplayEquipment";
import MemberDisplayMembershipTypes from "./MemberDisplayMembershipTypes";
import MemberDisplayGymImages from "./MemberDisplayGymImages";
import MemberDisplayReviews from "./MemberDisplayReviews";
import ViewTabsService from "../../service/ViewTabsService";

const MemberViewGymTabs = ({gym, parsedWorkingTimes}) => {
    const {
        activeTab,
        handleTabChange,
    } = ViewTabsService('working_times');

    return (
        <div className='mt-2'>
            <Tabs activeKey={activeTab} onSelect={handleTabChange} className='tabs'>
                <Tab eventKey='working_times' title='Working Times'>
                    <MemberDisplayGymWorkingTimes parsedWorkingTimes={parsedWorkingTimes}/>
                </Tab>
                <Tab eventKey="equipment" title="Equipment">
                    <MemberDisplayEquipment gymId={gym.id}/>
                </Tab>
                <Tab eventKey="memberships" title="Memberships">
                    <MemberDisplayMembershipTypes gymId={gym.id}/>
                </Tab>
                <Tab eventKey="images" title="Images">
                    <MemberDisplayGymImages gymId={gym.id}/>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                    <MemberDisplayReviews gym={gym} />
                </Tab>
            </Tabs>
        </div>
    );
}

export default MemberViewGymTabs;