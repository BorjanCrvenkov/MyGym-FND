import BaseService from "../BaseService";
import ReviewRepository from "../../repository/ReviewRepository";

export default class ReviewService extends BaseService {
    constructor() {
        super(new ReviewRepository());
    }
}