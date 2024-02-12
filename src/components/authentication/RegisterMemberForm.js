import React from 'react';
import RegisterService from "../../service/auth/RegisterService";
import '../../styles/registerStyles.css';
import Form from "react-bootstrap/Form";
import TodaysDate from "../../service/TodaysDate";

const RegisterMemberForm = () => {
    const {
        formData,
        handleInputChange,
        fileChange,
        handleSubmit,
        getFieldClassName,
    } = RegisterService(true);

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
                            required
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
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className={getFieldClassName('email')}
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
                            className={getFieldClassName('password')}
                            placeholder="Password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className={getFieldClassName('username')}
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                        <span id='usernameTaken' hidden={true} className='is-invalid'>Username is taken!</span>
                    </div>
                    <div className='col-6'>
                        <label htmlFor="date_of_birth" className="form-label">
                            Date of birth
                        </label>
                        <input
                            type="date"
                            max={TodaysDate()}
                            className='form-control'
                            id="date_of_birth"
                            name="date_of_birth"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='row'>
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
                            required
                        />
                    </div>
                    <div className='col-6'>
                        <label htmlFor="bio" className="form-label">
                            Bio
                        </label>
                        <textarea
                            rows={5}
                            className='form-control textarea'
                            name="bio"
                            placeholder="Bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3 rounded-4">
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterMemberForm;
