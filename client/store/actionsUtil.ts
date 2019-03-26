import { ApplicationState } from ".";
// import { ILoadedTokenAction } from "./authentication/authenticationActions";

export namespace ActionsUtil {
    export interface DefaultType {
        id?: any
    };

    export const getSelectedValueUtil = <T extends DefaultType>(stateValue: T | undefined, actionValue: T): T => {
        let selectedTeam: T;
        if (!stateValue || stateValue.id === actionValue.id) {
            selectedTeam = actionValue;
        } else {
            selectedTeam = stateValue;
        }
        return selectedTeam;
    };

    export const updateListUtil = <T extends DefaultType>(actionValue: T, stateArray: T[]) => {
        return stateArray.map(value => value.id === actionValue.id ? actionValue : value);
    }

    export const refreshToken = async (dispatch, state: ApplicationState): Promise<{
        token: string,
        refreshToken: string
    }> => {
        const token = localStorage.getItem('token') as string;
        const refreshToken = localStorage.getItem('refreshToken') as string;
        // if (state.authentication.user && state.authentication.user.expirationDate > new Date().getTime() / 1000) {
        //     return {
        //         token: token,
        //         refreshToken: refreshToken
        //     };
        // }
        const tokenObjectResponse = await fetch(window.location.origin + `/api/account/refresh`,
            {
                method: 'POST',
                body: JSON.stringify({
                    token,
                    refreshToken
                }),
                headers: {
                    'Content-Type': 'Application/json'
                }
            }
        );
        const tokenOject = await tokenObjectResponse.json();
        // if (tokenObjectResponse.ok) {
        //     const loadedUserAction: ILoadedTokenAction = {
        //         type: "LOADED_USER_ACTION",
        //         token: tokenOject
        //     }
        //     dispatch(loadedUserAction);
        // }
        return tokenOject;
    }
}
