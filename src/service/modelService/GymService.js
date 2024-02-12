import BaseService from "../BaseService";
import DisplayNotificationService from "../DisplayNotificationService";
import GymRepository from "../../repository/GymRepository";

export default class GymService extends BaseService {
    constructor() {
        super(new GymRepository());
        this.state = {
            displayNotificationService: new DisplayNotificationService(),
        }
    }
}