import React from "react";
import LoginService from "../../service/auth/LoginService";
import '../../styles/loginStyles.css'

const LoginForm = () => {
    const { formData, handleInputChange, handleSubmit } = LoginService();

    return (
        <div className='login-div rounded-4'>
            <h1>Login</h1>
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
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <span id='emailTaken' hidden={true} className='is-invalid'>Email is taken!</span>
                </div>
                <div className="col">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className='form-control'
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <a href='/password/forgot'>Forgot password?</a>
                </div>
                <div className='mt-3'>
                    <button type="submit" className="regular-button rounded-4">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;