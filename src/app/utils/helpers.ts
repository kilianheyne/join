import { AddTaskNotificationComponent } from "../components/general/add-task-notification/add-task-notification.component";
import { ContactPageNotificationComponent } from "../components/general/contact-page-notification/contact-page-notification.component";

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

export function showAddTaskNotification(notification: AddTaskNotificationComponent, text?: string) {
    notification.isVisible = true;
    if (text) {
        notification.notificationText = text;
    }
    setTimeout(() => {
        notification.isVisible = false;
        if (text) {
            notification.notificationText = '';
        }
    }, 2000);
}

export function getBgColorForCircle(name: string) {
    const backgroundColors: string[] = [
        '#0038FF', '#00BEE8', '#1FD7C1', '#6E52FF', '#9327FF',
        '#C3FF2B', '#FC71FF', '#FF4646', '#FF5EB3', '#FF745E',
        '#FF7A00', '#FFA35E', '#FFBB2B', '#FFC701', '#FFE62B'
    ]

    let cache = 0;
    for (let i = 0; i < name.length; i++) {
        cache = name.charCodeAt(i) + ((cache << 5) - cache);
    }
    const index = Math.abs(cache) % backgroundColors.length;
    return backgroundColors[index];
}