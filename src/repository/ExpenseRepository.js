import BaseRepository from "./BaseRepository";

class ExpenseRepository extends BaseRepository{
    constructor() {
        super('expenses');
    }
}

export default ExpenseRepository;