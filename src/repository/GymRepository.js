import BaseRepository from "./BaseRepository";
import data from "bootstrap/js/src/dom/data";
import axios from "./axiosAPI";

class GymRepository extends BaseRepository{
    constructor() {
        super('gyms');
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

export default GymRepository;