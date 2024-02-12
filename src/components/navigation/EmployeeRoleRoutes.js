import React from 'react';
import {Route, Routes} from 'react-router-dom';
import EmployeeMainPage from "../employee/EmployeeMainPage";
import ViewEmployeeProfile from "../employee/ViewEmployeeProfile";

const EmployeeRoleRoutes = () => {
    return (
        <Routes>
            <Route path="/users/view/:id" element={<ViewEmployeeProfile />}/>
            <Route path="/" element={<EmployeeMainPage/>}/>
            <Route path="*" element={<EmployeeMainPage/>}/>
        </Routes>
    );
};

export default EmployeeRoleRoutes;
