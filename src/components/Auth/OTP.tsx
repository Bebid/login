import React, {
    useEffect,
    useRef,
    useState,
    useContext,
    useReducer,
} from "react";
import {
    TextField,
    Stack,
    Button,
    Collapse,
    AlertTitle,
    Alert,
} from "@mui/material";
import { CompWithStyle } from "./types";
import "./style.css";
import {
    Auth,
    ConfirmationResult,
    PhoneAuthCredential,
    PhoneAuthProvider,
    signInWithCredential,
} from "firebase/auth";
import { AuthContext, authContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { formInitState, formReducer } from "./Reducers/formReducer";
import { getErrMessage } from "../../firebase/errorMessages";

type OTPProps = CompWithStyle & {
    confirmOTP: ConfirmationResult | null;
};

function OTP({ style, confirmOTP }: OTPProps) {
    const navigate = useNavigate();
    const { auth } = useContext(authContext) as AuthContext;

    const [formReducerState, formDispatch] = useReducer(
        formReducer,
        formInitState
    );

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

    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [curOtpIndex, setCurOtpIndex] = useState<number>(0);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleOTP = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const { value } = e.target;

        const newOTP = [...otp];
        newOTP[index] = value.substring(value.length - 1);
        setOtp(newOTP);

        if (value !== "" && index < 5) {
            setCurOtpIndex(index + 1);
        }
    };

    const backOtpIndex = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && curOtpIndex !== 0) {
            setCurOtpIndex(curOtpIndex - 1);
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [curOtpIndex]);

    return (
        <form onSubmit={onSubmit} noValidate>
            <Stack spacing={2} sx={style}>
                <Collapse in={!!formReducerState.error}>
                    <Alert severity="error">
                        <AlertTitle>{formReducerState.error?.title}</AlertTitle>
                        {formReducerState.error?.details}
                    </Alert>
                </Collapse>
                <Stack direction="row" spacing={2}>
                    {otp.map((value, index) => (
                        <TextField
                            inputRef={index === curOtpIndex ? inputRef : null}
                            type="number"
                            key={index}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleOTP(e, index)}
                            onKeyUp={backOtpIndex}
                            value={value}
                        ></TextField>
                    ))}
                </Stack>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={formReducerState.status === "P"}
                >
                    Validate
                </Button>
            </Stack>
        </form>
    );
}

export default OTP;
