import RegisterService from "../../service/auth/RegisterService";
import '../../styles/registerStyles.css';
import React from "react";
import TodaysDate from "../../service/TodaysDate";

const RegisterBusinessForm = () => {
    const {
        formData,
        handleInputChange,
        fileChange,
        handleSubmit,
        getFieldClassName,
    } = RegisterService(false);

    return (
        <div>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="row">
                    <div className="col">
                        <label htmlFor="first_name" className="form-label">
                            First Name
                        </label>
                        <input
                            type="text"
                            className={getFieldClassName('first_name')}
                            placeholder="First name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="last_name" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className={getFieldClassName('last_name')}
                            placeholder="Last name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            className={getFieldClassName('email')}
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className={getFieldClassName('password')}
                            placeholder="Password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="image" className="form-label">
                            Image
                        </label>
                        <input
                            type="file"
                            className={getFieldClassName('image')}
                            id="image"
                            name="image"
                            onChange={fileChange}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="identification_file" className="form-label">
                            Identification copy
                        </label>
                        <input
                            type="file"
                            className={getFieldClassName('identification_file')}
                            id="identification_file"
                            name="identification_file"
                            onChange={fileChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="date_of_birth" className="form-label">
                            Date of birth
                        </label>
                        <input
                            type="date"
                            className={getFieldClassName('date_of_birth')}
                            max={TodaysDate()}
                            id="date_of_birth"
                            name="date_of_birth"
                            onChange={handleInputChange}
                        />
                    </div>
                    <span className='col'></span>
                </div>
                <button type="submit" className="btn btn-primary rounded-4">
                    Register
                </button>
            </form>

        </div>
    );
}

export default RegisterBusinessForm;