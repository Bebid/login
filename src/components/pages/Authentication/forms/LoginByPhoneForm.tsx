import { useContext, useState, useRef, useReducer, FormEvent } from "react";
import {
    Auth,
    ConfirmationResult,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";
import { Stack, Button, Alert, AlertTitle } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

import FirebaseOTPForm from "./FirebaseOTPForm";
import { formReducer, formInitState } from "../../../../reducers/formReducer";
import { getErrMessage } from "../../../../libs/firebase/errorMessages";
import { AuthContext, authContext } from "../../../../App";

function LoginByPhone() {
    const { auth } = useContext(authContext) as AuthContext;

    const recaptchaRef = useRef<HTMLDivElement>(null);

    const [showOTP, setShowOTP] = useState(false);
    const [confirmOTP, setConfirmOTP] = useState<ConfirmationResult>();
    const [phone, setPhone] = useState("");

    const handleChange = (newValue: string) => {
        setPhone(newValue);
    };

    const [formReducerState, formDispatch] = useReducer(
        formReducer,
        formInitState
    );

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!matchIsValidTel(phone)) {
            formDispatch({
                type: "FAILED",
                payload: {
                    error: {
                        title: "Invalid phone number",
                        details: "Please enter valid phone number",
                    },
                },
            });
            return;
        }

        formDispatch({ type: "SUBMITTING" });

        const appVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
            },
            auth as Auth
        );

        signInWithPhoneNumber(auth as Auth, phone, appVerifier)
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
            <form onSubmit={onSubmit} noValidate>
                <Stack spacing={4}>
                    <Stack spacing={2}>
                        {!!formReducerState.error && (
                            <Alert severity="error">
                                <AlertTitle>
                                    {formReducerState.error?.title}
                                </AlertTitle>
                                {formReducerState.error?.details}
                            </Alert>
                        )}
                        <MuiTelInput
                            error={!!formReducerState.error}
                            value={phone}
                            onChange={handleChange}
                            defaultCountry="PH"
                        ></MuiTelInput>
                        <div
                            ref={recaptchaRef}
                            id="recaptcha-container"
                            style={{ display: "none" }}
                        ></div>
                    </Stack>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={formReducerState.status === "P"}
                        disableElevation
                        size="large"
                    >
                        NEXT
                    </Button>
                </Stack>
            </form>
        );
    }
    return <FirebaseOTPForm confirmOTP={confirmOTP}></FirebaseOTPForm>;
}

export default LoginByPhone;
