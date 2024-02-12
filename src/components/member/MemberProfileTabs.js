import {Tab, Tabs} from "react-bootstrap";
import ViewTabsService from "../../service/ViewTabsService";
import MemberMembershipsTab from "./MemberMembershipsTab";
import MemberReviewsTab from "./MemberReviewsTab";

const MemberProfileTabs = ({user}) => {
    const {
        activeTab,
        handleTabChange,
    } = ViewTabsService('memberships');

    return (
        <div className='mt-2'>
            <Tabs activeKey={activeTab} onSelect={handleTabChange} className='tabs'>
                <Tab eventKey='memberships' title='Memberships'>
                    <MemberMembershipsTab userId={user.id}/>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                    <MemberReviewsTab userId={user.id} />
                </Tab>
            </Tabs>
        </div>
    );
}

export default MemberProfileTabs;