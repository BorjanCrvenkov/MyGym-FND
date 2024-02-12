import BaseRepository from "./BaseRepository";
import axios from "./axiosAPI";

class EquipmentRepository extends BaseRepository{
    constructor() {
        super('equipments');
    }


    async update(id, data) {
        try {
            const response = await axios.post(this.path + '/' + id, data);

            return response.data.data;
        } catch (error) {
            this.displayErrorMessages(error);

            return null;
        }
    }
}

export default EquipmentRepository;