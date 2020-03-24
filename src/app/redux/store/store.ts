export interface IAppState {
    // La estructura de nuestra store 
    notificationMessage: string,
    navegation: any,
    allCategories: any,
    myCategories: any,
    myBasicInfo: any,
}

export const INITIAL_STATE: IAppState = {
    notificationMessage: '',
    navegation: [],
    allCategories: [],
    myCategories: [],
    myBasicInfo: {},
}

