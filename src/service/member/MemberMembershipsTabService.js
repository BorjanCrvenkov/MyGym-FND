import MembershipService from "../modelService/MembershipService";
import {useEffect, useState} from "react";

const MemberMembershipsTabService = (userId) => {
    const membershipService = new MembershipService();
    const [memberships, setMemberships] = useState([]);

    const fetchMemberships = async () => {
        let filters = {
            user_id: userId,
        }

        let sorts = [
            'end_date'
        ];

        return await membershipService.index(filters, sorts);
    }

    useEffect(() => {
        const fetchAndSetMemberships = async () => {
            const membershipsData = await fetchMemberships();
            setMemberships(membershipsData);
        };
        fetchAndSetMemberships();
    }, [userId]);

    return {
        memberships,
    };
}

export default MemberMembershipsTabService;