export interface IAppState {
    // La estructura de nuestra store 
    notificationMessage: string,
    notificationType: string,
    notificationCount: number,
    navegation: any,
    allCategories: any,
    myCategories: any,
    myBasicInfo: any,
    currentView: string,
    currentCategory: string,
    currentSearch: string,
    currentFeedUrl: string,
}

export const INITIAL_STATE: IAppState = {
    notificationMessage: '',
    notificationType: '',
    notificationCount: 0,
    navegation: [],
    allCategories: [],
    myCategories: [],
    myBasicInfo: {},
    currentView: '',
    currentCategory: 'all',
    currentSearch: '',
    currentFeedUrl: '',
}

