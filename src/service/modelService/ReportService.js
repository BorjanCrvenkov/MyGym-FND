import BaseService from "../BaseService";
import ReportRepository from "../../repository/ReportRepository";

export default class ReportService extends BaseService {
    constructor() {
        super(new ReportRepository());
    }
}