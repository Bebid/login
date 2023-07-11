import { Error } from "../../firebase/errorMessages";

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

export type LoginByEmailForm = {
    email: string;
    password: string;
};

export type SessionProps = {
    saveToken: (tokenDetails: any) => {};
    deleteToken: () => {};
    getToken: () => {};
};

export type SignupForm = {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
};

export type UserDetails = {
    username: string;
};

export type ForgetPasswordForm = {
    email: string;
};

export type ResetPasswordForm = {
    newPass: string;
    confirmNewPass: string;
};

export type CompWithStyle = {
    style: object;
};
