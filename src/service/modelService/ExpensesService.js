import BaseService from "../BaseService";
import ExpenseRepository from "../../repository/ExpenseRepository";

export default class ExpenseService extends BaseService {
    constructor() {
        super(new ExpenseRepository());
    }
}