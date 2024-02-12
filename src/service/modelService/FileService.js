import BaseService from "../BaseService";
import FileRepository from "../../repository/FileRepository";

export default class FileService extends BaseService {
    constructor() {
        super(new FileRepository());
    }
}