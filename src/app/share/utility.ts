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
                    name: cat.name,
                    icon: cat.icon
                }
            }
        }
    })
}