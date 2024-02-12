import {useEffect, useState} from "react";
import MembershipService from "../modelService/MembershipService";
import SessionService from "../modelService/SessionService";
import DisplayNotificationService from "../DisplayNotificationService";

const EmployeeMainPageService = (startedSessions) => {
    const membershipService = new MembershipService();
    const sessionService = new SessionService();
    const displayNotificationService = new DisplayNotificationService();

    const fetchMemberships = async () => {
        let filters = {
            started_sessions: startedSessions,
            gym_id: JSON.parse(localStorage.getItem('user')).gym_id,
        };

        let includes = [
            'user',
            startedSessions ? 'active_session' : '',
        ];

        return await membershipService.index(filters, null, includes)
    }

    const [memberships, setMemberships] = useState([]);
    const [filteredMemberships, setFilteredMemberships] = useState([]);

    const fetchAndSetMemberships = async () => {
        const membershipsData = await fetchMemberships();
        setMemberships(membershipsData);
        setFilteredMemberships(membershipsData);
    };

    useEffect(() => {
        fetchAndSetMemberships();
    }, []);

    const startSession = async (membershipId) => {
        document.getElementById('membership' + membershipId).setAttribute('disabled', true)

        await sessionService.store({
            membership_id: membershipId,
        })

        document.getElementById('membership' + membershipId).removeAttribute('disabled')

        await fetchAndSetMemberships()

        displayNotificationService.showSuccessNotification('Session started');
    }

    const endSession = async (activeSessionId) => {
        document.getElementById('session' + activeSessionId).setAttribute('disabled', true)

        await sessionService.update(activeSessionId, JSON.stringify({
            time_end: new Date().toLocaleString(),
        }))

        document.getElementById('session' + activeSessionId).removeAttribute('disabled')

        await fetchAndSetMemberships()

        displayNotificationService.showSuccessNotification('Session ended')
    }

    const search = (value) => {
        if (value.trim() === '') {
            document.getElementById('search').value = ''
            setFilteredMemberships(memberships);
            return;
        }

        let result = memberships;

        let searchParam = value.toLowerCase();

        result = result.filter(membership => (
            membership.user.first_name.toLowerCase().includes(searchParam) ||
            membership.user.last_name.toLowerCase().includes(searchParam) ||
            membership.user.email.toLowerCase().includes(searchParam) ||
            membership.user.username.toLowerCase().includes(searchParam)
        ))

        setFilteredMemberships(result);
    }

    return startedSessions ?
        {
            filteredMemberships,
            endSession,
            search,
        }
        :
        {
            filteredMemberships,
            startSession,
            search,
        };
};

export default EmployeeMainPageService;