import ViewProfileService from "../../service/ViewProfileService";
import MemberProfileTabs from "./MemberProfileTabs";
import EditMemberProfileForm from "../EditMemberProfileForm";

const ViewMemberProfile = () => {
    const {
        user,
    } = ViewProfileService();

    let loggedInUser = JSON.parse(localStorage.getItem('user'));

    return (
        <div className='row mt-1'>
            <h3>{user.first_name} {user.last_name}</h3>
            <hr/>
            <div className='col-3'>
                <a href={user?.image?.link} target='_blank'><img src={user?.image?.link} style={{width: '400px', height: '250px'}} alt="Card image cap"/></a>
            </div>
            <div className='col-6'>
                <p>Username: {user.username}</p>
                {
                    loggedInUser.id === user.id &&
                    <div className='float-end col-4' style={{'margin-top': '-45px', 'margin-right': '-470px'}}>
                        <EditMemberProfileForm user={user} />
                    </div>
                }
                <p>Email: {user.email}</p>
                <p>Date of birth: {user.date_of_birth || 'N/A'}</p>
                <p>Bio: {user.bio || 'N/A'}</p>
            </div>
            <div>
                <MemberProfileTabs user={user}/>
            </div>
        </div>
    );
}

export default ViewMemberProfile;