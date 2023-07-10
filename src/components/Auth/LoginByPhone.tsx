import React, { useContext, useState, useRef, useReducer } from "react";
import { LoginByPhoneForm } from "./types";
import { useForm } from "react-hook-form";
import {
    Auth,
    ConfirmationResult,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { AuthContext, authContext } from "../../App";
import OTP from "./OTP";
import {
    TextField,
    Stack,
    Button,
    Collapse,
    Alert,
    AlertTitle,
} from "@mui/material";
import { formReducer, formInitState } from "./Reducers/formReducer";
import { getErrMessage } from "../../firebase/errorMessages";

function LoginByPhone() {
    const recaptchaRef = useRef<HTMLDivElement>(null);
    const { register, handleSubmit } = useForm<LoginByPhoneForm>();
    const { auth } = useContext(authContext) as AuthContext;

    const [showOTP, setShowOTP] = useState<boolean>(false);
    const [confirmOTP, setConfirmOTP] = useState<ConfirmationResult | null>(
        null
    );

    const [formReducerState, formDispatch] = useReducer(
        formReducer,
        formInitState
    );

    const onSubmit = (data: LoginByPhoneForm) => {
        formDispatch({ type: "SUBMITTING" });
        const appVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {},
            auth as Auth
        );
        signInWithPhoneNumber(auth as Auth, data.phone, appVerifier)
            .then((confirmationResult) => {
                formDispatch({ type: "SUCCESS" });
                setShowOTP(true);
                setConfirmOTP(confirmationResult);
            })
            .catch((error) => {
                formDispatch({
                    type: "FAILED",
                    payload: { error: getErrMessage(error.code) },
                });
                setShowOTP(false);
                if (recaptchaRef.current) {
                    recaptchaRef.current.innerHTML = "";
                }
            });
    };

    if (!showOTP) {
        return (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Stack spacing={2}>
                    <Collapse in={!!formReducerState.error}>
                        <Alert severity="error">
                            <AlertTitle>
                                {formReducerState.error?.title}
                            </AlertTitle>
                            {formReducerState.error?.details}
                        </Alert>
                    </Collapse>
                    <TextField
                        label="Phone"
                        type="phone"
                        {...register("phone", {
                            required: "Please enter your phone number",
                        })}
                    ></TextField>
                    <div
                        ref={recaptchaRef}
                        id="recaptcha-container"
                        style={{ alignSelf: "center" }}
                    ></div>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={formReducerState.status === "P"}
                        disableElevation
                    >
                        Login
                    </Button>
                </Stack>
            </form>
        );
    }
    return (
        <OTP
            style={{ display: showOTP ? "flex" : "none" }}
            confirmOTP={confirmOTP}
        ></OTP>
    );
}

export default LoginByPhone;
