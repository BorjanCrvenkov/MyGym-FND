import BaseService from "../BaseService";
import EquipmentRepository from "../../repository/EquipmentRepository";

export default class EquipmentService extends BaseService {
    constructor() {
        super(new EquipmentRepository());
    }
}