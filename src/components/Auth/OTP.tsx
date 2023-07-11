import React, {
    useEffect,
    useRef,
    useState,
    useContext,
    useReducer,
} from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Stack, Button, AlertTitle, Alert } from "@mui/material";
import {
    Auth,
    ConfirmationResult,
    PhoneAuthProvider,
    signInWithCredential,
} from "firebase/auth";

import { AuthContext, authContext } from "../../App";
import { formInitState, formReducer } from "./Reducers/formReducer";
import { getErrMessage } from "../../firebase/errorMessages";
import { CompWithStyle } from "./types";
import "./style.css";

type OTPProps = CompWithStyle & {
    confirmOTP?: ConfirmationResult;
};

function OTP({ style, confirmOTP }: OTPProps) {
    const navigate = useNavigate();

    const { auth } = useContext(authContext) as AuthContext;

    const [formReducerState, formDispatch] = useReducer(
        formReducer,
        formInitState
    );

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [curOtpIndex, setCurOtpIndex] = useState(0);
    const [lastDigitFilled, setLastDigitFilled] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
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

    const handleOTP = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const { value } = e.target;

        const newOTP = [...otp];
        newOTP[index] = value.substring(value.length - 1);
        setOtp(newOTP);

        if (value !== "" && index < 5) {
            setLastDigitFilled(false);
            setCurOtpIndex(index + 1);
        } else {
            setLastDigitFilled(true);
        }
    };

    const backOtpIndex = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && curOtpIndex !== 0) {
            setCurOtpIndex(curOtpIndex - 1);
        }
    };

    useEffect(() => {
        if (lastDigitFilled) {
            btnFormRef.current?.click();
        }
    }, [lastDigitFilled]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [curOtpIndex]);

    return (
        <form onSubmit={onSubmit} noValidate>
            <Stack spacing={4}>
                <Stack spacing={2} sx={style}>
                    {!!formReducerState.error && (
                        <Alert severity="error">
                            <AlertTitle>
                                {formReducerState.error?.title}
                            </AlertTitle>
                            {formReducerState.error?.details}
                        </Alert>
                    )}
                    <Stack direction="row" spacing={2}>
                        {otp.map((value, index) => (
                            <TextField
                                onFocus={() => setCurOtpIndex(index)}
                                inputRef={
                                    index === curOtpIndex ? inputRef : null
                                }
                                type="number"
                                key={index}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleOTP(e, index)}
                                onKeyUp={backOtpIndex}
                                value={value}
                                inputProps={{ style: { textAlign: "center" } }}
                            ></TextField>
                        ))}
                    </Stack>
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

export default OTP;
