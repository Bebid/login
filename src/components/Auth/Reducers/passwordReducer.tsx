import { ReducerAction } from "../types";

type PassVisibility = {
    passVis: boolean;
};

export const passVisInitState: PassVisibility = {
    passVis: false,
};

export const passVisReducer = (
    state: PassVisibility,
    action: ReducerAction
): PassVisibility => {
    switch (action.type) {
        case "TOGGLE_PASS":
            return {
                ...state,
                passVis: !state.passVis,
            };
        default:
            return state;
    }
};
