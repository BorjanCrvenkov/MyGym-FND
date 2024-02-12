import SessionService from "../modelService/SessionService";
import {useEffect, useState} from "react";

const MemberDisplaySessionsService = (membershp) => {
    const sessionService = new SessionService();
    const [sessions, setSessions] = useState([]);

    const fetchSessions = async () => {
        let filters = {
            membership_id: membershp.id,
        }

        let sorts = [
            '-time_end',
            'created_at',
        ];

        return await sessionService.index(filters, sorts);
    }

    const fetchAndSetSessions = async () => {
        const sessionsData = await fetchSessions();
        setSessions(sessionsData);
    };

    useEffect(() => {
        fetchAndSetSessions();
    }, [membershp]);


    const refreshData = async () => {
        await fetchAndSetSessions();
    };

    return {
        sessions,
        refreshData,
    };
}

export default MemberDisplaySessionsService;