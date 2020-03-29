export interface IAppState {
    // La estructura de nuestra store 
    notificationMessage: string,
    navegation: any,
    allCategories: any,
    myCategories: any,
    myBasicInfo: any,
    currentView: string,
    currentCategory: string,
    currentSearch: string,
    currentFeedUrl: string,
    generalError: string
}

export const INITIAL_STATE: IAppState = {
    notificationMessage: '',
    navegation: [],
    allCategories: [],
    myCategories: [],
    myBasicInfo: {},
    currentView: '',
    currentCategory: 'all',
    currentSearch: '',
    currentFeedUrl: '',
    generalError: ''
}

