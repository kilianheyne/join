import { ContactPageNotificationComponent } from "../general/contact-page-notification/contact-page-notification.component";

export function getContactInitials(fullName: string) {
    const names = fullName.trim().split(' ');

    if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
    }

    const firstInitial = names[0].charAt(0).toUpperCase();
    const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
    return firstInitial + lastInitial;
}

export function showContactNotification(notification: ContactPageNotificationComponent, text: string) {
    notification.isVisible = true;
    notification.notificationText = text;

    setTimeout(() => {
        notification.isVisible = false;
        notification.notificationText = '';
    }, 2000);
}