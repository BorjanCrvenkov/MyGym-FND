import BaseService from "../BaseService";
import MembershipRepository from "../../repository/MembershipRepository";

export default class MembershipService extends BaseService {
    constructor() {
        super(new MembershipRepository());
    }
}