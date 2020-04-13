import * as moment from 'moment';

// Capitalize a string
export function capitalize(name) {
    return name.replace(/^([a-z])/, (subM) => subM.toUpperCase());
}

// Return time that has passed since a given date time
export function formatTime(time) {
    return moment(time).fromNow();
}

export function showNotification(type) {
    const notificationContainer = document.querySelector('.notification-container');

    notificationContainer.classList.add(type);
    notificationContainer.addEventListener('animationend', () => removeNotificationAnimation(notificationContainer, type));
}

function removeNotificationAnimation(notificationContainer, className) {
    notificationContainer.classList.remove(className);
    notificationContainer.removeEventListener('animationend', removeNotificationAnimation);
}