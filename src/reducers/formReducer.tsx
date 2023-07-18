import { Form, ReducerAction } from "../assets/types/types";

export const formInitState: Form = {
    status: "I",
    error: null,
};

export const formReducer = (state: Form, action: ReducerAction): Form => {
    switch (action.type) {
        case "SUBMITTING":
            return {
                ...state,
                status: "P",
                error: null,
            };
        case "SUCCESS":
            return {
                ...state,
                error: null,
                status: "D",
            };
        case "FAILED":
            return {
                ...state,
                status: "D",
                error: action.payload?.error || null,
            };
        default:
            return state;
    }
};
