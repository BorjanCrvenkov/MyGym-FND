import BaseRepository from "./BaseRepository";

class MembershipRepository extends BaseRepository{
    constructor() {
        super('memberships');
    }
}

export default MembershipRepository;