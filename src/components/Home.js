import React from 'react';
import MyGymLogo from '../MyGymLogo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment/moment";

const Home = () => {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-8">
                    <h1>Welcome to My Gym</h1>
                    <p className="lead">Efficiently manage your gym operations and help your members achieve their fitness goals.</p>
                    <a href={new Date(localStorage.getItem('token_expiry_time')) < moment.now() ? '/login' : '/'} className="btn btn-primary">Get Started</a>
                </div>
                <div className="col-lg-4 text-center">
                    <img src={MyGymLogo} alt="My Gym Logo" className="img-fluid" />
                </div>
            </div>
        </div>
    );
};

export default Home;
