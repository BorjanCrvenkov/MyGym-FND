import BaseService from "../BaseService";
import ExpenseTypeRepository from "../../repository/ExpenseTypeRepository";

export default class ExpenseTypeService extends BaseService {
    constructor() {
        super(new ExpenseTypeRepository());
    }
}