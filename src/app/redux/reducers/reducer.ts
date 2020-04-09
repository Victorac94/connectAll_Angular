import { IAppState } from '../store/store';
import * as actions from '../actions/actions';

export function rootReducer(state: IAppState, action: any): IAppState {
    switch (action.type) {
        case actions.LOAD_MY_CATEGORIES:
            return { ...state, myCategories: action.data };
        case actions.LOAD_ALL_CATEGORIES:
            return { ...state, allCategories: action.data };
        case actions.DELETE_CATEGORY:
            return { ...state, myCategories: action.data };
        case actions.MY_BASIC_INFO:
            return { ...state, myBasicInfo: action.data };
        case actions.SET_CURRENT_CATEGORY:
            return { ...state, currentCategory: action.data };
        case actions.SET_CURRENT_SEARCH:
            return { ...state, currentSearch: action.data };
        case actions.SET_CURRENT_VIEW:
            return { ...state, currentView: action.data };
        case actions.SET_CURRENT_FEED_URL:
            return { ...state, currentFeedUrl: action.data };
        case actions.SET_NOTIFICATION_MESSAGE:
            console.log(action.notificationType)
            return { ...state, notificationMessage: action.data, notificationType: action.notificationType, notificationCount: state.notificationCount + 1 };
        default:
            return state;
    }
}