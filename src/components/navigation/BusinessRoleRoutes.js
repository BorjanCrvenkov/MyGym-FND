import React from 'react';
import {Route, Routes} from 'react-router-dom';
import BusinessMainPage from "../businesss/BusinessMainPage";
import GymForm from "../businesss/GymForm";
import BusinessViewGym from "../businesss/BusinessViewGym";
import BusinessViewProfile from "../businesss/BusinessViewProfile";

const BusinessRoleRoutes = () => {
    let loggedInUser = JSON.parse(localStorage.getItem('user'));

    return (
        <Routes>
            <Route path="/users/view/:id" element={<BusinessViewProfile />}/>
            <Route path="/gyms/edit/:id" element={<GymForm/>}/>
            <Route path="/gyms/view/:id" element={<BusinessViewGym/>}/>
            {
                loggedInUser.can_register_gyms &&
                <Route path="/register_gym" element={<GymForm/>}/>
            }
            <Route path="/" element={<BusinessMainPage/>}/>
            <Route path="*" element={<BusinessMainPage/>}/>
        </Routes>
    );
};

export default BusinessRoleRoutes;
