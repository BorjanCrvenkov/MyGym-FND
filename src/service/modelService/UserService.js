import BaseService from "../BaseService";
import UserRepository from "../../repository/UserRepository";
import DisplayNotificationService from "../DisplayNotificationService";

export default class UserService extends BaseService {
    constructor() {
        super(new UserRepository());
        this.state = {
            displayNotificationService: new DisplayNotificationService(),
        }
    }

    async login(data) {
        let response = await this.repository.login(data)
            .catch((error) => {
                let errorMessage = error.response.data.meta.message;

                this.state.displayNotificationService.showErrorNotification(errorMessage);
            });


        if (response) {
            let token = response.data.auth.token
            let tokenExpiryTime = response.data.auth.token_expiry_time;
            let user = response.data.data;

            localStorage.setItem("token", token);
            localStorage.setItem("token_expiry_time", tokenExpiryTime);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        }
    }

    async forgotPassword(email) {
        let response = await this.repository.forgotPassword({
            'email': email
        }).catch((error) => {
            let errorMessage = error.response.data.meta.message;

            this.state.displayNotificationService.showErrorNotification(errorMessage);
        });

        if(response){
            let message = response.data.meta.message;

            this.state.displayNotificationService.showSuccessNotification(message);
            return message;
        }
    }

    async resetPassword(data) {
        let response = await this.repository.resetPassword(data).catch((error) => {
            let errorMessage = error.response.data.meta.message;

            this.state.displayNotificationService.showErrorNotification(errorMessage);
        });

        if(response){
            return response.data.meta.message;
        }
    }

    async refreshUserStoredData(){
        let response = await this.repository.getLoggedInUser()
            .catch();

        let user = response.data.data;

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        }
    }

    async sendEmailVerificationNotification (){
        let response = await this.repository.sendEmailVerificationNotification();

        let message = response.data.meta.message;
        this.state.displayNotificationService.showSuccessNotification(message);
    }

    async refreshToken (){
        let response = await this.repository.refreshToken();

        if (response) {
            let token = response.data.auth.token
            let tokenExpiryTime = response.data.auth.token_expiry_time;

            localStorage.setItem("token", token);
            localStorage.setItem("token_expiry_time", tokenExpiryTime);
        }
    }

    async register(data) {
        let response = await this.repository.register(data);

        if(response){
            return response.data.data;
        }
    }
}