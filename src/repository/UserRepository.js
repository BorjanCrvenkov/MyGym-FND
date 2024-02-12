import BaseRepository from "./BaseRepository";
import axios from "./axiosAPI";

class UserRepository extends BaseRepository {
    constructor() {
        super('users');
    }

    async update(id, data) {
        try {
            const response = await axios.post(this.path + '/' + id, data);

            return response.data.data;
        } catch (error) {
            this.displayErrorMessages(error);

            return null;
        }
    };

    async login(data) {
        localStorage.removeItem("token");
        localStorage.removeItem("token_expiry_time");

        let path = '/auth/login';

        try {
            return await axios.post(path, data);

        } catch (error) {
            this.displayErrorMessages(error);

            return null;
        }
    }

    async forgotPassword(data) {
        let path = '/auth/password/forgot';

        try {
            return await axios.post(path, data);

        } catch (error) {
            this.displayErrorMessages(error);

            return null;
        }
    }

    async resetPassword(data) {
        let path = '/auth/password/reset';

        try {
            return await axios.post(path, data);

        } catch (error) {
            this.displayErrorMessages(error);

            return null;
        }
    }

    async sendEmailVerificationNotification() {
        let path = '/users/send_email_verification_notification';

        try {
            return axios.post(path);

        } catch (error) {
            this.displayErrorMessages(error);

            return null;
        }
    }

    async getLoggedInUser() {
        let path = '/auth/user';

        try {
            return axios.get(path);

        } catch (error) {
            this.displayErrorMessages(error);

            return null;
        }
    }

    async refreshToken() {
        let path = '/auth/refreshToken';

        try {
            return axios.get(path);

        } catch (error) {
            this.displayErrorMessages(error);

            return null;
        }
    }

    async register(data) {
        let path = '/auth/register';

        try {
            return await axios.post(path, data);
        } catch (error) {
            this.displayErrorMessages(error);

            return null;
        }
    }
}

export default UserRepository;