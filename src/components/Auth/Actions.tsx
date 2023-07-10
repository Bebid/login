import {
    Stack,
    TextField,
    Button,
    Grid,
    Alert,
    AlertTitle,
    Collapse,
    InputAdornment,
    IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useState, useReducer, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    verifyPasswordResetCode,
    confirmPasswordReset,
    Auth,
} from "firebase/auth";

import getFirebaseAuth from "../../firebase/auth";
import { ResetPasswordForm } from "./types";
import { getErrMessage } from "../../firebase/errorMessages";
import { AuthContext, authContext } from "../../App";
import { formInitState, formReducer } from "./Reducers/formReducer";

function Actions() {
    const [searchParams] = useSearchParams();
    const actionCode: string = searchParams.get("oobCode") || "";
    const mode: string = searchParams.get("mode") || "";

    const { auth } = useContext(authContext) as AuthContext;

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordForm>();

    const [formReducerState, formReducerDispatch] = useReducer(
        formReducer,
        formInitState
    );

    const [email, setEmail] = useState("");
    const [pageLoading, setPageLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [passVis, setPassVis] = useState(false);
    const [conPassVis, setConPassVis] = useState(false);

    useEffect(() => {
        verifyPasswordResetCode(auth as Auth, actionCode)
            .then((response) => {
                setEmail(response);
                setPageLoading(false);
            })
            .catch((error) => {
                setPageError(getErrMessage(error.code).details);
                setPageLoading(false);
            });
    }, []);

    if (pageLoading) {
        return <>Loading</>;
    }

    const onSubmit = (data: ResetPasswordForm) => {
        formReducerDispatch({ type: "SUBMITTING" });
        const auth = getFirebaseAuth();

        confirmPasswordReset(auth, actionCode, data.newPass)
            .then(() => {
                formReducerDispatch({ type: "SUCCESS" });
            })
            .catch((response) => {
                formReducerDispatch({
                    type: "FAILED",
                    payload: {
                        error: getErrMessage(response.code),
                    },
                });
            });
    };

    if (!!email && mode === "resetPassword") {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <Collapse
                        in={
                            formReducerState.status === "D" &&
                            !formReducerState.error
                        }
                    >
                        <Alert severity="success">
                            <AlertTitle>Password changed</AlertTitle>
                            Successfully changed password. Please try to login
                            again.
                        </Alert>
                    </Collapse>
                    <Collapse
                        in={
                            formReducerState.status === "D" &&
                            !!formReducerState.error
                        }
                    >
                        <Alert severity="error">
                            <AlertTitle>
                                {formReducerState.error?.title}
                            </AlertTitle>
                            {formReducerState.error?.details}
                        </Alert>
                    </Collapse>
                    <TextField
                        type={passVis ? "text" : "password"}
                        error={!!errors.newPass}
                        label="New Password"
                        helperText={errors.newPass?.message}
                        {...register("newPass", {
                            required: "Please enter your new password",
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\];:"'<>,.?/|\\~])[A-Za-z\d!@#$%^&*()_+\-={}[\];:"'<>,.?/|\\~]{8,}$/,
                                message: "Please enter a secured password",
                            },
                        })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {passVis ? (
                                        <IconButton
                                            onClick={() =>
                                                setPassVis((state) => !state)
                                            }
                                            disableRipple
                                        >
                                            <VisibilityOffIcon></VisibilityOffIcon>
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            onClick={() =>
                                                setPassVis((state) => !state)
                                            }
                                            disableRipple
                                        >
                                            <VisibilityIcon></VisibilityIcon>
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>
                    <TextField
                        type={conPassVis ? "text" : "password"}
                        error={!!errors.confirmNewPass}
                        label="Confirm New Password"
                        helperText={errors.confirmNewPass?.message}
                        {...register("confirmNewPass", {
                            required: "Please confirm your new password",
                            validate: {
                                isSame: (field) => {
                                    return (
                                        field === getValues("newPass") ||
                                        "Passwords are not the same"
                                    );
                                },
                            },
                        })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {conPassVis ? (
                                        <IconButton
                                            onClick={() =>
                                                setConPassVis((state) => !state)
                                            }
                                            disableRipple
                                        >
                                            <VisibilityOffIcon></VisibilityOffIcon>
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            onClick={() =>
                                                setConPassVis((state) => !state)
                                            }
                                            disableRipple
                                        >
                                            <VisibilityIcon></VisibilityIcon>
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={formReducerState.status === "P"}
                        disableElevation
                    >
                        Reset Password
                    </Button>
                </Stack>
            </form>
        );
    }

    return <div>{pageError}</div>;
}

export default Actions;
