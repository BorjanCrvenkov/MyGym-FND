import BaseService from "../BaseService";
import SessionRepository from "../../repository/SessionRepository";

export default class SessionService extends BaseService {
    constructor() {
        super(new SessionRepository());
    }
}