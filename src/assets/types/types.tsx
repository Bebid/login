import { Error } from "../../libs/firebase/errorMessages";

export type Form = {
    status: "I" | "P" | "D";
    error: Error;
};

export type ReducerAction = {
    type: string;
    payload?: {
        error: Error;
    };
};

export type UserDetails = {
    username: string;
    email: string;
};
