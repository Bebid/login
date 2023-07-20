import React, { useRef, useState, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { Stack, Button, AlertTitle, Alert } from "@mui/material";
import {
    Auth,
    ConfirmationResult,
    PhoneAuthProvider,
    signInWithCredential,
} from "firebase/auth";

import { AuthContext, authContext } from "../../../../App";
import { formInitState, formReducer } from "../../../../reducers/formReducer";
import { getErrMessage } from "../../../../libs/firebase/errorMessages";
import "../../../../assets/styles/style.css";
import OTP from "../../../UI/OTP";

type OTPProps = {
    confirmOTP?: ConfirmationResult;
};

function FirebaseOTPForm({ confirmOTP }: OTPProps) {
    const navigate = useNavigate();

    const { auth } = useContext(authContext) as AuthContext;

    const [otp, setOtp] = useState(new Array(6).fill(""));

    const [formReducerState, formDispatch] = useReducer(
        formReducer,
        formInitState
    );

    const btnFormRef = useRef<HTMLButtonElement>(null);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        formDispatch({ type: "SUBMITTING" });

        const credential = PhoneAuthProvider.credential(
            confirmOTP?.verificationId || "",
            otp.join("")
        );

        signInWithCredential(auth as Auth, credential)
            .then(() => {
                formDispatch({ type: "SUCCESS" });
                navigate("/dashboard");
            })
            .catch((error) => {
                formDispatch({
                    type: "FAILED",
                    payload: { error: getErrMessage(error.code) },
                });
            });
    };

    const submitOtp = () => {
        btnFormRef.current?.click();
    };

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
                    <OTP otp={otp} setOtp={setOtp} submitOtp={submitOtp}></OTP>
                </Stack>
                <Button
                    ref={btnFormRef}
                    type="submit"
                    variant="contained"
                    disabled={formReducerState.status === "P"}
                    size="large"
                    disableElevation
                >
                    VERIFY
                </Button>
            </Stack>
        </form>
    );
}

export default FirebaseOTPForm;
