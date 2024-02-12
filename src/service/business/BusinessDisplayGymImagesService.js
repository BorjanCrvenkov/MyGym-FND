import {useEffect, useState} from "react";
import FileService from "../modelService/FileService";

const BusinessDisplayEquipmentService = (gymId) => {
    const fileService = new FileService();

    const fetchFiles = async () => {
        let filters = {
            'gym_id': gymId,
        }

        return await fileService.index(filters);
    }

    const [files, setFiles] = useState([]);

    const fetchAndSetFiles = async () => {
        const filesData = await fetchFiles();
        setFiles(filesData);
    };

    useEffect(() => {
        fetchAndSetFiles();
    }, []);

    const refreshData = async () => {
        await fetchAndSetFiles();
    };

    return { files, refreshData };
};

export default BusinessDisplayEquipmentService;