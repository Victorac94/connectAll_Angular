export interface IAppState {
    // La estructura de nuestra store 
    notificationMessage: string,
    navegation: any,
    allCategories: any,
    myCategories: any,
    myId: number
}

export const INITIAL_STATE: IAppState = {
    notificationMessage: '',
    navegation: [],
    allCategories: [],
    myCategories: [],
    myId: 0,
}

