export default class DisplayNotificationService {
    showErrorNotification(message) {
        const container = document.getElementById('error-notification-container');
        const notification = document.createElement('div');
        notification.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`;

        container.appendChild(notification);

        setTimeout(() => {
            container.removeChild(notification);
        }, 6000);

        notification.classList.add('show');
    }

    showSuccessNotification(message) {
        const container = document.getElementById('success-notification-container');
        const notification = document.createElement('div');
        notification.innerHTML = `<div class="alert alert-success" role="alert">${message}</div>`;

        container.appendChild(notification);

        setTimeout(() => {
            container.removeChild(notification);
        }, 6000);

        notification.classList.add('show');
    }
}