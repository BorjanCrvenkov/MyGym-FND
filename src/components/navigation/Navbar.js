import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import RegisterForm from "../authentication/RegisterForm";
import LoginForm from "../authentication/LoginForm";
import LogoutForm from "../authentication/LogoutForm";
import ForgotPasswordForm from "../authentication/ForgotPasswordForm";
import ResetPasswordForm from "../authentication/ResetPasswordForm";
import UserRoleEnum from "../../enum/UserRoleEnum";
import BusinessRoleRoutes from "./BusinessRoleRoutes";
import MemberRoleRoutes from "./MemberRoleRoutes";
import EmployeeRoleRoutes from "./EmployeeRoleRoutes";
import EmailVerificationPage from "../EmailVerificationPage";
import UserService from "../../service/modelService/UserService";
import Home from "../Home";

const Navbar = () => {
    let location = window.location;
    const queryParams = new URLSearchParams(location.search);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (queryParams.has('token')) {
                let token = queryParams.get('token');
                queryParams.delete('token');

                const newUrl = `${location.pathname}?${queryParams.toString()}`;
                window.history.replaceState(null, '', newUrl);

                localStorage.clear();
                localStorage.setItem('token', token);

                await new UserService().refreshToken();
                await new UserService().refreshUserStoredData();
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    if(isLoading){
        return (
            <div>
                Loading
            </div>
        )
    }

    let roleName = '';

    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        roleName = user.role.name;
    }
    let defaultRoute = '';

    if (user && !user.email_verified_at) {
        defaultRoute = '/verify_email'
    } else {
        defaultRoute = 'home';
        if (roleName === UserRoleEnum.BUSINESS) {
            defaultRoute = '/business';
        } else if (roleName === UserRoleEnum.EMPLOYEE) {
            defaultRoute = '/employee'
        } else if (roleName === UserRoleEnum.MEMBER) {
            defaultRoute = '/member';
        }
    }

    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterForm/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/logout" element={<LogoutForm/>}/>
                <Route path="/password/forgot" element={<ForgotPasswordForm/>}/>
                <Route path="/password/reset" element={<ResetPasswordForm/>}/>

                {
                    user && !user.email_verified_at &&
                    <Route
                        path='/verify_email'
                        element={<EmailVerificationPage/>}/>
                }

                {
                    user && user.email_verified_at && roleName === UserRoleEnum.BUSINESS && (
                        <Route
                            path="/business/*"
                            element={<BusinessRoleRoutes/>}
                        />
                    )
                }
                {
                    user && user.email_verified_at && roleName === UserRoleEnum.EMPLOYEE && (
                        <Route
                            path="/employee/*"
                            element={<EmployeeRoleRoutes/>}
                        />
                    )
                }
                {
                    user && user.email_verified_at && roleName === UserRoleEnum.MEMBER && (
                        <Route
                            path="/member/*"
                            element={<MemberRoleRoutes/>}
                        />
                    )
                }
                <Route path='/home' element={<Home/>}/>
                <Route path="*" element={<Navigate to={defaultRoute}/>}/>
            </Routes>
        </Router>
    );
};

export default Navbar;
