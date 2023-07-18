import React, { useState, useRef, useEffect } from "react";
import { Stack, TextField } from "@mui/material";

type OTPType = {
    otp: string[];
    setOtp: React.Dispatch<React.SetStateAction<string[]>>;
    submitOtp: () => void;
};

function OTP({ otp, setOtp, submitOtp }: OTPType) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [curOtpIndex, setCurOtpIndex] = useState(0);
    const [lastDigitFilled, setLastDigitFilled] = useState(false);

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
            submitOtp();
        }
    }, [lastDigitFilled]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [curOtpIndex]);

    return (
        <Stack direction="row" spacing={2}>
            {otp.map((value, index) => (
                <TextField
                    onFocus={() => setCurOtpIndex(index)}
                    inputRef={index === curOtpIndex ? inputRef : null}
                    type="number"
                    key={index}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleOTP(e, index)
                    }
                    onKeyUp={backOtpIndex}
                    value={value}
                    inputProps={{ style: { textAlign: "center" } }}
                ></TextField>
            ))}
        </Stack>
    );
}

export default OTP;
