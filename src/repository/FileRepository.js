import BaseRepository from "./BaseRepository";

class FileRepository extends BaseRepository{
    constructor() {
        super('files');
    }
}

export default FileRepository;