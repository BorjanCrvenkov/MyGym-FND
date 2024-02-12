import { Tabs, Tab } from 'react-bootstrap';
import RegisterMemberForm from "./RegisterMemberForm";
import RegisterBusinessForm from "./RegisterBusinessForm";

const RegisterForm = () => {
    return (
        <div>
            <h1>Register</h1>
            <Tabs defaultActiveKey="member" className='tabs'>
                <Tab eventKey="member" title="Register as a member">
                    <RegisterMemberForm />
                </Tab>
                <Tab eventKey="business" title="Register as a business">
                    <RegisterBusinessForm />
                </Tab>
            </Tabs>
        </div>
    );
}

export default RegisterForm;