import BaseRepository from "./BaseRepository";
import axios from "./axiosAPI";

class PlanRepository extends BaseRepository{
    constructor() {
        super('plans');
    }

    async subscribe(data) {
        let path = this.path + '/subscribe';

        const response = await axios.post(path, data)

        return response.data.data;
    }
}

export default PlanRepository;