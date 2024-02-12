import UserService from "../service/modelService/UserService";
import {useEffect} from "react";

const EmailVerificationPage = () => {
    const userService = new UserService();

    useEffect(() => {
        userService.refreshUserStoredData();
    }, []);

    const sendEmailVerificationNotification = async () => {
        await userService.sendEmailVerificationNotification();
    }

    return (
        <div className='row' style={{
            position: 'absolute',
            top: '40%',
            left: '33%',
            'margin-top': '-50px',
            'margin-left': '-50px',
            width: '1270px',
            height: '100px',
        }}>
            <div className='col-6'>
                <h4>A confirmation email has been sent to your email address</h4>
            </div>
            <span className='col-6'></span>
            <span className='col-2'></span>
            <div className='col-3'>
                <button className='btn regular-button' onClick={sendEmailVerificationNotification}>
                    Resend email notification
                </button>
            </div>
            <span className='col-2'></span>
        </div>
    )
}

export default EmailVerificationPage;