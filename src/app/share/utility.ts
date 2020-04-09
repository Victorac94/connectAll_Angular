import * as moment from 'moment';

// Capitalize a string
export function capitalize(name) {
    return name.replace(/^([a-z])/, (subM) => subM.toUpperCase());
}

// Return time that has passed since a given date time
export function formatTime(time) {
    return moment(time).fromNow();
}

// Format categories from { fk_category: 1 } to { id: 1, name: 'athletics', icon: '../../category-icon.svg' }
export function setCategoriesFormat(userCategories) {
    const allCategories = JSON.parse(sessionStorage.getItem('all-categories'));

    return userCategories.map(category => {
        for (let cat of allCategories) {
            if (category.fk_category === cat.id) {
                return {
                    id: cat.id,
                    category_name: cat.category_name,
                    category_icon: cat.category_icon
                }
            }
        }
    })
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