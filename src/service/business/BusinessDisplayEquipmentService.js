import EquipmentService from "../modelService/EquipmentService";
import {useEffect, useState} from "react";

const BusinessDisplayEquipmentService = (gymId) => {
    const equipmentService = new EquipmentService();

    const fetchEquipments = async () => {
        let filters = {
            'gym_id': gymId,
        }

        let includes = [
            'image',
        ];

        return await equipmentService.index(filters, null, includes);
    }

    const [equipments, setEquipments] = useState([]);

    const fetchAndSetEquipments = async () => {
        const equipmentData = await fetchEquipments();
        setEquipments(equipmentData);
    };

    useEffect(() => {
        fetchAndSetEquipments();
    }, []);

    const refreshData = async () => {
        await fetchAndSetEquipments();
    };

    return { equipments, refreshData };
};

export default BusinessDisplayEquipmentService;