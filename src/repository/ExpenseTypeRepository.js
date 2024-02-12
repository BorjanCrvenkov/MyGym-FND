import BaseRepository from "./BaseRepository";

class ExpenseTypeRepository extends BaseRepository{
    constructor() {
        super('expense_types');
    }
}

export default ExpenseTypeRepository;