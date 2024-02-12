import BaseRepository from "./BaseRepository";

class WorkingTimeRepository extends BaseRepository{
    constructor() {
        super('working_times');
    }
}

export default WorkingTimeRepository;