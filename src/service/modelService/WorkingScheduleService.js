import BaseService from "../BaseService";
import WorkingScheduleRepository from "../../repository/WorkingScheduleRepository";

export default class WorkingScheduleService extends BaseService {
    constructor() {
        super(new WorkingScheduleRepository());
    }
}