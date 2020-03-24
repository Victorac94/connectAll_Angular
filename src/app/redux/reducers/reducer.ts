import { IAppState } from '../store/store';
import * as actions from '../actions/actions';

export function rootReducer(state: IAppState, action: any): IAppState {
    switch (action.type) {
        case actions.LOAD_MY_CATEGORIES:
            return { ...state, myCategories: action.data }
        case actions.LOAD_ALL_CATEGORIES:
            return { ...state, allCategories: action.data }
        case actions.MY_BASIC_INFO:
            return { ...state, myBasicInfo: action.data }
    }
}