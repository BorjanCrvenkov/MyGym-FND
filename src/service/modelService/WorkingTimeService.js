import BaseService from "../BaseService";
import WorkingTimeRepository from "../../repository/WorkingTimeRepository";

export default class WorkingTimeService extends BaseService {
    constructor() {
        super(new WorkingTimeRepository());
    }
}