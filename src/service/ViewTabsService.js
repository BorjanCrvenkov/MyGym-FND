import { useState, useLayoutEffect } from 'react';

const ViewTabsService = (defaultTab) => {
    let location = window.location;
    const queryParams = new URLSearchParams(location.search);

    const resolveActiveTabValue = () => {
        return queryParams.has('tab') ? queryParams.get('tab') : defaultTab;
    }

    const [activeTab, setActiveTab] = useState(resolveActiveTabValue);

    useLayoutEffect(() => {
        queryParams.set('tab', activeTab);

        const existingParams = new URLSearchParams(location.search);
        existingParams.delete('tab')
        existingParams.append('tab', activeTab);

        const newUrl = `${location.pathname}?${queryParams.toString()}`;
        window.history.replaceState(null, '', newUrl);
    }, [activeTab, location, queryParams]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return {
        activeTab,
        handleTabChange,
    };
};

export default ViewTabsService;
