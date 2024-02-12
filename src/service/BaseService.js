import RedirectService from "./RedirectService";
import DisplayNotificationService from "./DisplayNotificationService";

export default class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    index(filters, sorts, includes) {
        if (this.checkIfTokenIsNotExpired()) {
            return this.repository.index(filters, sorts, includes);
        }
    }

    show(id, includes = null) {
        if (this.checkIfTokenIsNotExpired()) {
            return this.repository.show(id, includes);
        }
    }

    store(data) {
        if (this.checkIfTokenIsNotExpired()) {
            return this.repository.store(data);
        }
    }

    update(id, data) {
        if (this.checkIfTokenIsNotExpired()) {
            return this.repository.update(id, data)
        }
    }

    delete(id) {
        if (this.checkIfTokenIsNotExpired()) {
            return this.repository.deleteModel(id)
        }
    }

    checkIfTokenIsNotExpired() {
        let tokenExpiryTime = localStorage.getItem('token_expiry_time');
        let redirectService = new RedirectService();

        if (!tokenExpiryTime) {
            this.removeTokenFromLocalStorage();
            redirectService.toLogin('Session expired', false);
        }

        let currentTime = new Date();
        tokenExpiryTime = new Date(tokenExpiryTime);

        let currentTimestamp = currentTime.getTime();
        let tokenTimestamp = tokenExpiryTime.getTime();

        if (!(tokenTimestamp > currentTimestamp)) {
            this.removeTokenFromLocalStorage();
            redirectService.toLogin('Session expired', false);
        }

        return true;
    }

    removeTokenFromLocalStorage() {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expiry_time");
    }
}