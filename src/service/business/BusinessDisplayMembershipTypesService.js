import {useEffect, useState} from 'react';
import MembershipTypeService from "../modelService/MembershipTypeService";

const BusinessDisplayMembershipTypesService = (gymId) => {
    const membershipTypeService = new MembershipTypeService();

    const fetchMembershipTypes = async () => {
        let filters = {
            'gym_id': gymId,
        }

        return await membershipTypeService.index(filters);
    }

    const [membershipTypes, setMembershipTypes] = useState([]);

    const fetchAndSetMembershipTypes = async () => {
        const membershipTypesData = await fetchMembershipTypes();
        setMembershipTypes(membershipTypesData);
    };

    useEffect(() => {
        fetchAndSetMembershipTypes();
    }, []);

    const refreshData = async () => {
        await fetchAndSetMembershipTypes();
    };

    return { membershipTypes, refreshData };
};

export default BusinessDisplayMembershipTypesService;