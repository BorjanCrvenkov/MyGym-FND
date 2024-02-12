import BaseRepository from "./BaseRepository";

class SessionRepository extends BaseRepository{
    constructor() {
        super('sessions');
    }
}

export default SessionRepository;