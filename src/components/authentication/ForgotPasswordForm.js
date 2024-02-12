import React, {useState} from "react";
import '../../styles/loginStyles.css'
import UserService from "../../service/modelService/UserService";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();

        await new UserService().forgotPassword(email)
    }

    const handleInputChange = (event) => {
        const newValue = event.target.value;

        setEmail(newValue);
    };

    return (
        <div className='login-div rounded-4'>
            <h1>Forgot password</h1>
            <form onSubmit={handleSubmit}>
                <div className="col">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className='form-control'
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn regular-button rounded-4 mt-2">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ForgotPasswordForm;