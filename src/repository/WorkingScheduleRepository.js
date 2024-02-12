import BaseRepository from "./BaseRepository";

class WorkingScheduleRepository extends BaseRepository{
    constructor() {
        super('working_schedules');
    }
}

export default WorkingScheduleRepository;