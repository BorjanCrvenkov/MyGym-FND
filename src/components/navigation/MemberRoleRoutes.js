import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MemberMainPage from "../member/MemberMainPage";
import ViewMemberProfile from "../member/ViewMemberProfile";

const MemberRoleRoutes = () => {
    return (
        <Routes>
            <Route path="/users/view/:id" element={<ViewMemberProfile />}/>
            <Route path="/gyms/view/:id" element={<MemberMainPage/>}/>
            <Route path="/gyms" element={<MemberMainPage/>}/>
            <Route path="/" element={<MemberMainPage />} />
            <Route path="*" element={<MemberMainPage />} />
        </Routes>
    );
};

export default MemberRoleRoutes;
