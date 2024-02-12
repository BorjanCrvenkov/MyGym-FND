import DisplayNotificationService from "./DisplayNotificationService";
import {wait} from "@testing-library/user-event/dist/utils";

export default class RedirectService {
    constructor() {
        this.state = {
            notificationService: new DisplayNotificationService(),
        }
    }

    toLogin(notification, success) {
        window.location.href = 'http://localhost:3000/login'

        if(notification){
            success ? this.state.notificationService.showSuccessNotification(notification) : this.state.notificationService.showErrorNotification(notification);
        }
    }

    toRegister() {
        window.location.href = 'http://localhost:3000/register'
    }

    toHomePage() {
        window.location.href = 'http://localhost:3000/'
    }

    toBusinessMainPage() {
        window.location.href = 'http://localhost:3000/business'
    }
}