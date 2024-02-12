import React, {useState} from "react";
import '../../styles/loginStyles.css'
import ResetPasswordService from "../../service/auth/ResetPasswordService";

const ResetPasswordForm = () => {
    const { formData, handleInputChange, handleSubmit } = ResetPasswordService();

    return (
        <div className='login-div rounded-4'>
            <h1>Reset password</h1>
            <form onSubmit={handleSubmit}>
                <div className="col">
                    <label htmlFor="email" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className='form-control'
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col">
                    <label htmlFor="email" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className='form-control'
                        placeholder="Confirmed Password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
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

export default ResetPasswordForm;