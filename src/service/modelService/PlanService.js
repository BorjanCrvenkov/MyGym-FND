import BaseService from "../BaseService";
import PlanRepository from "../../repository/PlanRepository";

export default class PlanService extends BaseService {
    constructor() {
        super(new PlanRepository());
    }

    subscribe(data) {
        if (this.checkIfTokenIsNotExpired()) {
            return this.repository.subscribe(data);
        }
    }
}