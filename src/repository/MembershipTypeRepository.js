import BaseRepository from "./BaseRepository";

class MembershipTypeRepository extends BaseRepository{
    constructor() {
        super('membership_types');
    }
}

export default MembershipTypeRepository;