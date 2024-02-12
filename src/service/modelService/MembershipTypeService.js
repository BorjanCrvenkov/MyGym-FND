import BaseService from "../BaseService";
import MembershipTypeRepository from "../../repository/MembershipTypeRepository";

export default class MembershipTypeService extends BaseService {
    constructor() {
        super(new MembershipTypeRepository());
    }
}