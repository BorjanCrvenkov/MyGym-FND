import ViewProfileService from "../../service/ViewProfileService";
import EmployeeWorkingSchedule from "./EmployeeWorkingSchedule";

const ViewEmployeeProfile = () => {
    const {
        user,
    } = ViewProfileService();

    return (
        <div>
            <div className='row mt-1 mb-4'>
                <h3>{user.first_name} {user.last_name}</h3>
                <hr/>
                <div className='col-4'>
                    <a href={user?.image?.link} target='_blank'><img src={user?.image?.link} style={{width: '570px', height: '250px'}} alt="Card image cap"/></a>
                </div>
                <div className='col-6'>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Date of birth: {user.date_of_birth || 'N/A'}</p>
                    <p>Date of employment: {user.date_of_employment || 'N/A'}</p>
                    <p>Bio: {user.bio || 'N/A'}</p>
                </div>
            </div>
            {
                user?.id &&
                <div>
                    <EmployeeWorkingSchedule user={user}/>
                </div>
            }
        </div>
    );
}

export default ViewEmployeeProfile;